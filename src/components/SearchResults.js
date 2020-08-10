import React from 'react';
import ResultItem from './ResultItem';
import './SearchResults.css';

const SearchResults = ({results, isLoading}) => {
    return(
        <div className = "SearchResults">
            {results.map(resItem => <ResultItem info = {resItem} key = {resItem.id} />)}
            {isLoading && 'loading...'}
        </div>
    );
};

export default SearchResults;