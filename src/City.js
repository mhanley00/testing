

import React from 'react';

import Flag_of_France from './Flag_of_France.svg';
import Flag_of_USA from './Flag_of_USA.svg';

function City(props){
//functional component

        // let usaTime = new Date();
        // // usaTime = new Date(usaTime);
        // console.log('USA time: '+usaTime.toLocaleString());
        // console.log(`usa Hours: ${usaTime.getHours()}`);
        // let franceTime = `${usaTime.getHours() + 6}:#`;
        // console.log(franceTime);

        // let franceTime = new Date().toLocaleString("en-GB", {timeZone: "Europe/Paris"});
        // franceTime = new Date(franceTime);
        // console.log('France time: ' +franceTime.toLocaleString());

return (
    
            <div>
                
                    {props.place === 'NYC' && <div className='city_container'>You're going to New York City! 
                    <br/>The time is now {props.date}
                    <br/>
                    <img src={Flag_of_USA} alt='French Flag' />
                    <br/>
                    New York City is at {props.center}</div>}
                    {props.place === 'Paris' && <div className='city_container'>You're going to Paris!
                    <br/>
                    The time is now {props.date}
                    <br/>
                    <img src={Flag_of_France} alt='French Flag' />
                    <br/>
                    Paris is at: {props.center}</div>}
                
            </div>
)};

export default City;
//checkbox. input w/ type, checked property T/F based on state