const BGM_LIST = [
  {
    title: "Next To Me",
    url: "https://videotourl.com/audio/1776929147213-4d0b92fd-f911-4426-a7f3-b89fdd1ad0f9.m4a"
  },
  {
    title: "Co-Star",
    url: "https://videotourl.com/audio/1776929944416-24e4fa83-b435-4315-95ae-ee28ca76d147.m4a"
  },
  {
    title: "Slo-Mo",
    url: "https://videotourl.com/audio/1776929744138-0d6e3c85-ce6d-472c-921b-bf824c8c8366.m4a"
  },
  {
    title: "Keep on Moving",
    url: "https://videotourl.com/audio/1776929839920-e5f3fbc7-580c-480e-9071-2a26c9341721.m4a"
  },
  {
    title: "Eye to Eye",
    url: "https://videotourl.com/audio/1776929917438-b026729a-e8d9-48b7-8d19-aca23acd655f.m4a"
  },
  {
    title: "Make it Better",
    url: "https://videotourl.com/audio/1776929976439-ec7eb9be-8047-4f5b-ae63-5b8939c309ab.m4a"
  },
  {
    title: "One Day",
    url: "https://videotourl.com/audio/1776930043209-ff7f320f-2272-4840-83c2-8252189dbd71.m4a"
  },
  {
    title: "Ride the Vibe",
    url: "https://videotourl.com/audio/1776930095993-dde661cb-11da-411d-ae4d-15b2c04ea218.m4a"
  },
  {
    title: "Run With Me",
    url: "https://videotourl.com/audio/1776930160109-502991cb-6b2d-436a-98ab-04bcb165959d.m4a"
  }
];

const BGM_DEFAULT = {
  title: "NEX-ti for NEX2Y BGM",
  url: BGM_LIST[0].url
};

function pickRandomBgm() {
  if (!BGM_LIST.length) {
    return BGM_DEFAULT;
  }

  const index = Math.floor(Math.random() * BGM_LIST.length);
  return BGM_LIST[index];
}

App({
  globalData: {
    bgmStarted: false,
    bgmTrack: null
  },

  onLaunch() {
    this.globalData.bgmTrack = pickRandomBgm();
    this.globalData.bgmStarted = false;
    this.playBgm();
  },

  onShow() {
    this.playBgm();
  },

  getBgmManager() {
    if (!this.bgmManager) {
      this.bgmManager = wx.getBackgroundAudioManager();
      this.bgmManager.singer = "NEX-ti";
      this.bgmManager.coverImgUrl = "https://i.ibb.co/DgDct3rv/nexzoo.jpg";
      this.bgmManager.loop = true;
    }

    return this.bgmManager;
  },

  playBgm() {
    const manager = this.getBgmManager();
    const track = this.globalData.bgmTrack || BGM_DEFAULT;

    manager.title = track.title;
    manager.epname = track.title;

    if (!this.globalData.bgmStarted || manager.src !== track.url) {
      manager.src = track.url;
      this.globalData.bgmStarted = true;
      return;
    }

    manager.play();
  }
});
