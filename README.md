# 2D Boxing Game

Gra bokserska 2D dla dwóch graczy - multiplayer lokalny.

## Opis

Prosta gra bokserska w 2D, gdzie dwóch graczy walczy ze sobą na tym samym komputerze. Gra wykorzystuje minimalistyczną grafikę bez cieni, z czterema podstawowymi kolorami.

## Cechy

- 🥊 Lokalna rozgrywka dla 2 graczy
- 🎨 Prosta grafika (czarny, szary, niebieski, biały, żółty)
- ⌨️ Sterowanie poprzez klawiaturę
- 💾 Zapisywanie wyniku w localStorage
- 🏆 System punktacji

## Technologie

- **Next.js 14** - React framework
- **TypeScript** - Typowanie
- **Canvas API** - Rendering 2D
- **localStorage** - Zapis stanu gry

## Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Otwórz w przeglądarce
http://localhost:3000
```

## Sterowanie

### Gracz Niebieski (Lewy)
- **W** - Skok
- **A** - Ruch w lewo
- **S** - (zarezerwowane)
- **D** - Ruch w prawo
- **SPACJA** - Cios

### Gracz Żółty (Prawy)
- **↑** - Skok
- **←** - Ruch w lewo
- **↓** - (zarezerwowane)
- **→** - Ruch w prawo
- **ENTER** - Cios

### Ogólne
- **R** - Reset gry

## Mechanika gry

- Każdy bokser ma 100 HP
- Cios zadaje 10 obrażeń
- Cooldown między ciosami: 30 klatek
- Grawitacja i skoki
- Kolizje ze ścianami i podłogą
- Gra kończy się gdy HP jednego gracza spadnie do 0
- Wynik zapisywany jest automatycznie

## Do dalszego rozwoju

- [ ] Dodać więcej animacji
- [ ] Dźwięki i muzyka
- [ ] Combo system
- [ ] Power-upy
- [ ] Różne areny
- [ ] Tryby gry (turniej, trening)
- [ ] Możliwość zmiany ustawień
- [ ] Backend do globalnego zapisywania wyników
