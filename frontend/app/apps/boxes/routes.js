import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {BoxPage} from '../../components/pages';

let IndexRout = () =>
    <Route exact path="/" render={() => (
        <Redirect to={'/box-list'}/>
    )}/>;

let StartPage = <Route
    exact
    path='/box-list'
>
    <BoxPage/>
</Route>;

export default <Switch>
    {IndexRout()}
    {StartPage}
</Switch>;
