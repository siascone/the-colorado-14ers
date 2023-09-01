import SiteInfo from "./siteInfo";

class InfoButton {
    constructor(container) {
        this.container = container;

        this.registerEvents = this.registerEvents.bind(this)
        this.registerEvents()
    }

    registerEvents() {
        this.container.addEventListener("click", () => {
            let siteInfo = document.querySelector('.fourteener-container')
            new SiteInfo(siteInfo)
        })
    }
}

export default InfoButton;