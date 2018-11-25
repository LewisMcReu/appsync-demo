import React, {Component} from "react";
import EventList from "./EventList";
import AddEventForm from "./AddEventForm";

class DayDetail extends Component {
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

    closeAdd() {
        this.setState({
            ...this.state,
            add: false
        })
    }

    render() {
        const item = this.props.day;
        return (
            <div className="day-list-item">
                <h2>{item.date}</h2>
                {this.state.add ?
                    <AddEventForm dayID={item.id} close={this.closeAdd.bind(this)}/> :
                    <button onClick={this.openAdd.bind(this)}>Add event</button>}
                <EventList dayID={item.id}/>
            </div>
        );
    }
}

export default DayDetail;