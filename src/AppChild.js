import React, { Component } from 'react';
import './AppChild.css';
import City from './City.js';

//ESRI NPM PACKAGE VERSION, from Boyan example: https://codesandbox.io/s/n9k0jp8lyp
import { loadModules, loadCss } from 'esri-loader';
import { esriCSS, esriOptions } from './config';
loadCss(esriCSS);
//ESRI NPM PACKAGE VERSION


var view; //Had to make this var global so handleInputChange had access to it

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

    componentDidMount() {
        loadModules(
            ["esri/Map", "esri/views/MapView", "esri/views/MapView"],
            esriOptions
        )
            .then(([Map, MapView]) => {
                const map = new Map({ basemap: "dark-gray-vector" });

                view = new MapView({
                    map: map,
                    container: "mapContainer",
                    center: this.state.center,
                    zoom: 3,
                });                
            })
            .catch(err => {
                console.error(err);
            });
    }

     //UTC time diff calc https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
    calcTime(offset) {
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000 * offset));
        return nd.toLocaleString();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        let newDate;
        let newCenter;

        if (value === 'Paris') {

            view.goTo([2.3522, 48.8566], { duration: 500 });
            newDate = this.calcTime('+1');
            newCenter = [2.3522, 48.8566];
        }
        else {

            view.goTo([-74.0060, 40.7128], { duration: 500 });
            newDate = this.calcTime('-5');
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
                    <label>Select A Country</label><br />
                    <label>USA<input type='radio' checked={this.state.place === 'NYC'} name='city' value='NYC' onChange={this.handleInputChange} />
                    </label>
                    <label>France<input type='radio' checked={this.state.place === 'Paris'} name='city' value='Paris' onChange={this.handleInputChange} />
                    </label>
                </form>
                <City place={this.state.place}
                    date={this.state.date.toString()}
                    center={this.state.center.toString()}
                />
                <div id='mapContainer' />
            </div>
        );
    }
}

export default AppChild;
//checkbox. input w/ type, checked property T/F based on state