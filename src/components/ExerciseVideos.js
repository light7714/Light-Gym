import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
// import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
	// console.log(exerciseVideos);
	if (!exerciseVideos.length) return 'Loading...';

	return (
		<Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
			<Typography
				sx={{ fontSize: { lg: '44px', xs: '25px' } }}
				fontWeight={700}
				color="#000"
				mb="33px"
			>
				Watch{' '}
				<span style={{ color: '#FF2625', textTransform: 'capitalize' }}>
					{name}
				</span>{' '}
				exercise videos
			</Typography>

			{/* loop over the vids */}
			<Stack
				sx={{
					flexDirection: { lg: 'row' },
					gap: { lg: '110px', xs: '0px' },
				}}
				justifyContent="flex-start"
				flexWrap="wrap"
				alignItems="center"
			>
				{/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining */}
				{exerciseVideos?.slice(0, 6)?.map((item, index) => (
					// each vid is a link, so anchor tag

					// The rel=”noreferrer” tag is a special HTML attribute that can be added to a link tag (<a>). It prevents passing the referrer information to the target website by removing the referral info from the HTTP header.
					// This means that in Google analytics traffic coming from links that have the rel=”noreferrer” attribute will show as Direct Traffic instead of Referral.
					// Use the rel=”noreferrer” attribute on outgoing links when you don’t want other sites to know that you are linking to them.
					<a
						key={index}
						className="exercise-video"
						// we're getting video obj having a videoId field for each video in exerciseVideos (from the Youtube Search and Download API)
						href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
						target="_blank"
						rel="noreferrer"
					>
						<img
							style={{ borderTopLeftRadius: '20px' }}
							// getting this thumbnails array from the API
							src={item.video.thumbnails[0].url}
							alt={item.video.title}
						/>
						<Box>
							<Typography
								sx={{ fontSize: { lg: '28px', xs: '18px' } }}
								fontWeight={600}
								color="#000"
							>
								{item.video.title}
							</Typography>
							<Typography fontSize="14px" color="#000">
								<span
									style={{
										color: '#FF2625',
										textTransform: 'capitalize',
									}}
								>
									channel:
								</span>{' '}
								{item.video.channelName}
							</Typography>
						</Box>
					</a>
				))}
			</Stack>
		</Box>
	);
};

export default ExerciseVideos;
