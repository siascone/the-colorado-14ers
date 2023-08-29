import { fourteeners } from '../assets/14er';
import Fourteener from './scripts/fourteener';
import Select from './scripts/select';
// require('dotenv').config();
// import { Loader, LoaderOptions } from 'google-maps';
import Map from './scripts/map';

document.addEventListener('DOMContentLoaded', () => {

    if (process.env.NODE_ENV === "development") {
        console.log('in development mode')
    }

    const select = document.querySelector('.select-container')
    new Select(select)

    const map = document.querySelector('.fourteener-map');
    new Map(map)
    
    var x = document.getElementById("root");
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    
    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }
})