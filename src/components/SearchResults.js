import React from 'react';
import ResultItem from './ResultItem';

const SearchResults = ({results, isLoading}) => {
    return(
        <ul>
            {results.map(resItem => <ResultItem info = {resItem} key = {resItem.id} />)}
            {isLoading && 'loading...'}
        </ul>
    );
};

export default SearchResults;