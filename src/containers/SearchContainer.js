import React, { useCallback, useState, useEffect } from 'react';
import './SearchContainer.css';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
//import {debounce} from 'lodash';
import axios from 'axios';

const SearchContainer = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    // Query API when input changes
    
    useEffect(() => {
        const fetchData = async (searchInput) => {
            setIsEnd(false);
            setIsLoading(true);
            setNextPage(2);

            try {
                const result = await axios.get('https://trefle.io/api/v1/plants/search', {
                    params: {
                        token: 'RhKRa-adlcpW0LFy09dhzRJ2FDNkkgxz7trfadQ4FBw',
                        page: 1,
                        q: searchInput
                    }
                });
                setResults(result.data.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setIsEnd(true);
            }
        };
        fetchData(input);
    }, [input]);

    // Listen for scrolling and fetch more items when needed

    const handleScroll = useCallback(() => {
        if (!isEnd && !isLoading && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
            const fetchData = async (searchInput) => {
                setIsLoading(true);
                setNextPage(nextPage + 1);

                try {
                    const result = await axios.get('https://trefle.io/api/v1/plants/search', {
                        params: {
                            token: 'RhKRa-adlcpW0LFy09dhzRJ2FDNkkgxz7trfadQ4FBw',
                            page: nextPage,
                            q: searchInput
                        }
                    });
                    //console.log(JSON.stringify(result));
                    setResults((res) => [...res, ...result.data.data]);
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                    setIsEnd(true);
                }
            };
            fetchData(input);
        }
    }, [input, nextPage, isLoading, isEnd]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    //onChange
    const handleChange = (inputValue) => {
        setInput(inputValue);
    }
    return (
        <>
            <SearchBar inputValue={input} onChange={handleChange} />
            <SearchResults results={results} isLoading={isLoading} isEnd={isEnd} />
        </>
    );
};

export default SearchContainer;