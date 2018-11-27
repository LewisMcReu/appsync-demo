import React, {Component} from 'react';
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync/lib";
import Config from './Config';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ApolloProvider from "react-apollo/ApolloProvider";
import ConferenceList from "./Components/ConferenceList";
import {Rehydrated} from "aws-appsync-react";
import {MockedProvider} from "react-apollo/test-utils";
import GetConferencesQuery from "./Queries/GetConferencesQuery";
import GetDaysQuery from "./Queries/GetDaysQuery";
import GetEventsQuery from "./Queries/GetEventsQuery";

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

const mocks = [
    {
        request: {
            query: GetConferencesQuery
        },
        result: {
            data: [
                {id: 0, name: "AppSync Meetup Mock", startDate: "2018-10-11", endDate: "2018-10-13"}
            ]
        }
    },
    {
        request: {
            query: GetDaysQuery,
            variables: {
                conferenceID: 0
            }
        },
        result: {
            data: [{id: 1, date: "2018-10-12"}]
        }
    },
    {
        request: {
            query: GetEventsQuery,
            variables: {
                dayID: 1
            }
        },
        result: {
            data: [{id: 2, title: "AppSync", time: "18:30", location: "Cronos Leuven"}]
        }
    }
];

const WithMockedProvider = (props) => (
<MockedProvider mocks={[mocks]} addTypename={false}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</MockedProvider>);

export default WithProvider;

export {WithProvider, WithMockedProvider};