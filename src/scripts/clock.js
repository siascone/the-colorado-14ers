class Clock {
    constructor (timeZone, clockElement) {
        this.timeZone = timeZone;
        this.clockElement = clockElement;

        this.tick = this.tick.bind(this)

        this.tick();
        setInterval(this.tick, 1000)

    }

    tick() {
        this.current = new Date()
        this.localTime = this.current.toLocaleString("en-US", { timeZone: this.timeZone });
        
        this.localTimePieces = this.localTime.split(" ")

        this.clockElement.innerText = `${this.localTimePieces[1]} ${this.localTimePieces[2]} MT`

    }
}

export default Clock;