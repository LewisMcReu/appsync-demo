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
            this.props.addConference({title, time, description, location});
            this.props.close();
        });
    };

    render() {
        return (
            <div className="modal z10">
                <div className="modal-content">
                    <button className="button-close" onClick={this.props.close}>X</button>
                    <h1 className="margin-center">New event</h1>
                    <form>
                        <div>
                            <label>Title</label>
                            <input type="text"
                                   placeholder="Title"
                                   value={this.state.title}
                                   onChange={this.handleChange.bind(this, 'title')}/>
                        </div>
                        <div>
                            <label>Time</label>
                            <input type="time"
                                   placeholder="Time"
                                   value={this.state.time}
                                   onChange={this.handleChange.bind(this, 'time')}/>
                        </div>
                        <div>
                            <label>Location</label>
                            <input type="text"
                                   placeholder="Location"
                                   value={this.state.location}
                                   onChange={this.handleChange.bind(this, 'location')}/>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleChange.bind(this, 'description')}/>
                        </div>
                        <div>
                            <button type="button"
                                    className="btn-main btn-left"
                                    onClick={this.handleAdd.bind(this)}>
                                Add conference
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
        addConference: (event) => mutate({variables: {dayID: ownProps.dayID, ...event}})
    })
});

export default composer(AddEventForm);