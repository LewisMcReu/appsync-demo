import React, {Component} from 'react';
import {graphql} from "react-apollo";
import AddEventMutation from "../Mutations/AddEventMutation";
import TimeInput from "react-time-input";
import GetEventsQuery from "../Queries/GetEventsQuery";

class AddEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        title: '',
        time: '',
        description: null,
        location: null
    });

    handleChange(field, event) {
        const {target: {value}} = event;
        this.setState({
            [field]: value
        });
    };

    handleAdd() {
        const {title, time, description, location} = this.state;
        this.setState(this.getInitialState(), () => {
            this.props.addEvent({title, time, description, location});
            this.props.close();
        });
    };

    handleTimeChange(value) {
        this.setState({
            time: value
        })
    }

    render() {
        return (
            <div className="custom-modal z10">
                <div className="custom-modal-content event-form">
                    <button className="btn button-close" onClick={this.props.close}>&times;</button>
                    <h1 className="margin-center">New event</h1>
                    <form>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input className="form-control" type="text" id="title"
                                   value={this.state.title}
                                   onChange={this.handleChange.bind(this, 'title')}/>
                        </div>
                        <div>
                            <label htmlFor="time">Time</label>
                            <TimeInput id="time"
                                       className='form-control'
                                       onTimeChange={this.handleTimeChange.bind(this)}
                            />
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input className="form-control" type="text" id="location"
                                   value={this.state.location}
                                   onChange={this.handleChange.bind(this, 'location')}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description"
                                      value={this.state.description}
                                      onChange={this.handleChange.bind(this, 'description')}/>
                        </div>
                        <div>
                            <button type="button"
                                    className="btn"
                                    onClick={this.handleAdd.bind(this)}>
                                Add event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const composer = graphql(AddEventMutation, {
    props: ({mutate, ownProps}) => ({
        addEvent: (event) => mutate({
            variables: {dayID: ownProps.dayID, ...event},
            optimisticResponse: event => ({
                addEvent: {
                    id: -1,
                    __typename: "Event",
                    ...event
                }
            })
        })
    }),
    options: (ownProps) => ({
        update: (proxy, {data: {addEvent}}) => {
            const data = proxy.readQuery({query: GetEventsQuery, variables: {dayID: ownProps.dayID}});
            data.getEvents = [addEvent, ...data.getEvents.filter(event => {
                return event.id !== addEvent.id
            })];
            proxy.writeQuery({query: GetEventsQuery, variables: {dayID: ownProps.dayID}, data});
        }
    })
});

export default composer(AddEventForm);