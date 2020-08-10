import React from 'react';
import ResultItem from './ResultItem';
import './SearchResults.css';

const SearchResults = ({results, isLoading}) => {
    return(
        <div className = "search-results">
            {results.map(resItem => <ResultItem info = {resItem} key = {resItem.id} />)}
            {isLoading && 'loading...'}
        </div>
    );
};

export default SearchResults;