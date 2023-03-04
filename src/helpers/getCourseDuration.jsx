const formatDuration = (duration) => {
	let mints = duration % 60;
	let hours = parseInt(duration / 60);
	hours = hours < 10 ? `0${hours}` : hours;
	mints = mints < 10 ? `0${mints}` : mints;
	return `${hours}:${mints}`;
};

export default formatDuration;
