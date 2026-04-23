const HIGH_E_THRESHOLD = 17;
const HIGH_I_THRESHOLD = 17;

const HIGH_P_THRESHOLD = 21;
const HIGH_L_THRESHOLD = 22;
const HIGH_S_THRESHOLD = 18;
const HIGH_X_THRESHOLD = 16;

// P L有7项互斥

const dimensionThresholds = {
  E: HIGH_E_THRESHOLD,
  I: HIGH_I_THRESHOLD,
  L: HIGH_L_THRESHOLD,
  S: HIGH_S_THRESHOLD,
  X: HIGH_X_THRESHOLD,
  P: HIGH_P_THRESHOLD
};

const a1 = 0.15;
const a2 = 0.25;
const a3 = 0.41;

function getInitialScores() {
  return { E: 0, I: 0, L: 0, S: 0, X: 0, P: 0 };
}

function calculateScores(answers, questionList) {
  const scores = getInitialScores();
  const questions = questionList || [];

  answers.forEach((optionIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) {
      return;
    }

    if (question.countForScore === false) {
      return;
    }

    const option = question.options[optionIndex];
    if (!option || !Array.isArray(option.type)) {
      return;
    }

    option.type.forEach((typeKey) => {
      if (Object.prototype.hasOwnProperty.call(scores, typeKey)) {
        scores[typeKey] += 1;
      }
    });
  });

  return scores;
}

function getResultKey(scores) {
  const { E, I, L, S, X, P } = scores;

  // 第一优先级：高洞察力组
  if (P > HIGH_P_THRESHOLD * a3) {
    return "MAFIA";
  }
  if (L > HIGH_L_THRESHOLD * a2) {
    if (P > HIGH_P_THRESHOLD * a2 && E >= I + 2) {
      return "RTH";
    }
    if (I > E + 2 && P > HIGH_P_THRESHOLD * a1) {
      return "MIRACLE";
    }
  }

  // 第二优先级：高搞怪组
  if (X > HIGH_X_THRESHOLD * a2) {
    if (I > E && P > 0) {
      return "QUEEN";
    } else if (E > I + 1) {
      return "WQNL";
    }
  }

  if (E >= HIGH_E_THRESHOLD * a3) {
    // 第四优先级：基础能量组
    return "EEEE";
  }

  // 第三优先级：高辅助组
  if (S > HIGH_S_THRESHOLD * a2) {
    if (I > HIGH_I_THRESHOLD * a3 - 1) {
      return "FOREST";
    }
  }
  if (P <= HIGH_P_THRESHOLD * a1 || L <= HIGH_L_THRESHOLD * a1) {
    return "O_RLY";
  }
  if (S > HIGH_S_THRESHOLD * a2) {
    if (L > HIGH_L_THRESHOLD * a1) {
      return "MAJIA";
    }
  }



  if (X > HIGH_X_THRESHOLD * a1 && P > 1) {
    return "AJEOSSI";
  }



  return "HAHA";

}

function calculateResult(answers, questionList) {
  const scores = calculateScores(answers || [], questionList || []);
  const resultKey = getResultKey(scores);

  return {
    scores,
    resultKey
  };
}

module.exports = {
  calculateResult,
  getInitialScores,
  dimensionThresholds
};
