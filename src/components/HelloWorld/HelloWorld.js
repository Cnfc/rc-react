import React from 'react';
import PropTypes from 'prop-types';


/**Message My */
function HelloWorld({ message }) {
  return (
    <div>
      HelloWorld <h4>{message}</h4>
    </div>
  )
}


HelloWorld.propTypes = {
  /** 
   *  Message to display
   *  */
  massage: PropTypes.string
}



HelloWorld.defaultProps = {
  massage: "World"
}



export default HelloWorld;