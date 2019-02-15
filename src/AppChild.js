import React, { Component } from 'react';
import './AppChild.css';
import City from './City.js';

//ESRI NPM PACKAGE VERSION, from Boyan example: https://codesandbox.io/s/n9k0jp8lyp
import { loadModules, loadCss } from 'esri-loader';
import { esriCSS, esriOptions } from './config';
loadCss(esriCSS);
//ESRI NPM PACKAGE VERSION

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

                const view = new MapView({
                    map: map,
                    container: "mapContainer",
                    center: [-74.0060, 40.7128],
                    zoom: 3,
                });
                this.setState({ view })
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        let newDate;

        //UTC time diff calc https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
        function calcTime(offset) {
            let d = new Date();
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            let nd = new Date(utc + (3600000 * offset));
            return nd.toLocaleString();
        }
        if (value === 'Paris') {


            const view = this.state.view;
            view.goTo([2.3522, 48.8566], { duration: 500 });
             newDate = calcTime('+1');
                // center: [2.3522, 48.8566]
        }
        else {
            const view = this.state.view;
            view.goTo([-74.0060, 40.7128], { duration: 500 });
            newDate = calcTime('-5');
                // center: [-74.0060, 40.7128]
        }

        this.setState({
            place: value,
            date: newDate
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
                    {/* {this.state.France === true && <img src={Flag_of_France} alt='French Flag' />} */}
                </form>
                <City place={this.state.place}
                    date={this.state.date.toString()}
                    center={this.state.center.toString()}
                />
                {/* {this.state.USA === true && <div className='city_container'>You're going to New York City!<img src={Flag_of_USA} alt='French Flag' /></div>}
                    {this.state.France === true && <div className='city_container'>You're going to Paris!<img src={Flag_of_France} alt='French Flag' /></div>} */}
                <div id='mapContainer' />
            </div>
        );
    }
}

export default AppChild;
//checkbox. input w/ type, checked property T/F based on state