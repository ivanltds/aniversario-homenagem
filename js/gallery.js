export class GalleryState {
  constructor(photosData = {}) {
    this.photosData = photosData;
    this.currentTab = 'sozinha';
  }

  getImages() {
    return this.photosData[this.currentTab] || [];
  }

  switchTab(tabName) {
    if (this.photosData[tabName]) {
      this.currentTab = tabName;
    }
    return this.getImages();
  }

  getRandomizedImages(tabName = this.currentTab) {
    const list = this.photosData[tabName] || [];
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
