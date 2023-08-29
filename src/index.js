import { fourteeners } from '../assets/14er';
import Fourteener from './scripts/fourteener';
import Select from './scripts/select';
// require('dotenv').config();
import { Loader, LoaderOptions } from 'google-maps';

document.addEventListener('DOMContentLoaded', () => {

    if (process.env.NODE_ENV === "development") {
        console.log('in development mode')
        // require("dotenv").config({ path: './src/.env' });
    }

    const select = document.querySelector('.select-container')
    new Select(select)

    let map;

    async function initMap() {
        const loader = new Loader(process.env.GOOGLE_MAPS_API_KEY, {})
        const google = await loader.load();
        const { Map } = await google.maps.importLibrary("maps");
        const { Marker } = await google.maps.importLibrary("marker");
        
        map = new Map(document.querySelector('.fourteener-map'), {
            center: {
                lat: 39.217694,
                lng: -105.706472
            },
            zoom: 7,
        })

        Object.values(fourteeners).forEach(fourteener => {
            let marker = new Marker({
                position: {
                    lat: fourteener.lat,
                    lng: fourteener.long
                },
                id: fourteener.id,
                title: `${fourteener.mountainPeak}`
            })

            marker.addListener('click', () => {
                let container = document.querySelector('.fourteener-container')
                let fourteenerObj = fourteeners[marker.id]
                new Fourteener(container, fourteenerObj)
            })

            marker.setMap(map);
        })
    }

    initMap();
})