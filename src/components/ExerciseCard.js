import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
	const [imageSrc, setImageSrc] = useState(null);

	useEffect(() => {
		let isMounted = true;
		let objectUrl;

		const fetchExerciseImage = async () => {
			if (!exercise?.id) return;

			try {
				const response = await fetch(
					`https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=180`,
					{
						method: 'GET',
						headers: {
							'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
							'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Image fetch failed: ${response.status}`);
				}

				const blob = await response.blob();
				objectUrl = URL.createObjectURL(blob);
				if (isMounted) setImageSrc(objectUrl);
			} catch (error) {
				console.error('Failed to load exercise image:', error);
				if (isMounted) setImageSrc(null);
			}
		};

		fetchExerciseImage();

		return () => {
			isMounted = false;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [exercise.id]);

	return (
		<Link className="exercise-card" to={`/exercise/${exercise.id}`}>
			{imageSrc ? (
				<img src={imageSrc} alt={exercise.name || 'Exercise'} loading="lazy" />
			) : (
				<div style={{ width: '100%', height: '326px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f3f3', color: '#666', fontSize: '16px' }}>
					No image available
				</div>
			)}
			<Stack direction="row">
				<Button
					sx={{
						ml: '21px',
						color: '#fff',
						background: '#FFA9A9',
						fontSize: '14px',
						borderRadius: '20px',
						textTransform: 'capitalize',
					}}
				>
					{exercise.bodyPart}
				</Button>
				<Button
					sx={{
						ml: '21px',
						color: '#fff',
						background: '#FCC757',
						fontSize: '14px',
						borderRadius: '20px',
						textTransform: 'capitalize',
					}}
				>
					{exercise.target}
				</Button>
			</Stack>
			<Typography
				ml="21px"
				color="#000"
				fontWeight="bold"
				sx={{ fontSize: { lg: '22px', xs: '20px' } }}
				mt="11px"
				pb="10px"
				textTransform="capitalize"
			>
				{exercise.name}
			</Typography>
		</Link>
	);
};

export default ExerciseCard;
