import React, { useState } from 'react';
import { Box } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';

const Home = () => {
	//these states made here bcoz we want changes in state(when a diff body part is selected for eg) to reflect across all comps
	//could have made a context too, but as only 2 comps (searchExercises and exercises) require these states, so not made for simplicity
	const [exercises, setExercises] = useState([]);
	const [bodyPart, setBodyPart] = useState('all');
	// console.log(bodyPart);
	return (
		<Box>
			<HeroBanner />
			<SearchExercises
				setExercises={setExercises}
				bodyPart={bodyPart}
				setBodyPart={setBodyPart}
			/>
			<Exercises
				setExercises={setExercises}
				bodyPart={bodyPart}
				exercises={exercises}
			/>
		</Box>
	);
};

export default Home;
