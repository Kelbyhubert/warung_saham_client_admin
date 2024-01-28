import React, { forwardRef } from 'react'
import { NavLink } from 'react-router-dom';

const CNavLink = forwardRef((props , ref) => (
    <NavLink 
        ref={ref}
        {...props}
        className={({ isActive }) => (isActive ? props.className + ' Mui-selected' : props.className)}
        end
    />
));

export default CNavLink