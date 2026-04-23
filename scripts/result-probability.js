const path = require("path");

const { getQuizQuestions } = require(path.join(__dirname, "..", "pages", "quiz", "data"));
const { calculateResult } = require(path.join(__dirname, "..", "pages", "quiz", "utils"));
const { resultProfiles } = require(path.join(__dirname, "..", "pages", "quiz", "result-data"));

function getArgNumber(index, fallback) {
  const value = Number(process.argv[index]);
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }
  return Math.floor(value);
}

function runSimulation(trials, randomCount) {
  const counts = {};

  for (let i = 0; i < trials; i += 1) {
    const questions = getQuizQuestions(randomCount);
    const answers = questions.map((question) => {
      const optionCount = Array.isArray(question.options) ? question.options.length : 0;
      if (optionCount <= 0) {
        return 0;
      }
      return Math.floor(Math.random() * optionCount);
    });

    const { resultKey } = calculateResult(answers, questions);
    const normalizedKey = resultKey || "UNDEFINED";
    counts[normalizedKey] = (counts[normalizedKey] || 0) + 1;
  }

  return counts;
}

function printReport(counts, trials) {
  const keys = Array.from(new Set([...Object.keys(resultProfiles), ...Object.keys(counts)]));
  const rows = keys.map((key) => {
    const count = counts[key] || 0;
    const probability = (count / trials) * 100;
    const profile = resultProfiles[key];

    return {
      key,
      name: profile ? profile.name : "(unknown)",
      count,
      probability
    };
  });

  rows.sort((a, b) => b.probability - a.probability);

  console.log(`Trials: ${trials}`);
  console.log("Result Probability Distribution");
  console.log("---------------------------------------------");
  rows.forEach((row) => {
    const keyText = row.key.padEnd(8, " ");
    const countText = String(row.count).padStart(7, " ");
    const probText = `${row.probability.toFixed(2)}%`.padStart(8, " ");
    console.log(`${keyText} | ${countText} | ${probText} | ${row.name}`);
  });
}

function main() {
  const trials = getArgNumber(2, 100000);
  const randomCount = getArgNumber(3, 4);
  const counts = runSimulation(trials, randomCount);
  printReport(counts, trials);
}

main();