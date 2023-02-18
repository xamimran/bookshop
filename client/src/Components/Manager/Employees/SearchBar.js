import React from "react";

function SearchBar({ handleSearch }) {
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search..."
				onChange={(e) => {
					console.log("Searching...");
					handleSearch(e.target.value);
				}}
			/>
			
		</div>
	);
}

export default SearchBar;