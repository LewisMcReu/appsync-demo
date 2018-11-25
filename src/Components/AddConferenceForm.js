import React, {Component} from 'react';
import {graphql} from "react-apollo";
import AddConferenceMutation from "../Mutations/AddConferenceMutation";
import GetConferencesQuery from "../Queries/GetConferencesQuery";

class AddConferenceForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        name: '',
        startDate: '',
        endDate: ''
    });

    handleChange(field, event) {
        const {target: {value}} = event;

        this.setState({
            [field]: value
        });
    };

    handleAdd() {
        const {name, startDate, endDate} = this.state;
        this.setState(this.getInitialState(), () => {
            this.props.addConference({name, startDate, endDate});
            this.props.closeModal();
        });
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <h1 className="margin-center">New conference</h1>
                    <form>
                        <div>
                            <label>Name</label>
                            <input type="text"
                                   placeholder="Name"
                                   value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>
                        </div>
                        <div>
                            <label>Start date</label>
                            <input type="date"
                                   placeholder="Start date"
                                   value={this.state.startDate}
                                   onChange={this.handleChange.bind(this, 'startDate')}/>
                        </div>
                        <div>
                            <label>End date</label>
                            <input type="date"
                                   placeholder="End date"
                                   value={this.state.endDate}
                                   onChange={this.handleChange.bind(this, 'endDate')}/>
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

const composer = graphql(AddConferenceMutation, {
    props: ({mutate}) => ({
        addConference: (conference) => mutate({
            variables: {...conference},
            optimisticResponse: conference => ({addConference: {id: -1, __typename: "Conference", ...conference}})
        })
    }),
    options: {
        update: (proxy, {data: {addConference}}) => {
            const data = proxy.readQuery({query: GetConferencesQuery});
            data.getConferences = [addConference, ...data.getConferences.filter(conf => {
                return conf.id !== addConference.id
            })];
            proxy.writeQuery({query: GetConferencesQuery, data});
        }
    }
});

export default composer(AddConferenceForm);