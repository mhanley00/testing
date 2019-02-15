import React, { Component } from 'react';
import './AppChild.css';
import City from './City.js';
import config from './config/config';

class AppChild extends Component {

    constructor(props) {
        console.log('Hello! 🇺🇸');
        super(props);
        this.state = {
            place: 'NYC',
            date: new Date(),
            center: [-74.0060, 40.7128]

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        //getting value from radio button click
        const target = event.target;
        const value = target.value;
        let newDate;
        let newCenter;

        //UTC time diff https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
        function calcTime(offset) {
            let d = new Date();
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            let nd = new Date(utc + (3600000 * offset));
            return nd.toLocaleString();
        }
        if (value === 'Paris') {

            newDate = calcTime('+1');
            newCenter = [2.3522, 48.8566];
        }
        else {

            newDate = calcTime('-5');
            newCenter = [-74.0060, 40.7128];
        }
        this.setState({
            place: value,
            date: newDate,
            center: newCenter
        });
    }


    render() {
        return (
            <div>
                <form>
                    <label>{config.text.instructions.content}</label><br />
                    <label>{config.text.instructions.options.option1}<input type='radio' checked={this.state.place === 'NYC'} name='city' value='NYC' onChange={this.handleInputChange} />
                    </label>
                    <label>{config.text.instructions.options.option2}<input type='radio' checked={this.state.place === 'Paris'} name='city' value='Paris' onChange={this.handleInputChange} />
                    </label>
                </form>
                <City place={this.state.place}
                    date={this.state.date.toString()}
                    center={this.state.center.toString()}
                />
            </div>
        );
    }
}

export default AppChild;
//checkbox. input w/ type, checked property T/F based on state