Page({
  goToQuiz() {
    const app = getApp();
    if (app && typeof app.playBgm === "function") {
      app.playBgm();
    }

    wx.navigateTo({
      url: "/pages/quiz/quiz"
    });
  }
});
