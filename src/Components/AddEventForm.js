import React, {Component} from 'react';
import {graphql} from "react-apollo";
import AddEventMutation from "../Mutations/AddEventMutation";

class AddEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        title: undefined,
        time: undefined,
        description: undefined,
        location: undefined
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

    render() {
        return (
            <div className="custom-modal z10">
                <div className="custom-modal-content event-form">
                    <button className="button-close" onClick={this.props.close}>&times;</button>
                    <h1 className="margin-center">New event</h1>
                    <form>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input className="form-control" type="text"
                                   placeholder="Title"
                                   value={this.state.title}
                                   onChange={this.handleChange.bind(this, 'title')}/>
                        </div>
                        <div>
                            <label htmlFor="time">Time</label>
                            <input className="form-control" type="time"
                                   placeholder="Time"
                                   value={this.state.time}
                                   onChange={this.handleChange.bind(this, 'time')}/>
                        </div>
                        <div>
                            <label htmlFor="location">Location</label>
                            <input className="form-control" type="text"
                                   placeholder="Location"
                                   value={this.state.location}
                                   onChange={this.handleChange.bind(this, 'location')}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control"
                                      placeholder="Description"
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
        addEvent: (event) => mutate({variables: {dayID: ownProps.dayID, ...event}})
    })
});

export default composer(AddEventForm);