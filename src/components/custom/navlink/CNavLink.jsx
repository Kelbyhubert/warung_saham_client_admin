import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

const CNavLink = React.forwardRef((props , ref) => (
    <NavLink 
        ref={ref}
        {...props}
        className={({ isActive }) => (isActive ? props.className + ' Mui-selected' : props.className)}
        end
    />
));

CNavLink.displayName = "CustomNavLink"

CNavLink.propTypes = {
    className: PropTypes.string
}

export default CNavLink