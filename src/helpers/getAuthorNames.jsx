const getAuthorNames = (authorIds, authors) => {
	let authorNames = '';
	if (authorIds && authors && authorIds.length && authors.length) {
		const authorNameList = authors.filter(
			(author) => authorIds.indexOf(author.id) !== -1
		);

		if (authorNameList.length) {
			authorNames = authorNameList.map((author) => author.name).join(', ');
		}
	}
	return authorNames;
};

export default getAuthorNames;
