class Fourteener {
    constructor(container, data) {
        this.data = data;
        this.container = container

        this.addHeading = this.addHeading.bind(this);
        // this.addMetrics = this.addMetrics.bind(this);
        this.addDetails = this.addDetails.bind(this);
        this.addImage = this.addImage.bind(this);
        this.buildFourteenr = this.buildFourteenr.bind(this);

        // console.log(this.data)

        this.buildFourteenr();
    }

    buildFourteenr() {
        let card = document.createElement('div')
        card.classList.add('fourteener-card')
        
        this.addImage(card);
        this.addDetails(card);

        this.container.innerHTML = "";
        this.container.appendChild(card)
    }

    // addDetails() {

    //     // this.addHeading();
    //     this.addMetrics();

    // }

    addHeading(card) {
        let heading = document.createElement('h2');
        heading.innerText = this.data.mountainPeak;
        this.container.appendChild(heading);
    }

    addDetails(card) {
        let heading = document.createElement('h2');
        heading.innerText = this.data.mountainPeak;
        let metricsContainer = document.createElement('div');
        metricsContainer.classList.add('metrics-container');
        let elevation = document.createElement('p');
        elevation.innerText = `Elevation: ${this.data.elevation} ft.`;
        let difficulty = document.createElement('p');
        difficulty.innerText = `Difficulty: ${this.data.difficulty}`;
        let mountainRange = document.createElement('p');
        mountainRange.innerText = `Mountain Range: ${this.data.mountainRange}`;

        let metrics = [heading, elevation, difficulty, mountainRange]

        // metricsContainer.appendChild(elevation)
        metrics.forEach(metric => metricsContainer.appendChild(metric));

        card.appendChild(metricsContainer);
    }

    addImage(card) {
        let image = document.createElement('img');
        image.src = this.data.photo;
        image.classList.add('fourteener-image');
        card.appendChild(image);
    }
}

export default Fourteener;