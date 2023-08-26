import { fourteeners } from "../../assets/14er";
import Fourteener from "./fourteener";

class Select {
    constructor(container) {
        this.container = container;
        this.select = document.createElement('select');
        this.initializeSelect = this.initializeSelect.bind(this);
        this.addFourteener = this.addFourteener.bind(this);
        this.registerEvents = this.registerEvents.bind(this);
        this.initializeSelect();
        this.registerEvents();
    }

    initializeSelect() {
        let defaultOption = document.createElement('option');
        defaultOption.value = 'default';
        defaultOption.innerText = 'Select a 14er';
        this.select.appendChild(defaultOption);
        
        Object.values(fourteeners).forEach(fourteener => {
            let peakName = fourteener["Mountain Peak"];
            let option = document.createElement('option');
            option.value = peakName;
            option.id = fourteener.id
            option.innerText = peakName;
            this.select.appendChild(option);
        });
        
        this.container.appendChild(this.select);
    }

    addFourteener() {
        let container = document.querySelector('.fourteener-container');
        let fourteenerId = this.select.options[this.select.selectedIndex].id;
        // debugger
        let fourteenerObj = fourteeners[fourteenerId]
        // console.log(fourteenerObj)
        new Fourteener(container, fourteenerObj)
    }

    registerEvents() {
        this.select.addEventListener('change', this.addFourteener);
    }

}

export default Select;