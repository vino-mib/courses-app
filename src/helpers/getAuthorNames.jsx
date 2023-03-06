import { mockedAuthorsList } from '../mock';

const getAuthorNames = (authors) => {
	let authorNames = '';
	if (authors.length && mockedAuthorsList.length) {
		const authorNameList = mockedAuthorsList.filter(
			(author) => authors.indexOf(author.id) !== -1
		);

		if (authorNameList.length) {
			authorNames = authorNameList.map((author) => author.name).join(', ');
		}
	}
	return authorNames;
};

export default getAuthorNames;
