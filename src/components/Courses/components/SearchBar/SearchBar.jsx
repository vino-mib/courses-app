import React, { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

interface SearchProps {
    onSearch: (keyword: string) => {}
};

const SearchBar: React.FC<SearchProps> = (props) => {
    const [keyword, setKeyword] = useState('');

    const onSearch = () => {
		console.log('On search');
        props.onSearch(keyword);
	};

    const onSearchTextChange = (event) => {
        setKeyword(event.target.value)
	};
	
    return (
		<React.Fragment>
            <div className="form-row">
                <div className="col-md-8">
                    <Input class="form-control" placeholder='Enter course name...' type='text' onChange={onSearchTextChange} />
                </div>
                <div className="col-md-4">
                    <Button class="btn btn-outline-primary" onClick={onSearch} label='Search' />
                </div>
            </div>
		</React.Fragment>
	);
}

export default SearchBar;