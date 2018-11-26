import React, {Component} from 'react';
import DayList from "./DayList";
import AddDayForm from "./AddDayForm";

export default class ConferenceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }


    getInitialState = () => ({
        add: false
    });

    openAdd() {
        this.setState({
            ...this.state,
            add: true
        });
    }

    closeModals() {
        this.setState({
            ...this.state,
            add: false
        })
    }

    render() {
        const item = this.props.conference;
        return (
            <div className="custom-modal">
                <div className="custom-modal-content conference-detail">
                    <button className="btn button-close" onClick={this.props.close}>&times;</button>
                    <h1>{item.name}</h1>
                    <p>{item.startDate} - {item.endDate}</p>
                    {this.state.add ?
                        <AddDayForm conferenceID={item.id} close={this.closeModals.bind(this)}/> :
                        <button className="btn" onClick={this.openAdd.bind(this)}>Add day</button>
                    }
                    <DayList conferenceID={item.id}/>
                </div>
            </div>
        )
    }
}
