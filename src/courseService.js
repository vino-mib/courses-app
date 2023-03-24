const courseService = {
	fetchAll: async () => {
		const token = localStorage.getItem('token');
		const response = await fetch('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	},
	fetchById: async (courseId) => {
		const token = localStorage.getItem('token');
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'GET',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result;
	},
	create: async (course) => {
		console.log('course payload ', course);
		const token = localStorage.getItem('token');
		try {
			const response = await fetch('http://localhost:4000/courses/add', {
				method: 'POST',
				body: JSON.stringify(course),
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();
			console.log('save course result ', result);
			return result;
		} catch (e) {
			console.log('exception ', e);
		}
	},
	delete: async (courseId) => {
		const token = localStorage.getItem('token');
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result;
	},
	update: async (course, courseId) => {
		const token = localStorage.getItem('token');
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'PUT',
			body: JSON.stringify(course),
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	},
	filterCourses: async (keyword) => {
		const token = localStorage.getItem('token');
		const response = await fetch(
			`http://localhost:4000/courses/filter?description=${keyword}&title=${keyword}`,
			{
				method: 'GET',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			}
		);
		const result = await response.json();
		return result;
	},
};

export default courseService;
