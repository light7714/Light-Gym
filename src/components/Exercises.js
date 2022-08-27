import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
	// console.log(exercises);

	const [currentPage, setCurrentPage] = useState(1);
	const [exercisesPerPage] = useState(9);

	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
	//currentExercises is array, as we sliced a part of it from exercises array
	const currentExercises = exercises.slice(
		indexOfFirstExercise,
		indexOfLastExercise
	);

	// mui passes the event, as well as value of the page we're currently on, automatically
	const paginate = (e, value) => {
		setCurrentPage(value);
		//scroll to top of page
		//scroll top by 1800 px (SEE AGAIN??)
		window.scrollTo({ top: 1800, behavior: 'smooth' });
	};

	//calling this useEffect whenever the bodyPart changes (so when user selects a body part from the cards in horizontal scrollbar, it should set exercises variable (in home comp) to the exercises corresponding to the bodypart selected)
	useEffect(() => {
		const fetchExercisesData = async () => {
			let exercisesData = [];

			if (bodyPart === 'all') {
				exercisesData = await fetchData(
					'https://exercisedb.p.rapidapi.com/exercises',
					exerciseOptions
				);
			} else {
				exercisesData = await fetchData(
					`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
					exerciseOptions
				);
			}

			setExercises(exercisesData);
		};

		fetchExercisesData();
	}, [bodyPart, setExercises]);

	return (
		<Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
			<Typography variant="h4" mb="46px">
				Showing Results
			</Typography>
			<Stack
				direction="row"
				sx={{ gap: { lg: '110px', xs: '50px' } }}
				flexWrap="wrap"
				justifyContent="center"
			>
				{currentExercises.map((exercise, index) => (
					<ExerciseCard key={index} exercise={exercise} />
				))}
			</Stack>
			<Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
				{exercises.length > 9 && (
					<Pagination
						color="standard"
						shape="rounded"
						defaultPage={1}
						count={Math.ceil(exercises.length / exercisesPerPage)}
						page={currentPage}
						onChange={paginate}
						size="large"
					/>
				)}
			</Stack>
		</Box>
	);
};

export default Exercises;
