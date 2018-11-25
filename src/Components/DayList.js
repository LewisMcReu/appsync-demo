import {compose, graphql} from "react-apollo";
import React, {Component} from "react";
import GetDaysQuery from "../Queries/GetDaysQuery";
import AddedDaySubscription from "../Subscriptions/AddedDaySubscription";
import DayDetail from "./DayDetail";

class DayList extends Component {
    constructor(props) {
        super(props);
        this.state = {unsubscribe: props.subscribe()};
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    render() {
        const items = this.props.days;
        return (
            <section className="day-list">
                {items.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)).map(this.renderItem)}
            </section>
        );
    }

    renderItem(item) {
        return (
            <DayDetail key={item.id} day={item}/>
        )
    }
}

const composer = compose(
    graphql(GetDaysQuery, {
        props: ({data: {getDays, loading, subscribeToMore}, ownProps}) => ({
            days: getDays ? getDays : [],
            loading,
            subscribe: () => {
                console.error("Subscribed Days");
                const unsubscribeAdded = subscribeToMore({
                    document: AddedDaySubscription,
                    variables: {conferenceID: ownProps.conferenceID},
                    updateQuery: (previousResult, {subscriptionData: {data: {addedDay}}}) => ({
                        ...previousResult,
                        getDays: [addedDay, ...previousResult.getDays.filter(day => day.id !== addedDay.id)]
                    })
                });

                return () => {
                    console.error("Unsubscribed Days");
                    unsubscribeAdded();
                }
            }
        }),
        options: (props) => ({
            variables: {
                conferenceID: props.conferenceID
            },
            fetchPolicy: "cache-and-network"
        })
    })
);

export default composer(DayList);