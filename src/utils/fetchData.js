export const exerciseOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
		'Content-Type': 'application/json',
	},
};

export const youtubeOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
		'Content-Type': 'application/json',
		// mode: 'no-cors',
	},
};

export const fetchData = async (url, options) => {
	const response = await fetch(url, options);
	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Network response was not ok: ${response.status} ${response.statusText} ${text}`);
	}
	const data = await response.json();

	return data;
};
