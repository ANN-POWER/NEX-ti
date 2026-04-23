const BGM_URL = "https://videotourl.com/audio/1776929147213-4d0b92fd-f911-4426-a7f3-b89fdd1ad0f9.m4a";
const BGM_TITLE = "NEX-ti for NEX2Y BGM";

App({
  globalData: {
    bgmStarted: false
  },

  onLaunch() {
    this.playBgm();
  },

  onShow() {
    this.playBgm();
  },

  getBgmManager() {
    if (!this.bgmManager) {
      this.bgmManager = wx.getBackgroundAudioManager();
      this.bgmManager.title = BGM_TITLE;
      this.bgmManager.epname = BGM_TITLE;
      this.bgmManager.singer = "NEX-ti";
      this.bgmManager.coverImgUrl = "https://i.ibb.co/DgDct3rv/nexzoo.jpg";
      this.bgmManager.loop = true;
    }

    return this.bgmManager;
  },

  playBgm() {
    const manager = this.getBgmManager();

    if (!this.globalData.bgmStarted || manager.src !== BGM_URL) {
      manager.src = BGM_URL;
      this.globalData.bgmStarted = true;
      return;
    }

    manager.play();
  }
});
