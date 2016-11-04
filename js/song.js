function Song(el) {
    this.el = el;
    this.audio = new Audio(el.dataset.src);

    this.isPlaying = function() {
        return false === this.audio.paused;
    };

    this.isPaused = function() {
        return this.audio.paused;
    };

    this.toggle = function() {
        if (this.isPlaying()) {
            this.pause();
        } else {
            this.play();
        }
    };

    this.play = function() {
        this.audio.play();
        this.el.className = 'song playing';
    };

    this.pause = function() {
        this.audio.pause();
        this.el.className = 'song paused';
    };

    this.reset = function() {
        this.pause();
        this.audio.currentTime = 0;
    };
}