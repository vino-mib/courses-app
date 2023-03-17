import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						Authorization: token,
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();

				if (result && result.successful) {
					setData(result.result);
					setIsLoading(false);
				} else {
					setError(result.errors[0]);
					setIsLoading(false);
				}
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [url]);

	return { data, isLoading, error };
};

export default useFetch;
