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
        this.container.innerHTML = "";
        this.addImage();
        this.addDetails();
    }

    // addDetails() {

    //     // this.addHeading();
    //     this.addMetrics();

    // }

    addHeading() {
        let heading = document.createElement('h2');
        heading.innerText = this.data.mountainPeak;
        this.container.appendChild(heading);
    }

    addDetails() {
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

        this.container.appendChild(metricsContainer);
    }

    addImage() {
        let image = document.createElement('img');
        image.src = this.data.photo;
        image.classList.add('fourteener-image');
        this.container.appendChild(image);
    }
}

export default Fourteener;