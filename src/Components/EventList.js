import React, {Component} from "react";
import {compose, graphql} from "react-apollo";
import AddedEvent from "../Subscriptions/AddedEventSubscription";
import GetEvents from "../Queries/GetEventsQuery";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {unsubscribe: props.subscribe()};
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    render() {
        const items = this.props.events;
        return (
            <section className="event-list">
                {items.map(this.renderItem)}
            </section>
        );
    }

    renderItem(item) {
        return (
            <div className="event-list-item" key={item.id}>
                <h3>{item.title}</h3>
                <span>{item.time}</span>
                <span>{item.location}</span>
                <p>{item.description}</p>
            </div>
        );
    }
}

const composer = compose(
    graphql(GetEvents, {
        props: ({data: {getEvents, loading, subscribeToMore}, ownProps}) => ({
            events: getEvents ? getEvents : [],
            loading,
            subscribe: () => {
                console.error("Subscribed Events");
                const unsubscribeAdded = subscribeToMore({
                    document: AddedEvent,
                    updateQuery: (previousResult, {subscriptionData: {data: {addedEvent}}}) => {
                        if (ownProps.dayID === addedEvent.day.id)
                            return ({
                                ...previousResult,
                                getEvents: [addedEvent, ...previousResult.getEvents.filter(event => event.id !== addedEvent.id)]
                            });
                        else return previousResult;
                    }
                });

                return () => {
                    console.error("Unsubscribed Events");
                    unsubscribeAdded();
                }
            }
        }),
        options: (props) => ({
            variables: {
                dayID: props.dayID
            }
        })
    })
);

export default composer(EventList);