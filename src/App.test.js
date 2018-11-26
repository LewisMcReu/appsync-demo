import React from 'react';
import App from './App';
import GetConferencesQuery from "./Queries/GetConferencesQuery";
import GetDaysQuery from "./Queries/GetDaysQuery";
import {MockedProvider} from "react-apollo/test-utils";
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom";
import GetEventsQuery from "./Queries/GetEventsQuery";

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

it('mocks data', async () => {
    const div = document.createElement('div');

    const component = React.create(
        <MockedProvider mocks={[mocks]} addTypename={false}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MockedProvider>
    );

    ReactDOM.render(component, div);
});
