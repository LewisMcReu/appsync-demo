import React, {Component} from 'react';
import {graphql} from "react-apollo";
import AddDayMutation from "../Mutations/AddDayMutation";
import GetDaysQuery from "../Queries/GetDaysQuery";

class AddDayForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        date: ''
    });

    handleChange(field, event) {
        const {target: {value}} = event;

        this.setState({
            [field]: value
        });
    };

    handleAdd() {
        const {date} = this.state;
        this.setState(this.getInitialState(), () => {
            this.props.addDay({date});
            this.props.close();
        });
    };

    render() {
        return (
            <form className="add-day">
                <input className="form-control"
                       type="date"
                       placeholder="Date"
                       value={this.state.date}
                       onChange={this.handleChange.bind(this, 'date')}/>
                <button type="button"
                        className="btn"
                        onClick={this.handleAdd.bind(this)}>
                    Add day
                </button>
            </form>
        )
    }
}

const composer = graphql(AddDayMutation, {
    props: ({mutate, ownProps}) => ({
        addDay: (day) => mutate({
            variables: {conferenceID: ownProps.conferenceID, ...day},
            optimisticResponse: day => ({
                addDay: {
                    id: -1,
                    __typename: "Day",
                    conference: {id: ownProps.conferenceID},
                    ...day
                }
            })
        })
    }),
    options: (ownProps) => ({
        update: (proxy, {data: {addDay}}) => {
            const data = proxy.readQuery({query: GetDaysQuery, variables: {conferenceID: ownProps.conferenceID}});
            data.getDays = [addDay, ...data.getDays.filter(day => {
                return day.id !== addDay.id
            })];
            proxy.writeQuery({query: GetDaysQuery, variables: {conferenceID: ownProps.conferenceID}, data});
        }
    })
});

export default composer(AddDayForm);