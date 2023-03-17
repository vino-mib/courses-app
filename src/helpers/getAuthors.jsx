const getAuthors = async () => {
	const token = localStorage.getItem('token');

	return await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
};

export default getAuthors;
