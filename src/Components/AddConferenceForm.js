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
            this.props.close();
        });
    };

    render() {
        return (
            <div className="custom-modal">
                <div className="custom-modal-content conference-form">
                    <button className="btn button-close" onClick={this.props.close}>&times;</button>
                    <h1 className="margin-center">New conference</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" className="form-control" type="text"
                                   placeholder="Name"
                                   value={this.state.name}
                                   onChange={this.handleChange.bind(this, 'name')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startdate">Start date</label>
                            <input id="startdate" className="form-control" type="date"
                                   placeholder="Start date"
                                   value={this.state.startDate}
                                   onChange={this.handleChange.bind(this, 'startDate')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="enddate">End date</label>
                            <input id="enddate" className="form-control" type="date"
                                   placeholder="End date"
                                   value={this.state.endDate}
                                   onChange={this.handleChange.bind(this, 'endDate')}/>
                        </div>
                        <div>
                            <button type="button"
                                    className="btn"
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