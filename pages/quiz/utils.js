const HIGH_E_THRESHOLD = 16;
const HIGH_I_THRESHOLD = 16;

const HIGH_P_THRESHOLD = 20;
const HIGH_L_THRESHOLD = 20;
const HIGH_S_THRESHOLD = 17;
const HIGH_X_THRESHOLD = 15;

// P L有7项互斥

const dimensionThresholds = {
  E: HIGH_E_THRESHOLD,
  I: HIGH_I_THRESHOLD,
  L: HIGH_L_THRESHOLD,
  S: HIGH_S_THRESHOLD,
  X: HIGH_X_THRESHOLD,
  P: HIGH_P_THRESHOLD
};

const a1 = 0.1;
const a2 = 0.35;
const a3 = 0.6;

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
  if (P > HIGH_P_THRESHOLD * a2) {
    if (L > HIGH_L_THRESHOLD * a1) {
      if (E >= I + 4) {
        return "RTH";
      } else if (I > E + 2) {
        return "MIRACLE";
      }
    } else {
      return "MAFIA";
    }
  } else if (S > HIGH_S_THRESHOLD * a2) {
    // 第三优先级：高辅助组
    if (I > HIGH_I_THRESHOLD * a2) {
      return "FOREST";
    }
    else if (E < HIGH_E_THRESHOLD * a3) {
      return "MAJIA";
    }
  } else if (X > HIGH_X_THRESHOLD * a2) {
    // 第二优先级：高搞怪组
    if (I > E + 2 && P > 0) {
      return "QUEEN";
    } else if (E > I + 2) {
      return "WQNL";
    } else {
      return "AJEOSSI";
    }
  } else if (E >= HIGH_E_THRESHOLD * a3) {
    // 第四优先级：基础能量组
    return "EEEE";
  } else if (P <= 1 || L <= 1) {
    return "O_RLY";
  } else {
    return "HAHA";
  }
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
