const authorService = {
	fetchAll: async () => {
		const token = localStorage.getItem('token');
		const response = await fetch('http://localhost:4000/authors/all', {
			method: 'GET',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	},
	fetchById: async (authorId) => {
		const token = localStorage.getItem('token');
		const response = await fetch(`http://localhost:4000/authors/${authorId}`, {
			method: 'GET',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result;
	},
	create: async (author) => {
		const token = localStorage.getItem('token');

		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			body: JSON.stringify(author),
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	},
	delete: async () => {
		const token = localStorage.getItem('token');
	},
};

export default authorService;
