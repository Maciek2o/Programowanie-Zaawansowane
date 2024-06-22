const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('.../index.html'); // Ustaw odpowiednią ścieżkę do swojego lokalnego serwera
});

afterAll(async () => {
  await browser.close();
});

describe('Testy akceptacyjne', () => {
  test('Test 1: Wybór strategii dla obu graczy i rozpoczęcie gry', async () => {
    await page.select('#strategy1', 'alwaysFairStrategy');
    await page.select('#strategy2', 'alwaysDefectStrategy');
    await page.click('#startButton');
    await page.waitForSelector('#results');
    const resultsText = await page.$eval('#results', el => el.textContent);
    expect(resultsText).toContain('Gracz 1 spędzi w więzieniu:');
  });

  test('Test 2: Sprawdzenie poprawności wyświetlania wyników', async () => {
    await page.select('#strategy1', 'fair70Strategy');
    await page.select('#strategy2', 'randomStrategy');
    await page.click('#startButton');
    await page.waitForSelector('#results');
    const resultsText = await page.$eval('#results', el => el.textContent);
    expect(resultsText).toContain('Gracz 2 spędzi w więzieniu:');
  });

  test('Test 3: Weryfikacja poprawności wykresu częstotliwości zdrad', async () => {
    await page.select('#strategy1', 'titForTatStrategy');
    await page.select('#strategy2', 'alternateStrategy');
    await page.click('#startButton');
    await page.waitForSelector('#betrayalFrequencyChart');
    const chartExists = await page.$eval('#betrayalFrequencyChart', el => el !== null);
    expect(chartExists).toBe(true);
  });
});