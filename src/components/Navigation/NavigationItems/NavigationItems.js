import React from 'react';

import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        { props.isAuthenticated?
            <NavigationItem link="/orders" active>Orders</NavigationItem> :
            null }
        { !props.isAuthenticated? 
            <NavigationItem link='/auth'>Authenticate</NavigationItem> :  
            <NavigationItem link='/logout'>Logout</NavigationItem> }
    </ul>
);

export default navigationItems;