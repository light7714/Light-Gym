import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

// import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';

import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
	//when we'll click the arrow, it'll scroll to prev element
	const { scrollPrev } = useContext(VisibilityContext);

	return (
		<Typography onClick={() => scrollPrev()} className="right-arrow">
			<img src={LeftArrowIcon} alt="right-arrow" />
		</Typography>
	);
};

const RightArrow = () => {
	const { scrollNext } = useContext(VisibilityContext);

	return (
		<Typography onClick={() => scrollNext()} className="left-arrow">
			<img src={RightArrowIcon} alt="right-arrow" />
		</Typography>
	);
};

//this is bodyPart with small b, we have imported BodyPart comp here as well
const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
	<ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
		{data.map((item) => (
			<Box
				key={item.id || item}
				itemId={item.id || item}
				title={item.id || item}
				m="0 40px"
			>
				{bodyParts ? (
					<BodyPart
						item={item}
						setBodyPart={setBodyPart}
						bodyPart={bodyPart}
					/>
				) : (
					<ExerciseCard exercise={item} />
				)}
			</Box>
		))}
	</ScrollMenu>
);

export default HorizontalScrollbar;
