import React, { Component } from 'react';
import './AppChild.css';
import City from './City.js';
import config from './config/config';

class AppChild extends Component {

    constructor(props) {
        console.log('Hello! 🇺🇸');
        super(props);
        this.state = {
            // USA: false,
            // France: false,
            place: 'NYC',
            date: new Date(),
            center: [-74.0060, 40.7128]

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
       place: value
    });

    function calcTime(offset){
        let d = new Date();
        let utc = d.getTime() +(d.getTimezoneOffset()*60000);
        let nd = new Date(utc + (3600000*offset));
        return nd.toLocaleString();
    }
    if (value === 'Paris'){

        //NEW way https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
        
        this.setState({
            date: calcTime('+1'),
            center: [2.3522, 48.8566]
        });
    } 
    else{
        this.setState({
            // date: new Date(),
            date: calcTime('-5'),
            center: [-74.0060, 40.7128]
        });
    }
    }

    componentDidMount(){
        console.log('Salut!🇫🇷');
    }

    componentDidUpdate(){
        
    }

    render() {
        return (
            <div>
                <form>
                    <label>{config.text.instructions.content}</label><br/>
                    <label>{config.text.instructions.options.option1}<input type='radio' checked={this.state.place==='NYC'} name='city' value='NYC' onChange={this.handleInputChange} />
                    </label>
                    <label>{config.text.instructions.options.option2}<input type='radio' checked={this.state.place==='Paris'} name='city' value='Paris' onChange={this.handleInputChange} />
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