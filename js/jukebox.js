function Jukebox() {
    this.currentSong = null;
    this.songs = [];
    this.seekInput = null;
    this.volumeInput = null;

    this.getSongs = function() {
        return this.songs;
    };

    this.addSong = function(song) {
        this.songs.push(song);
    };

    this.getCurrentSong = function() {
        return this.currentSong;
    };

    this.start = function() {
        this.playSongNumber(0);
    };

    this.setCurrentSong = function(song) {

        if (null !== this.currentSong) {
            this.currentSong.reset();
        }

        this.currentSong = song;

        if (this.seekInput) {
            var self = this;

            this.currentSong.audio.addEventListener('loadedmetadata', function() {
                self.currentSong.audio.addEventListener('timeupdate', function() {
                    self.seekInput.max = self.currentSong.audio.duration;
                    self.seekInput.value = self.currentSong.audio.currentTime;
                });
            });
        }

        this.currentSong.play();
    };

    this.getCurrentSong = function() {
        return this.currentSong;
    };

    this.playSongNumber = function(number) {

        let song = this.getSongs()[number];
        let isSameSong = this.getCurrentSong() == song;

        if (isSameSong && song.isPlaying()) {
            song.pause();
            return;
        }

        if (isSameSong && song.isPaused()) {
            song.play();
            return;
        }

        // No song is playing, another song
        // is playing, or another song is paused.
        // Reset the song (if any) and play this one.
        this.setCurrentSong(song);
    };

    this.setVolumeControl = function(input) {
        this.volumeInput = input;
        var self = this;
        input.addEventListener('change', function() {
            self.currentSong.audio.volume = input.value;
        });
    };

    this.setSeekControl = function(input) {
        this.seekInput = input;
        var self = this;
        input.addEventListener('change', function() {
            self.currentSong.audio.currentTime = input.value;
        });
    };

    this.setPlayPauseBtn = function(button) {
        var self = this;
        button.addEventListener('click', function() {
            var className = button.className === 'playing' ? 'paused' : 'playing';
            button.className = className;
            self.currentSong.toggle();
        });
    };

    this.setNextBtn = function(button) {
        var self = this;
        button.addEventListener('click', function() {
            var next = self.songs.indexOf(self.currentSong) + 1;
            next = self.songs.length == next ? 0 : next;
            self.playSongNumber(next);
        });
    };

    this.setBackBtn = function(button) {
        var self = this;
        button.addEventListener('click', function() {
            var next = self.songs.indexOf(self.currentSong) - 1;

            if (next < 0) {
                next = self.songs.length - 1;
            }

            self.playSongNumber(next);
        });
    };
}