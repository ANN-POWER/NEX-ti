const { getQuizQuestions } = require("./data");
const { calculateResult, getInitialScores, dimensionThresholds } = require("./utils");
const { resultProfiles } = require("./result-data");


const dimensionLabels = {
  E: "外向/社交能量",
  I: "内向/独处能量",
  L: "领导/掌控欲",
  S: "辅助/照顾他人",
  X: "搞怪/自由灵魂",
  P: "洞察力"
};


const memberWeights = {
  E: [9, 9, 8, 6, 0, 3.5, 2],
  I: [4, 0, 1, 7, 11, 12, 12],
  L: [6, 10, 4.5, 8.5, 0, 8, 3.5],
  S: [12, 5, 2, 5, 9, 5.5, 3],
  X: [2, 2.5, 10, 3, 9, 2.5, 8.5],
  P: [2, 9, 9, 6.5, 8, 5, 7.5]
};

const OPTION_FEEDBACK_DELAY = 240;

const memberImageUrls = [
  "https://i.ibb.co/gMzD95vR/m1.png",
  "https://i.ibb.co/Lh5RmCvX/m2.png",
  "https://i.ibb.co/WWSrtCHT/m3.png",
  "https://i.ibb.co/6727sk2D/m4.png",
  "https://i.ibb.co/6cNp7zJ5/m5.png",
  "https://i.ibb.co/GvbMH4G0/m6.png",
  "https://i.ibb.co/5hLRwnhf/m7.png"
];

const memberNames = ["YU", "TOMOYA", "HARU", "SO GEON", "SEITA", "HYUI", "YUKI"];

function getResultTheme(resultKey) {
  if (resultKey === "MAFIA") {
    return "mafia";
  }

  if (resultKey === "QUEEN") {
    return "queen";
  }

  if (resultKey === "FOREST") {
    return "forest";
  }

  return "default";
}

function buildMemberBars(scores) {
  const members = [0, 0, 0, 0, 0, 0, 0];
  const dimensions = Object.keys(memberWeights);
  const dimensionRates = {};

  dimensions.forEach((key) => {
    const threshold = dimensionThresholds[key] || 1;
    const rawRate = (scores[key] || 0) / threshold;
    dimensionRates[key] = Math.max(0, rawRate);
  });

  const totalRate = dimensions.reduce((sum, key) => sum + dimensionRates[key], 0);

  const normalizedRates = {};
  dimensions.forEach((key) => {
    normalizedRates[key] = totalRate > 0 ? dimensionRates[key] / totalRate : 0;
  });

  dimensions.forEach((key) => {
    const rate = normalizedRates[key];
    const weights = memberWeights[key];

    for (let i = 0; i < members.length; i += 1) {
      members[i] += rate * weights[i];
    }
  });

  const minScore = Math.min(...members);
  const maxScore = Math.max(...members);
  const minHeight = 130;
  const maxHeight = 260;
  const scoreRange = maxScore - minScore;

  return members.map((score, index) => ({
    key: `z${index + 1}`,
    name: memberNames[index],
    src: memberImageUrls[index],
    score: Number(score.toFixed(2)),
    heightRpx: scoreRange > 0
      ? Math.round(minHeight + ((score - minScore) / scoreRange) * (maxHeight - minHeight))
      : Math.round((minHeight + maxHeight) / 2)
  }));
}

Page({
  data: {
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    currentOptions: [],
    progress: 0,
    scores: getInitialScores(),
    answerHistory: [],
    showResult: false,
    resultProfile: null,
    resultDescription: "",
    dimensionBreakdown: [],
    memberBars: [],
    resultTheme: "default",
    selectedOptionIndex: null,
    isSelecting: false
  },

  onReady() {
    this.optionCache = {};
  },

  onLoad() {
    const app = getApp();
    if (app && typeof app.playBgm === "function") {
      app.playBgm();
    }

    this.optionCache = {};
    const sessionQuestions = getQuizQuestions();
    this.setData({
      questions: sessionQuestions,
      currentIndex: 0,
      currentQuestion: sessionQuestions[0] || null,
      currentOptions: this.getOrBuildOptions(0, sessionQuestions),
      progress: sessionQuestions.length ? (1 / sessionQuestions.length) * 100 : 0
    });
  },

  getOptionLabel(index) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (index < alphabet.length) {
      return alphabet[index];
    }

    const first = Math.floor(index / alphabet.length) - 1;
    const second = index % alphabet.length;
    return `${alphabet[first]}${alphabet[second]}`;
  },

  shuffleList(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  },

  buildLabeledOptions(options) {
    const indexed = (options || []).map((option, originalIndex) => ({
      ...option,
      originalIndex
    }));

    return this.shuffleList(indexed).slice(0, 4).map((option, index) => ({
      ...option,
      label: this.getOptionLabel(index)
    }));
  },

  getOrBuildOptions(questionIndex, questionList) {
    const question = (questionList || [])[questionIndex];
    if (!question) {
      return [];
    }

    if (!this.optionCache) {
      this.optionCache = {};
    }

    if (!this.optionCache[questionIndex]) {
      this.optionCache[questionIndex] = this.buildLabeledOptions(question.options);
    }

    return this.optionCache[questionIndex];
  },

  answerQuestion(e) {
    if (this.data.isSelecting) {
      return;
    }

    const optionIndex = Number(e.currentTarget.dataset.index);
    const { currentIndex, questions: questionList, answerHistory } = this.data;

    const nextIndex = currentIndex + 1;
    const nextHistory = answerHistory.concat(optionIndex);

    this.setData({
      selectedOptionIndex: optionIndex,
      isSelecting: true
    });

    if (this.optionFeedbackTimer) {
      clearTimeout(this.optionFeedbackTimer);
    }

    this.optionFeedbackTimer = setTimeout(() => {
      if (nextIndex < questionList.length) {
        const preview = calculateResult(nextHistory, questionList);
        this.setData({
          scores: preview.scores,
          answerHistory: nextHistory,
          currentIndex: nextIndex,
          currentQuestion: questionList[nextIndex],
          currentOptions: this.getOrBuildOptions(nextIndex, questionList),
          progress: ((nextIndex + 1) / questionList.length) * 100,
          selectedOptionIndex: null,
          isSelecting: false
        });
        return;
      }

      this.setData({
        selectedOptionIndex: null,
        isSelecting: false
      });
      this.showResult(nextHistory);
    }, OPTION_FEEDBACK_DELAY);
  },

  goToPreviousQuestion() {
    if (this.data.isSelecting) {
      return;
    }

    const { currentIndex, answerHistory, questions: questionList } = this.data;
    if (currentIndex === 0 || answerHistory.length === 0) {
      return;
    }

    const previousIndex = currentIndex - 1;
    const previousHistory = answerHistory.slice(0, -1);
    const preview = calculateResult(previousHistory, questionList);

    this.setData({
      scores: preview.scores,
      answerHistory: previousHistory,
      currentIndex: previousIndex,
      currentQuestion: questionList[previousIndex],
      currentOptions: this.getOrBuildOptions(previousIndex, questionList),
      progress: ((previousIndex + 1) / questionList.length) * 100,
      selectedOptionIndex: null,
      isSelecting: false
    });
  },

  showResult(answerHistory) {
    const { questions: questionList } = this.data;
    const { scores, resultKey } = calculateResult(answerHistory, questionList);
    const profile = resultProfiles[resultKey] || resultProfiles.FOREST;
    const dimensionBreakdown = Object.keys(scores).map((key) => `${dimensionLabels[key]}: ${scores[key]}`);
    const memberBars = buildMemberBars(scores);
    const resultTheme = getResultTheme(resultKey);

    this.setData({
      scores,
      answerHistory,
      showResult: true,
      resultProfile: profile,
      resultDescription: profile.summary,
      dimensionBreakdown,
      memberBars,
      resultTheme
    });
  },

  onUnload() {
    if (this.optionFeedbackTimer) {
      clearTimeout(this.optionFeedbackTimer);
    }
  },

  resetQuiz() {
    this.optionCache = {};
    if (this.optionFeedbackTimer) {
      clearTimeout(this.optionFeedbackTimer);
    }
    const sessionQuestions = getQuizQuestions();
    this.setData({
      questions: sessionQuestions,
      currentIndex: 0,
      currentQuestion: sessionQuestions[0] || null,
      currentOptions: this.getOrBuildOptions(0, sessionQuestions),
      progress: sessionQuestions.length ? (1 / sessionQuestions.length) * 100 : 0,
      scores: getInitialScores(),
      answerHistory: [],
      showResult: false,
      resultProfile: null,
      resultDescription: "",
      dimensionBreakdown: [],
      memberBars: [],
      resultTheme: "default",
      selectedOptionIndex: null,
      isSelecting: false
    });
  }
});
