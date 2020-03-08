import React from 'react';

const Search = ({ onChange, value }) => (
	<div className="search">
		<input
			name="search"
			onChange={onChange}
			value={value}
			type="text"
			placeholder="Search"
			aria-label="Search"
		/>
	</div>
);

export default Search;
