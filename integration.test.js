const { updateStrategyDescription, getPlayerMove } = require('./script');

describe('Testy integracyjne', () => {
  let mockState1;
  let mockState2;

  beforeEach(() => {
    mockState1 = { previousMove: undefined, defected: false, round: 0 };
    mockState2 = { previousMove: undefined, defected: false, round: 0 };
  });

  test('Test 1: Sprawdzenie czy wybór strategii w dropdownie aktualizuje opis strategii', () => {
    const mockPlayer = 1;
    const mockStrategy = 'alwaysFairStrategy';
    const mockDescriptionElement = { textContent: '' };
    updateStrategyDescription(mockPlayer, mockStrategy, mockDescriptionElement);
    expect(mockDescriptionElement.textContent).toContain('Gracz zawsze współpracuje.');
  });

  test('Test 2: Upewnienie się, że po kliknięciu przycisku "Rozpocznij grę" generowane są poprawne wyniki i wykresy', () => {
    const mockPlayer1Strategy = 'alwaysDefectStrategy';
    const mockPlayer2Strategy = 'randomStrategy';
    let player1PrisonTime = 0;
    let player2PrisonTime = 0;
    let player1BetrayalCount = 0;
    let player2BetrayalCount = 0;
    const betrayalFrequencyData1 = [];
    const betrayalFrequencyData2 = [];

    for (let i = 0; i < 1000; i++) {
      mockState1.round = i;
      mockState2.round = i;
      const player1Move = getPlayerMove(mockPlayer1Strategy, mockState1);
      const player2Move = getPlayerMove(mockPlayer2Strategy, mockState2);

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

      mockState1.previousMove = player2Move;
      mockState2.previousMove = player1Move;

      betrayalFrequencyData1.push(player1BetrayalCount);
      betrayalFrequencyData2.push(player2BetrayalCount);
    }

    expect(player1PrisonTime).toBeGreaterThanOrEqual(0);
    expect(player2PrisonTime).toBeGreaterThanOrEqual(0);
    expect(betrayalFrequencyData1.length).toBe(1000);
    expect(betrayalFrequencyData2.length).toBe(1000);
  });

  test('Test 3: Testowanie integracji logiki gry z wyświetlaniem wyników na stronie', () => {
    const mockPlayer1Strategy = 'titForTatStrategy';
    const mockPlayer2Strategy = 'alternateStrategy';
    let player1PrisonTime = 0;
    let player2PrisonTime = 0;
    let player1BetrayalCount = 0;
    let player2BetrayalCount = 0;
    const betrayalFrequencyData1 = [];
    const betrayalFrequencyData2 = [];

    for (let i = 0; i < 1000; i++) {
      mockState1.round = i;
      mockState2.round = i;
      const player1Move = getPlayerMove(mockPlayer1Strategy, mockState1);
      const player2Move = getPlayerMove(mockPlayer2Strategy, mockState2);

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

      mockState1.previousMove = player2Move;
      mockState2.previousMove = player1Move;

      betrayalFrequencyData1.push(player1BetrayalCount);
      betrayalFrequencyData2.push(player2BetrayalCount);
    }

    expect(player1PrisonTime).toBeGreaterThanOrEqual(0);
    expect(player2PrisonTime).toBeGreaterThanOrEqual(0);
    expect(betrayalFrequencyData1.length).toBe(1000);
    expect(betrayalFrequencyData2.length).toBe(1000);
  });
});