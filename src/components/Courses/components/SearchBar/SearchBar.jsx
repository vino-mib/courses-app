import React, { useState } from 'react';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

interface SearchProps {handleSearch: (keyword: string) => {};
}

const SearchBar: React.FC<SearchProps> = (props) => {
	const [keyword, setKeyword] = useState('');

	const handleSearch = () => {
		console.log('On search');
		props.handleSearch(keyword);
	};

	const handleSearchTextChange = (event) => {
		setKeyword(event.target.value);
	};

	return (
		<React.Fragment>
			<div className='form-row'>
				<div className='col-md-8'>
					<Input
						class='form-control'
						placeholder='Enter course name...'
						type='text'
						onChange={handleSearchTextChange}
					/>
				</div>
				<div className='col-md-4'>
					<Button
						class='btn btn-outline-primary'
						onClick={handleSearch}
						label='Search'
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchBar;
