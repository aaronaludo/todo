import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = props => {
    return <Route path={props.path} exact render={() => {

        if(localStorage.getItem('user_data') === null) {
            return <props.component {...props} />;
        }

        return <Redirect to={'/todo'} />;
    }} />;
}

export default GuestRoute;
