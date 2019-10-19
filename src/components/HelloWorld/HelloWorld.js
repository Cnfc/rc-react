import React from 'react';
import PropTypes from 'prop-types';

function HelloWorld({ message }) {
  return (
    <div>
      HelloWorld <h4>{message}</h4>
    </div>
  )
}


HelloWorld.propTypes = {
  massage: PropTypes.string
}

export default HelloWorld;