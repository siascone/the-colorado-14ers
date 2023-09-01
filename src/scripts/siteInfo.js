

{/* <h2>Welcome to The Colorado 14ers, an informational guide!</h2>
<img class="rockies" src="./assets/RMNP.avif" alt="">
<p>If you would like to know more about any one of Colorado's 58 peaks that are over 14,000 ft, select one by name from the dropdown menu above or by location on the map. 
<br>
<br>
Information about a peak, directions and summitting details will be displayed here. <br>
<br>
Local weather conditions and forcast will be displabyed below.</p> */}

class SiteInfo {
    constructor(container) {
        this.container = container;

        this.addInfo = this.addInfo.bind(this)
        this.addInfo()
    }

    addInfo() {
        let heading = document.createElement('h2')
        heading.innerText = "Welcome to my guild on The Colorado 14ers!"

        let image = document.createElement('img')
        image.src = "./assets/RMNP.avif"
        image.classList.add('rockies')

        let info = document.createElement('div')
        info.classList.add('info')

        let p1 = document.createElement('p')
        p1.classList.add('info-p1')
        p1.innerText = "Marmy the Rocky Mountain Marmot here."

        let p2 = document.createElement('p')
        p2.classList.add('info-p2')
        p2.innerText = "If you would like to learn more about any one of Colorado's 58 peaks that are over 14,000 ft, select one by name from the dropdown menu above or by location on the map."

        let p3 = document.createElement('p')
        p3.classList.add('info-p3')
        p3.innerText = "Information about a peak, directions and summitting details will be displayed here."

        let p4 = document.createElement('p')
        p4.classList.add('info-p4')
        p4.innerText = "Local weather conditions and forcast will be displabyed below."
        
        let p5 = document.createElement('p')
        p5.classList.add('info-p5')
        p5.innerText = `To view this information card again click the "i" icon in the navigation menu above.`

        let details = [p1, p2, p3, p4, p5]
        details.forEach(p => {
            info.appendChild(p)
        })

        this.container.innerHTML = ""
        this.container.appendChild(heading)
        this.container.appendChild(image)
        this.container.appendChild(info)
    }
}

export default SiteInfo;