import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import {GET_CURRENT_USER} from '../queries/index';

const withSession = Component => props => (
    <Query query={GET_CURRENT_USER}>
    {(data, loading) => {
        if (loading) return null;
        console.log('User data -', data);
        return (
            <Component {...props} />
        )
    }}
    </Query>
);

export default withSession;