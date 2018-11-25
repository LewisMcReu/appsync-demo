import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import GetConferences from '../Queries/GetConferencesQuery';
import AddedConference from '../Subscriptions/AddedConferenceSubscription';
import ConferenceDetail from "./ConferenceDetail";
import AddConferenceForm from "./AddConferenceForm";

class ConferenceList extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.getInitialState(), unsubscribe: props.subscribe()};
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    getInitialState = () => ({
        openItem: undefined,
        add: false
    });

    closeModals() {
        this.setState({
            ...this.state,
            openItem: undefined,
            add: false
        })
    }

    openAdd() {
        this.setState({
            ...this.state,
            add: true
        });
    }

    render() {
        const {loading, conferences} = this.props;
        return (
            <div>
                <button onClick={this.openAdd.bind(this)}>Add conference</button>
                {this.state.add ? <AddConferenceForm closeModal={this.closeModals.bind(this)}/> : ''}
                {this.state.openItem ? (
                    <ConferenceDetail conference={this.state.openItem} close={this.closeModals.bind(this)}/>) : ''}
                <section id="conference-list">
                    {loading ? <p>Loading conferences</p> : ''}
                    {conferences.sort((a, b) => {
                        return Date.parse(a.startDate) - Date.parse(b.startDate)
                    }).map(this.renderItem.bind(this))}
                </section>
            </div>
        );
    }

    openItemDetail(item) {
        this.setState({
            ...this.state,
            openItem: item
        })
    }

    renderItem(item) {
        return (
            <div className="conference-list-item" key={item.id}>
                <span>{item.name}</span>
                <span>{item.startDate}</span>
                <span>{item.endDate}</span>
                <button onClick={this.openItemDetail.bind(this, item)}>Detail</button>
            </div>
        );
    }
}

const composer = compose(
    graphql(GetConferences, {
        props: ({data: {getConferences, loading, subscribeToMore}}) => ({
            conferences: getConferences ? getConferences : [],
            loading,
            subscribe: () => {
                const unsubscribeAdded = subscribeToMore({
                    document: AddedConference,
                    updateQuery: (previousResult, {subscriptionData: {data: {addedConference}}}) => ({
                        ...previousResult,
                        getConferences: [addedConference, ...previousResult.getConferences.filter(conference => conference.id !== addedConference.id)]
                    })
                });
                // const unsubscribeUpdated = subscribeToMore({
                //     document: UpdatedConference,
                //     updateQuery: (previousResult, {subscriptionData: {data: {updatedConference}}}) => ({
                //         ...previousResult,
                //         getConferences: [updatedConference, ...previousResult.getConferences.filter(conference => conference.id !== updatedConference.id)]
                //     })
                // });

                return () => {
                    unsubscribeAdded();
                    // unsubscribeUpdated();
                }
            }
        })
    })
);

export default composer(ConferenceList);