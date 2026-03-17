import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, youtubeOptions, fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setExerciseVideos] = useState([]);
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);
	//id of exercise in URL
	const { id } = useParams();

	useEffect(() => {
		const fetchExercisesData = async () => {
			try {
				const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
				const youtubeSearchUrl =
					'https://youtube-search-and-download.p.rapidapi.com';

				const exerciseDetailData = await fetchData(
					`${exerciseDbUrl}/exercises/exercise/${id}`,
					exerciseOptions
				);
				setExerciseDetail(exerciseDetailData);

				const exerciseVideosData = await fetchData(
					`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
					youtubeOptions
				);
				setExerciseVideos(exerciseVideosData.contents || []);

				const targetMuscleExercisesData = await fetchData(
					`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
					exerciseOptions
				);
				setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);

				const equipmentExercisesData = await fetchData(
					`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
					exerciseOptions
				);
				setEquipmentExercises(Array.isArray(equipmentExercisesData) ? equipmentExercisesData : []);
			} catch (error) {
				console.error('Failed to load exercise details:', error);
				setExerciseDetail({});
				setExerciseVideos([]);
				setTargetMuscleExercises([]);
				setEquipmentExercises([]);
			}
		};

		fetchExercisesData();

		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [id]);

	return (
		
		<Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
			<Detail exerciseDetail={exerciseDetail} />
			<ExerciseVideos
				exerciseVideos={exerciseVideos}
				name={exerciseDetail.name}
			/>
			<SimilarExercises
				targetMuscleExercises={targetMuscleExercises}
				equipmentExercises={equipmentExercises}
			/>
		</Box>
	);
};

export default ExerciseDetail;
