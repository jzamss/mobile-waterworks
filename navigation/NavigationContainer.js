import React, { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation'

import MainNavigator from "./MainNavigator";


const NavigationContainer = (props) => {
    const isAuthenticated = useSelector(state => !!state.auth.authenticated);
    
    const navRef = useRef();

    useEffect(() => {
        if (!isAuthenticated) {
            navRef.current.dispatch(
                NavigationActions.navigate({routeName: "Login"})
            )
        }
    }, [isAuthenticated]);

  return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;
