const strategyDescriptions = {
  alwaysFairStrategy: "Gracz zawsze współpracuje.",
  alwaysDefectStrategy: "Gracz zawsze zdradza.",
  fair70Strategy: "Gracz współpracuje w 70% przypadków.",
  defect70Strategy: "Gracz zdradza w 70% przypadków.",
  randomStrategy: "Gracz losowo wybiera współpracę lub zdradę.",
  titForTatStrategy: "Gracz zaczyna od współpracy, a potem naśladuje poprzedni ruch przeciwnika.",
  cooperateAfterFirstDefectStrategy: "Współpracuje zawsze, chyba że przeciwnik pierwszy raz zdradzi, wtedy zawsze zdradza.",
  alternateStrategy: "Naprzemiennie współpracuje i zdradza.",
  generousTitForTatStrategy: "Współpracuje, ale czasami wybacza zdradę.",
};

function updateStrategyDescription(player, strategy) {
  const descriptionElement = document.getElementById(`strategy${player}Description`);
  descriptionElement.textContent = strategyDescriptions[strategy];
}

function alwaysFairStrategy() {
  return "cooperate";
}

function alwaysDefectStrategy() {
  return "defect";
}

function fair70Strategy() {
  return Math.random() < 0.7 ? "cooperate" : "defect";
}

function defect70Strategy() {
  return Math.random() < 0.3 ? "cooperate" : "defect";
}

function randomStrategy() {
  return Math.random() < 0.5 ? "cooperate" : "defect";
}

function titForTatStrategy(previousMove) {
  return previousMove === undefined ? "cooperate" : previousMove;
}

function cooperateAfterFirstDefectStrategy(state) {
  if (state.defected) {
    return "defect";
  } else if (state.previousMove === "defect") {
    state.defected = true;
    return "defect";
  }
  return "cooperate";
}

function alternateStrategy(state) {
  return state.round % 2 === 0 ? "cooperate" : "defect";
}

function generousTitForTatStrategy(previousMove) {
  if (previousMove === "defect" && Math.random() < 0.3) {
    return "cooperate";
  }
  return previousMove || "cooperate";
}

function getPlayerMove(strategy, state) {
  if (strategy === "titForTatStrategy") {
    return titForTatStrategy(state.previousMove);
  }
  if (strategy === "cooperateAfterFirstDefectStrategy") {
    return cooperateAfterFirstDefectStrategy(state);
  }
  if (strategy === "alternateStrategy") {
    return alternateStrategy(state);
  }
  if (strategy === "generousTitForTatStrategy") {
    return generousTitForTatStrategy(state.previousMove);
  }
  if (strategy === "grimTriggerStrategy") {
    return grimTriggerStrategy(state);
  }
  return eval(strategy)();
}

document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("startButton");
  const player1StrategySelect = document.getElementById("strategy1");
  const player2StrategySelect = document.getElementById("strategy2");
  const resultsParagraph = document.getElementById("results");
  const resultsChartCanvas = document.getElementById("resultsChart");
  const betrayalFrequencyChartCanvas = document.getElementById("betrayalFrequencyChart");

  let barChart;
  let lineChart;

  player1StrategySelect.addEventListener("change", () => {
    updateStrategyDescription(1, player1StrategySelect.value);
  });

  player2StrategySelect.addEventListener("change", () => {
    updateStrategyDescription(2, player2StrategySelect.value);
  });

  startButton.addEventListener("click", () => {
    const player1Strategy = player1StrategySelect.value;
    const player2Strategy = player2StrategySelect.value;

    let player1PrisonTime = 0;
    let player2PrisonTime = 0;
    let player1BetrayalCount = 0;
    let player2BetrayalCount = 0;

    const state1 = { previousMove: undefined, defected: false, round: 0 };
    const state2 = { previousMove: undefined, defected: false, round: 0 };

    const betrayalFrequencyData1 = [];
    const betrayalFrequencyData2 = [];

    for (let i = 0; i < 1000; i++) {
      state1.round = i;
      state2.round = i;
      const player1Move = getPlayerMove(player1Strategy, state1);
      const player2Move = getPlayerMove(player2Strategy, state2);

      if (player1Move === "cooperate") {
        if (player2Move === "cooperate") {
          // Obaj współpracują - nikt nie idzie do więzienia
        } else {
          // Gracz 1 współpracuje, gracz 2 zdradza
          player1PrisonTime += 10;
          player2BetrayalCount++;
        }
      } else {
        player1BetrayalCount++;
        if (player2Move === "cooperate") {
          // Gracz 1 zdradza, gracz 2 współpracuje
          player2PrisonTime += 10;
        } else {
          // Obaj zdradzają
          player1PrisonTime += 3;
          player2PrisonTime += 3;
          player2BetrayalCount++;
        }
      }

      state1.previousMove = player2Move;
      state2.previousMove = player1Move;

      betrayalFrequencyData1.push(player1BetrayalCount);
      betrayalFrequencyData2.push(player2BetrayalCount);
    }

    resultsParagraph.innerText = `Gracz 1 spędzi w więzieniu: ${player1PrisonTime} lat, Gracz 2 spędzi w więzieniu: ${player2PrisonTime} lat`;

    if (barChart) {
      barChart.data.datasets[0].data = [player1PrisonTime, player2PrisonTime];
      barChart.update();
    } else {
      const ctx = resultsChartCanvas.getContext("2d");
      barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Gracz 1", "Gracz 2"],
          datasets: [{
            label: "Czas w więzieniu (lata)",
            data: [player1PrisonTime, player2PrisonTime],
            backgroundColor: ["#4BC0C040", "#9966FF40"],
            borderColor: ["#4BC0C0", "#9966FF"],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
        }
      });
    }

    if (lineChart) {
      lineChart.data.datasets[0].data = betrayalFrequencyData1;
      lineChart.data.datasets[1].data = betrayalFrequencyData2;
      lineChart.update();
    } else {
      const ctx = betrayalFrequencyChartCanvas.getContext("2d");
      lineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 1000 }, (_, i) => i + 1),
          datasets: [
            {
              label: "Częstotliwość zdrady Gracza 1",
              data: betrayalFrequencyData1,
              borderColor: "#4BC0C0",
              backgroundColor: "#4BC0C040",
            },
            {
              label: "Częstotliwość zdrady Gracza 2",
              data: betrayalFrequencyData2,
              borderColor: "#9966FF",
              backgroundColor: "#9966FF40",
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
        }
      });
    }
  });
});
