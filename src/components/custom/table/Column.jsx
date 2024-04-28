// import React from 'react'
import PropTypes from 'prop-types'

const Column = (props) => {
  return (
    <>{props.children}</>
  )
}

Column.propTypes = {
    field: PropTypes.string,
    body: PropTypes.func,
    children: PropTypes.node
}

export default Column
