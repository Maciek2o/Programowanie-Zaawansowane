const { 
    alwaysFairStrategy, 
    alwaysDefectStrategy, 
    fair70Strategy, 
    defect70Strategy, 
    randomStrategy, 
    titForTatStrategy, 
    cooperateAfterFirstDefectStrategy, 
    alternateStrategy, 
    generousTitForTatStrategy 
  } = require('../scripts.js');
  
  describe('Strategies', () => {
    test('alwaysFairStrategy always returns cooperate', () => {
      expect(alwaysFairStrategy()).toBe('cooperate');
    });
  
    test('alwaysDefectStrategy always returns defect', () => {
      expect(alwaysDefectStrategy()).toBe('defect');
    });
  
    test('fair70Strategy returns cooperate ~70% of the time', () => {
      let cooperateCount = 0;
      for (let i = 0; i < 1000; i++) {
        if (fair70Strategy() === 'cooperate') cooperateCount++;
      }
      expect(cooperateCount).toBeGreaterThan(650);
      expect(cooperateCount).toBeLessThan(750);
    });
  
    test('defect70Strategy returns defect ~70% of the time', () => {
      let defectCount = 0;
      for (let i = 0; i < 1000; i++) {
        if (defect70Strategy() === 'defect') defectCount++;
      }
      expect(defectCount).toBeGreaterThan(650);
      expect(defectCount).toBeLessThan(750);
    });
  
    test('randomStrategy returns cooperate or defect roughly 50% of the time', () => {
      let cooperateCount = 0;
      for (let i = 0; i < 1000; i++) {
        if (randomStrategy() === 'cooperate') cooperateCount++;
      }
      expect(cooperateCount).toBeGreaterThan(400);
      expect(cooperateCount).toBeLessThan(600);
    });
  
    test('titForTatStrategy cooperates initially', () => {
      expect(titForTatStrategy()).toBe('cooperate');
    });
  
    test('cooperateAfterFirstDefectStrategy cooperates initially and then defects after first defect', () => {
      const state = { defected: false, previousMove: undefined };
      expect(cooperateAfterFirstDefectStrategy(state)).toBe('cooperate');
      state.previousMove = 'defect';
      expect(cooperateAfterFirstDefectStrategy(state)).toBe('defect');
    });
  
    test('alternateStrategy alternates between cooperate and defect', () => {
      const state = { round: 0 };
      expect(alternateStrategy(state)).toBe('cooperate');
      state.round++;
      expect(alternateStrategy(state)).toBe('defect');
    });
  
    test('generousTitForTatStrategy cooperates initially and sometimes forgives', () => {
      expect(generousTitForTatStrategy()).toBe('cooperate');
    });
  });