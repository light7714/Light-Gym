import React, { useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
	const { bodyPart, name, target, equipment, id } = exerciseDetail;
	const [imageSrc, setImageSrc] = useState(null);

	useEffect(() => {
		let isMounted = true;
		let objectUrl;

		const fetchExerciseImage = async () => {
			if (!id) {
				setImageSrc(null);
				return;
			}

			try {
				const response = await fetch(
					`https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360`,
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
				console.error('Failed to load detail image:', error);
				if (isMounted) setImageSrc(null);
			}
		};

		fetchExerciseImage();

		return () => {
			isMounted = false;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [id]);

	const extraDetail = [
		{
			icon: BodyPartImage,
			name: bodyPart,
		},
		{
			icon: TargetImage,
			name: target,
		},
		{
			icon: EquipmentImage,
			name: equipment,
		},
	];

	return (
		// flexDirection is col by default, so only row in large devices
		<Stack
			gap="60px"
			sx={{
				flexDirection: { lg: 'row' },
				p: '20px',
				alignItems: 'center',
			}}
		>
			{imageSrc ? (
				<img
					src={imageSrc}
					alt={name}
					loading="lazy"
					className="detail-image"
				/>
			) : (
				<div className="detail-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f3f3' }}>
					No image available
				</div>
			)}
			<Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
				<Typography
					sx={{ fontSize: { lg: '64px', xs: '30px' } }}
					fontWeight={700}
					textTransform="capitalize"
				>
					{name}
				</Typography>

				<Typography
					sx={{ fontSize: { lg: '24px', xs: '18px' } }}
					color="#4F4C4C"
				>
					Exercises keep you strong.{' '}
					<span style={{ textTransform: 'capitalize' }}>{name}</span>{' '}
					is one of the best <br /> exercises to target your {target}.
					It will help you improve your <br /> mood and gain energy.
				</Typography>

				{/* This ?. here is called Optional chaining.  */}
				{/* The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist. */}

{/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
				{extraDetail?.map((item) => (
					<Stack
						key={item.name}
						direction="row"
						gap="24px"
						alignItems="center"
					>
						<Button
							sx={{
								background: '#FFF2DB',
								borderRadius: '50%',
								width: '100px',
								height: '100px',
							}}
						>
							<img
								src={item.icon}
								alt={bodyPart}
								style={{ width: '50px', height: '50px' }}
							/>
						</Button>
						<Typography
							textTransform="capitalize"
							sx={{ fontSize: { lg: '30px', xs: '20px' } }}
						>
							{item.name}
						</Typography>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};

export default Detail;
