# Growly 

> Aplikacja webowa do śledzenia nawyków, nauki i rozwoju osobistego z elementami wizualizacji danych i fiszek.

---

## Cel aplikacji

Growly powstało, aby pomóc użytkownikom w:
- Systematycznym rozwijaniu nawyków,
- Organizowaniu ścieżek nauki,
- Tworzeniu i powtarzaniu fiszek,
- Śledzeniu postępów za pomocą wykresów i statystyk.

Aplikacja łączy w sobie produktywność, rozwój osobisty i naukę w jednym interaktywnym narzędziu.

---

## Podstawowe funkcjonalności

1. **Dashboard**
   - Podsumowanie codziennych i tygodniowych aktywności,
   - Wykresy aktywności i postępów w nauce,
   - Motywacyjne cytaty dnia.

2. **Nawyki**
   - Tworzenie i edycja własnych nawyków,
   - Śledzenie postępów za pomocą procentów, kalendarza i wykresów liniowych,
   - Check-in codzienny dla wykonanych nawyków.

3. **Nauka**
   - Tworzenie ścieżek nauki (tematów, lekcji),
   - Zakładka fiszek dla powtarzania materiału,
   - Tryb nauki fiszek („znam / nie znam”) i statystyki postępów.

4. **Statystyki**
   - Analiza aktywności użytkownika w czasie,
   - Heatmapa, wykresy liniowe, porównania ścieżek nauki,
   - Wnioski i podsumowania osiągnięć.

5. **Ustawienia**
   - Zarządzanie profilem użytkownika,
   - Preferencje i eksport/import danych,
   - Powiadomienia i informacje o wersji.

---

## Technologie

- **Frontend:** React + TypeScript + CSS Modules  
- **Backend:** Express.js (lokalny / JSON)  
- **Wykresy:** Chart.js / Recharts  
- **Stylizacja:** Ciemny motyw, minimalistyczny interfejs  
- **Font:** Inter (czytelny, nowoczesny)

---

## Użytkownicy / Role

- **Użytkownik końcowy:** osoba śledząca swoje nawyki i naukę, tworząca ścieżki i fiszki.  

---

## Instalacja i uruchomienie

```bash
# Klonowanie repo
git clone https://github.com/KamilKonopski/growly.git <nazwa_folderu>
cd <nazwa_folderu>

# Instalacja zależności
npm install

# Uruchomienie aplikacji w trybie developerskim
npm start

# Backend lokalny (Express JSON server)
npm run server
