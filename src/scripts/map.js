import { Loader } from 'google-maps';
import { fourteeners } from '../../assets/14er';
import Fourteener from './fourteener';


class Map {
    constructor(container) {
        this.container = container;

        this.initializeMap = this.initializeMap.bind(this);

        this.initializeMap();
    }

    async initializeMap() {
        const loader = new Loader(process.env.GOOGLE_MAPS_API_KEY, {})
        const google = await loader.load();
        const { Map } = await google.maps.importLibrary("maps");
        const { Marker } = await google.maps.importLibrary("marker");

        this.map = new Map(this.container, {
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
                // icon: "../assets/mountain-icon.png",
                title: `${fourteener.mountainPeak}`
            })

            marker.addListener('click', () => {
                let fourteenerContainer = document.querySelector('.fourteener-container')
                let select = document.querySelector('select');
                select.selectedIndex = marker.id;
                let fourteenerObj = fourteeners[marker.id]
                new Fourteener(fourteenerContainer, fourteenerObj)
            })

            marker.setMap(this.map);
        })
    }
}

export default Map;