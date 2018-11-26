import React, {Component} from 'react';
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync/lib";
import Config from './Config';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ApolloProvider from "react-apollo/ApolloProvider";
import ConferenceList from "./Components/ConferenceList";
import {Rehydrated} from "aws-appsync-react";
import GetConferencesQuery from "./Queries/GetConferencesQuery";
import {MockedProvider} from "react-apollo/test-utils";
import GetDaysQuery from "./Queries/GetDaysQuery";
import wait from "waait";
window.debug = true;

const conflictResolver = ({mutation, mutationName, variables, data, retries}) => {
    return {...variables};
};

const client = new AWSAppSyncClient({
    url: Config.graphqlEndpoint,
    region: Config.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: Config.graphqlApiKey
    },
    conflictResolver: conflictResolver
});

class App extends Component {
    render() {
        return (
            <main>
                <header>
                    <h1>AppSync Demo</h1>
                </header>
                <Switch>
                    <Route path={'/'} render={() => (<ConferenceList/>)}/>
                </Switch>
            </main>
        );
    }
}

const WithProvider = (props) => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;
