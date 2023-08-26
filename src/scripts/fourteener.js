class Fourteener {
    constructor(container, data) {
        this.data = data;
        this.container = container

        this.addImage = this.addImage.bind(this);
        this.buildFourteenr = this.buildFourteenr.bind(this);

        console.log(this.data)

        this.buildFourteenr();
    }

    buildFourteenr() {
        this.addImage()
    }

    addImage() {
        let image = document.querySelector('.fourteener-image')
        image.src = this.data.photo
        this.container.appendChild(image)
    }
}

export default Fourteener;