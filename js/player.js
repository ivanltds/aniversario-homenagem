export class PlayerState {
  constructor(playlist = []) {
    this.playlist = playlist;
    this.currentIndex = 0;
    this.isPlaying = false;
  }

  getCurrentTrack() {
    if (this.playlist.length === 0) return null;
    return this.playlist[this.currentIndex];
  }

  play() {
    this.isPlaying = true;
    return this.getCurrentTrack();
  }

  pause() {
    this.isPlaying = false;
    return this.getCurrentTrack();
  }

  nextTrack() {
    if (this.playlist.length === 0) return null;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    return this.getCurrentTrack();
  }
}
