import React, {Component} from 'react';
import './App.css';
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync/lib";
import Config from './Config';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ApolloProvider from "react-apollo/ApolloProvider";
import ConferenceList from "./Components/ConferenceList";
import {Rehydrated} from "aws-appsync-react";

window.debug = true;

const client = new AWSAppSyncClient({
    url: Config.graphqlEndpoint,
    region: Config.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: Config.graphqlApiKey
    }
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
