const questions = [
  // Social energy: S+ (outgoing) / S- (reserved)
  { text: "刚到一场陌生聚会时，你通常会：", options: [{ text: "主动和很多人打招呼", score: { S: 1 } }, { text: "先安静观察，和熟悉的人聊", score: { S: -1 } }] },
  { text: "周末恢复状态你更偏向：", options: [{ text: "和朋友出去玩，越玩越来劲", score: { S: 1 } }, { text: "独处休息，慢慢充电", score: { S: -1 } }] },
  { text: "团队里气氛冷下来时你会：", options: [{ text: "主动热场，带动大家", score: { S: 1 } }, { text: "低调观察，等合适时再说", score: { S: -1 } }] },
  { text: "认识新朋友时你更像：", options: [{ text: "打开话题很快熟络", score: { S: 1 } }, { text: "慢热，但熟了很真诚", score: { S: -1 } }] },
  { text: "被安排临时上台发言时：", options: [{ text: "边说边组织，临场发挥", score: { S: 1 } }, { text: "先在脑中整理再发言", score: { S: -1 } }] },

  // Decision style: D+ (logical) / D- (empathetic)
  { text: "做重要决定时你最看重：", options: [{ text: "效率和可行性", score: { D: 1 } }, { text: "关系和感受", score: { D: -1 } }] },
  { text: "朋友纠结时你通常会：", options: [{ text: "先帮他分析利弊", score: { D: 1 } }, { text: "先安抚情绪再给建议", score: { D: -1 } }] },
  { text: "讨论分歧时你更常：", options: [{ text: "用事实和逻辑说服", score: { D: 1 } }, { text: "考虑每个人的立场感受", score: { D: -1 } }] },
  { text: "面对任务失败复盘时：", options: [{ text: "优先找流程和方法问题", score: { D: 1 } }, { text: "优先关注团队心理状态", score: { D: -1 } }] },
  { text: "你更容易被哪种话打动？", options: [{ text: "有理有据、结构清晰", score: { D: 1 } }, { text: "真诚细腻、情感共鸣", score: { D: -1 } }] },

  // Pace style: P+ (flexible) / P- (planned)
  { text: "开始一个新项目时你习惯：", options: [{ text: "先动起来，边做边调", score: { P: 1 } }, { text: "先把结构和步骤规划好", score: { P: -1 } }] },
  { text: "旅行前你通常：", options: [{ text: "只定大方向，临场决定细节", score: { P: 1 } }, { text: "提前做好行程清单", score: { P: -1 } }] },
  { text: "面对突发变化你更可能：", options: [{ text: "快速切换方案，顺势而为", score: { P: 1 } }, { text: "希望按既定节奏稳住", score: { P: -1 } }] },
  { text: "截止日期还早时你会：", options: [{ text: "灵活探索，后期冲刺", score: { P: 1 } }, { text: "尽早推进，留好缓冲", score: { P: -1 } }] },
  { text: "日常安排你更喜欢：", options: [{ text: "保留随机空间，不要太满", score: { P: 1 } }, { text: "安排清晰，心里更踏实", score: { P: -1 } }] },

  // Conflict response: C+ (direct) / C- (gentle)
  { text: "同伴犯错时你更倾向：", options: [{ text: "直接指出并马上调整", score: { C: 1 } }, { text: "先委婉沟通，照顾自尊", score: { C: -1 } }] },
  { text: "遇到不公平的事时你会：", options: [{ text: "当场表达态度", score: { C: 1 } }, { text: "先观察时机再沟通", score: { C: -1 } }] },
  { text: "冲突升级时你通常：", options: [{ text: "快刀斩乱麻，直切重点", score: { C: 1 } }, { text: "先降温，避免伤害关系", score: { C: -1 } }] },
  { text: "给别人提反馈时你更常：", options: [{ text: "简洁直接，目标导向", score: { C: 1 } }, { text: "温和铺垫，再讲重点", score: { C: -1 } }] },
  { text: "团队意见僵持时你会：", options: [{ text: "强力推进一个明确方案", score: { C: 1 } }, { text: "耐心协调，找平衡点", score: { C: -1 } }] }
];

const roleProfiles = {
  TOMOYA: {
    name: "TOMOYA（队长）",
    summary: "队长兼ACE，外表软萌但内在强势，有领导力与责任心。",
    detail: "你接近 ENFJ（外向、有领导力）风格。像朋哉一样，你擅长统筹团队、记住成员细节，既有实权与主见，也能让大家安心跟随。",
    prototype: { S: 1, D: -1, P: -1, C: 1 }
  },
  YU: {
    name: "YU",
    summary: "可靠的大哥与门面，活泼热情，照顾力和感染力都很强。",
    detail: "你偏 ESFP（外向、热情）气质。像悠一样会照顾身边人，也带着调皮的猫咪感与舞台张力，既能活跃气氛又很有亲和力。",
    prototype: { S: -1, D: -1, P: 1, C: -1 }
  },
  HARU: {
    name: "HARU",
    summary: "舞蹈队长，台前活泼有梗、私下认真冷静，反差感拉满。",
    detail: "你接近 ENTJ（外向、果断）气质。像阳一样，做事标准高、执行果断，既能在舞台放开玩，也能在关键时刻稳住节奏。",
    prototype: { S: -1, D: 1, P: 1, C: 1 }
  },
  SO_GEON: {
    name: "SO GEON",
    summary: "唯一韩国成员，透明感强，单纯软萌，像小狗一样无攻击性。",
    detail: "你偏 INFP（内向、敏感）气质。像苏建一样心思纯净、情绪细腻，常给人懵懵又温和的感觉，容易让人想保护。",
    prototype: { S: 1, D: -1, P: 1, C: -1 }
  },
  SEITA: {
    name: "SEITA",
    summary: "内核稳定的小鹿系成员，寡言但吐槽精准，自带女王气场。",
    detail: "你偏 INTJ（内向、理性）气质。像星太一样不急不躁、观察细致，平时安静克制，但发言常常一针见血。",
    prototype: { S: -1, D: -1, P: -1, C: -1 }
  },
  HYUI: {
    name: "HYUI",
    summary: "松鼠系主Rapper，笑点低又有点懵，台上反差魅力很强。",
    detail: "你偏 INFP（内向、敏感）气质。像优阳一样日常温和爱笑、反应慢半拍，但一到舞台就会展现很强的存在感。",
    prototype: { S: 1, D: 1, P: 1, C: 1 }
  },
  YUKI: {
    name: "YUKI",
    summary: "可爱外形下的成熟忙内，脑内想法多，幽默感独特。",
    detail: "你接近 INTP（内向、逻辑）气质。像裕贵一样虽然年纪最小，却常有自己的判断，既能卖萌也会抛出冷幽默。",
    prototype: { S: 1, D: -1, P: 1, C: 1 }
  }
};

const dimensions = [
  { key: "S", label: "社交能量", pos: "外放", neg: "内敛" },
  { key: "D", label: "决策方式", pos: "理性", neg: "感性" },
  { key: "P", label: "节奏风格", pos: "即兴", neg: "计划" },
  { key: "C", label: "冲突反应", pos: "直接", neg: "温和" }
];

let currentIndex = 0;
let scores = { S: 0, D: 0, P: 0, C: 0 };
let answerHistory = [];

const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const questionTitle = document.getElementById("question-title");
const optionA = document.getElementById("option-a");
const optionB = document.getElementById("option-b");
const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");
const mbtiType = document.getElementById("mbti-type");
const mbtiDescription = document.getElementById("mbti-description");
const dimensionBreakdown = document.getElementById("dimension-breakdown");
const restartBtn = document.getElementById("restart-btn");
const prevBtn = document.getElementById("prev-btn");
const radarCanvas = document.getElementById("radar-canvas");
const shareCanvas = document.getElementById("share-canvas");
const shareBtn = document.getElementById("share-btn");
const downloadLink = document.getElementById("download-link");

let latestRoleKey = null;

function renderQuestion() {
  const q = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  progressText.textContent = `第 ${currentIndex + 1} 题 / 共 ${questions.length} 题`;
  progressBar.style.width = `${progress}%`;
  questionTitle.textContent = q.text;
  optionA.textContent = `A. ${q.options[0].text}`;
  optionB.textContent = `B. ${q.options[1].text}`;
  prevBtn.disabled = currentIndex === 0;
}

function answerQuestion(optionIndex) {
  const pickedScore = questions[currentIndex].options[optionIndex].score;
  Object.keys(pickedScore).forEach((dim) => {
    scores[dim] += pickedScore[dim];
  });
  answerHistory.push(optionIndex);
  currentIndex += 1;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function goToPreviousQuestion() {
  if (currentIndex === 0 || answerHistory.length === 0) {
    return;
  }

  currentIndex -= 1;
  const lastAnswerIndex = answerHistory.pop();
  const lastScore = questions[currentIndex].options[lastAnswerIndex].score;
  Object.keys(lastScore).forEach((dim) => {
    scores[dim] -= lastScore[dim];
  });

  renderQuestion();
}

function getClosestRoleKey() {
  let bestKey = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  Object.keys(roleProfiles).forEach((key) => {
    const prototype = roleProfiles[key].prototype;
    const distance = dimensions.reduce((sum, dim) => {
      return sum + Math.abs(scores[dim.key] - prototype[dim.key] * 5);
    }, 0);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestKey = key;
    }
  });

  return bestKey;
}

function formatDimensionText(dim) {
  const value = scores[dim.key];
  const polarity = value >= 0 ? dim.pos : dim.neg;
  return `${dim.label}: ${polarity}（${value >= 0 ? "+" : ""}${value}）`;
}

function getNormalizedValue(dimValue) {
  const min = -5;
  const max = 5;
  return (dimValue - min) / (max - min);
}

function drawRadarChart(roleName) {
  const ctx = radarCanvas.getContext("2d");
  const width = radarCanvas.width;
  const height = radarCanvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 10;
  const radius = 88;

  ctx.clearRect(0, 0, width, height);

  for (let level = 1; level <= 5; level += 1) {
    const r = (radius / 5) * level;
    ctx.beginPath();
    dimensions.forEach((_, idx) => {
      const angle = (-Math.PI / 2) + (idx * (2 * Math.PI / dimensions.length));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#ddd6fe";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  dimensions.forEach((dim, idx) => {
    const angle = (-Math.PI / 2) + (idx * (2 * Math.PI / dimensions.length));
    const axisX = centerX + Math.cos(angle) * radius;
    const axisY = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(axisX, axisY);
    ctx.strokeStyle = "#c4b5fd";
    ctx.stroke();

    const labelX = centerX + Math.cos(angle) * (radius + 22);
    const labelY = centerY + Math.sin(angle) * (radius + 22);
    ctx.fillStyle = "#4c1d95";
    ctx.font = "13px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText(dim.label, labelX, labelY);
  });

  ctx.beginPath();
  dimensions.forEach((dim, idx) => {
    const value = getNormalizedValue(scores[dim.key]);
    const r = radius * value;
    const angle = (-Math.PI / 2) + (idx * (2 * Math.PI / dimensions.length));
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(236, 72, 153, 0.28)";
  ctx.strokeStyle = "#db2777";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#6d28d9";
  ctx.font = "bold 15px 'Segoe UI'";
  ctx.textAlign = "left";
  ctx.fillText(`匹配角色: ${roleName}`, 14, 24);
}

function buildShareImage(role) {
  const ctx = shareCanvas.getContext("2d");
  const width = shareCanvas.width;
  const height = shareCanvas.height;

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f5d0fe");
  gradient.addColorStop(0.5, "#ddd6fe");
  gradient.addColorStop(1, "#bfdbfe");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.strokeStyle = "rgba(255,255,255,0.95)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(80, 80, 920, 920, 34);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#7c3aed";
  ctx.font = "bold 40px 'Segoe UI'";
  ctx.fillText("NEX-ti for NEX2Y", 130, 170);

  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 56px 'Segoe UI'";
  ctx.fillText(role.name, 130, 250);

  ctx.fillStyle = "#374151";
  ctx.font = "30px 'Segoe UI'";
  ctx.fillText(role.summary, 130, 315);

  ctx.fillStyle = "#4b5563";
  ctx.font = "28px 'Segoe UI'";
  dimensions.forEach((dim, idx) => {
    const value = scores[dim.key];
    const polarity = value >= 0 ? dim.pos : dim.neg;
    ctx.fillText(`${dim.label}: ${polarity} (${value >= 0 ? "+" : ""}${value})`, 130, 420 + idx * 62);
  });

  ctx.fillStyle = "#6d28d9";
  ctx.font = "26px 'Segoe UI'";
  ctx.fillText("快来测测你是哪位角色同款气质", 130, 760);

  ctx.fillStyle = "#7c3aed";
  ctx.font = "bold 24px 'Segoe UI'";
  ctx.fillText("Generated by Idol Match Test", 130, 850);

  const dataUrl = shareCanvas.toDataURL("image/png");
  downloadLink.href = dataUrl;
  downloadLink.classList.remove("hidden");
}

function showResult() {
  const roleKey = getClosestRoleKey();
  const role = roleProfiles[roleKey];
  latestRoleKey = roleKey;

  mbtiType.textContent = role.name;
  mbtiDescription.textContent = `${role.summary} ${role.detail}`;
  dimensionBreakdown.innerHTML = dimensions.map(formatDimensionText).join("<br>");
  drawRadarChart(role.name);
  downloadLink.classList.add("hidden");

  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");
}

function resetQuiz() {
  currentIndex = 0;
  scores = { S: 0, D: 0, P: 0, C: 0 };
  answerHistory = [];
  latestRoleKey = null;
  downloadLink.classList.add("hidden");
  quizArea.classList.remove("hidden");
  resultArea.classList.add("hidden");
  renderQuestion();
}

optionA.addEventListener("click", () => answerQuestion(0));
optionB.addEventListener("click", () => answerQuestion(1));
prevBtn.addEventListener("click", goToPreviousQuestion);
restartBtn.addEventListener("click", resetQuiz);
shareBtn.addEventListener("click", () => {
  if (!latestRoleKey) return;
  buildShareImage(roleProfiles[latestRoleKey]);
});

renderQuestion();
