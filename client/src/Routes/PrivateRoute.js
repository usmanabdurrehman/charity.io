import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {

	let token = localStorage.getItem('token')?true:false
	console.log('PrivateRoute',token)

    return (
        <Route {...rest} render={props => (
            token==true ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;