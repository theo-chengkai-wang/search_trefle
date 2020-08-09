import React from 'react';

const ResultItem = ({info}) => {
    return (
        <li>
            <p>{info.common_name}</p>
        </li>
    );
};

export default ResultItem;