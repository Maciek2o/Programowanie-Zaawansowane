# DYLEMAT WIĘŹNIA
Maciej Wesołowski 157115, Piotr Wiśniewski 155784

## 1. Struktura programu
- index.html: Plik zawiera strukturę strony internetowej, gdzie użytkownik może wybrać strategie dla dwóch graczy, uruchomić symulację i zobaczyć wyniki.
- styles.css: Plik zawiera style dla strony internetowej.
- scripts.js: Plik zawiera logikę symulacji oraz obsługę interfejsu użytkownika.
- test: Folder zawiera testy jednostkowe, integracyjne i akceptacyjne.

---

## 2. Scenariusze testów

### 2.1 Testy jednostkowe
- Testowanie funkcji strategii, np. alwaysFairStrategy, alwaysDefectStrategy, fair70Strategy, defect70Strategy, randomStrategy, titForTatStrategy, cooperateAfterFirstDefectStrategy, alternateStrategy, generousTitForTatStrategy.

### 2.2 Testy integracyjne
- Sprawdzenie czy wybór strategii w dropdownie aktualizuje opis strategii.
- Upewnienie się, że po kliknięciu przycisku "Rozpocznij grę" generowane są poprawne wyniki i wykresy.
- Testowanie integracji logiki gry z wyświetlaniem wyników na stronie.

### 2.3 Testy akceptacyjne
- Wybór strategii dla obu graczy i rozpoczęcie gry.
- Sprawdzenie poprawności wyświetlania wyników (czas w więzieniu dla obu graczy).
- Weryfikacja poprawności wykresu częstotliwości zdrad.
---

## 3. Wykorzystane narzędzia i biblioteki

1. Biblioteka Jest
2. Narzędzie Puppeteer
3. jsdom
4. Chart.js

---

## 4. Problemy i ich rozwiązania

1. **Problemy z wyborem strategii:**
   - **Rozwiązanie**: Upewnienie się, że wybór strategii przez interfejs użytkownika jest poprawnie zaimplementowany i aktualizuje stan gry.

2. **Problemy z asynchronicznym ładowaniem zawartości:**
   - **Rozwiązanie**: Używanie waitForFunction w Puppeteer do oczekiwania na aktualizacje interfejsu po interakcjach użytkownika.
     
3. **Problemy z wydajnością wykresów:**
   - **Rozwiązanie**: Monitorowanie wydajności generowania wykresów przy dużych ilościach danych (np. 1000 rund gry).
### Podsumowanie

W powyższej dokumentacji przedstawiono strukturę programu, scenariusze testów oraz wykorzystane narzędzia i biblioteki. Dzięki testom jednostkowym, integracyjnym i akceptacyjnym możemy sprawdzić poprawność działania programu.
