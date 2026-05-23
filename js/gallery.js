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
}
