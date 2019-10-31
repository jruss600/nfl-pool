import React from 'react';
import PropTypes from 'prop-types';

const Results = ( { result }) => {
    return(<h5><strong>{result}</strong></h5>)
}

Results.propTypes = {
    result: PropTypes.string.isRequired
}

export default Results;