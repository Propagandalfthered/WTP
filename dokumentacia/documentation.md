# GPU Comparison Platform - Podrobná Dokumentácia

## Obsah
1. [Úvod a Prehľad Projektu](#1-úvod-a-prehľad-projektu)
2. [Architektúra Systému](#2-architektúra-systému)
3. [Frontend](#3-frontend)
4. [Backend](#4-backend)
5. [Databázový Dizajn](#5-databázový-dizajn)
6. [Bezpečnostné Opatrenia](#6-bezpečnostné-opatrenia)
7. [Používateľské Rozhranie](#7-používateľské-rozhranie)
8. [Testovanie](#8-testovanie)
9. [Nasadenie a Údržba](#9-nasadenie-a-údržba)
10. [GDPR a Ochrana Údajov](#10-gdpr-a-ochrana-údajov)
11. [Optimalizácia a Výkon](#11-optimalizácia-a-výkon)
12. [Známe Problémy a Riešenia](#12-známe-problémy-a-riešenia)

## 1. Úvod a Prehľad Projektu

### 1.1 O Projekte
GPU Comparison Platform je moderná webová aplikácia umožňujúca používateľom porovnávať grafické karty a spravovať používateľské údaje. Projekt bol vyvinutý ako súčasť zadania pre Webové technológie 2024.

### 1.2 Hlavné Funkcie
- Porovnávanie GPU parametrov a výkonu
- Registrácia a správa používateľov
- Responzívny dizajn pre všetky zariadenia
- Prepínanie svetlej/tmavej témy
- Pokročilé filtrovanie a zoraďovanie údajov
- Interaktívne grafy a vizualizácie

### 1.3 Cieľové Skupiny
- Bežní používatelia hľadajúci informácie o GPU
- Administrátori spravujúci používateľské údaje
- Vývojári rozširujúci funkcionalitu platformy

## 2. Architektúra Systému

### 2.1 Prehľad Architektúry
Aplikácia využíva modernú oddelenú architektúru s React frontendom a PHP backendom, komunikujúcich cez REST API.

### 2.2 Systémové Požiadavky
- Webový server s PHP 7.4+
- MySQL databáza
- Node.js 16+ pre vývoj
- Moderný webový prehliadač

### 2.3 Komunikačné Toky
Detailný popis ako jednotlivé komponenty systému komunikujú medzi sebou.

## 3. Frontend

### 3.1 Štruktúra Komponentov

#### 3.1.1 Hlavné Komponenty
- **Navbar**: Navigačný panel s prepínaním témy
- **Home**: Úvodná stránka s prehľadom funkcií
- **Compare**: Porovnávanie GPU
- **Register**: Registračný formulár
- **Manage**: Správa používateľov
- **Changes**: Nastavenia prístupnosti

#### 3.1.2 Pomocné Komponenty
- **ThemeSwitcher**: Prepínanie vzhľadu
- **UserManager**: Tabuľka používateľov
- **GpuComparison**: Porovnávací nástroj
- **FormInputs**: Vstupné komponenty

### 3.2 Správa Stavu
- Využitie React hooks
- Lokálne ukladanie preferencií
- Manažment formulárových dát

### 3.3 Routing a Navigácia
- React Router implementácia
- Ochrana routes
- Správa URL parametrov

### 3.4 Dizajnový Systém
- Tailwind CSS framework
- Responzívny dizajn
- Prispôsobiteľné témy
- Animácie a prechody

## 4. Backend

### 4.1 API Endpointy

#### 4.1.1 Používateľská Správa
- Registrácia nových používateľov
- Získavanie zoznamu používateľov
- Filtrovanie a zoraďovanie
- Mazanie používateľov

#### 4.1.2 Dátové Operácie
- Validácia vstupov
- Spracovanie chýb
- Logovanie operácií

### 4.2 Bezpečnostné Funkcie
- Hashovanie hesiel
- Ochrana proti útokom
- Validácia údajov

### 4.3 Logovanie a Monitoring
- Systém logovania
- Sledovanie chýb
- Výkonnostné metriky

## 5. Databázový Dizajn

### 5.1 Štruktúra Tabuliek
Detailný popis databázových tabuliek a vzťahov.

### 5.2 Indexovanie
Stratégie indexovania pre optimálny výkon.

### 5.3 Zálohovanie
Postupy zálohovania a obnovy dát.

## 6. Bezpečnostné Opatrenia

### 6.1 Autentifikácia
- Bezpečné prihlasovanie
- Správa sessions
- Ochrana hesiel

### 6.2 Autorizácia
- Používateľské role
- Prístupové práva
- Kontrola oprávnení

### 6.3 Ochrana Proti Útokom
- SQL Injection prevencia
- XSS ochrana
- CSRF ochrana
- Rate limiting

## 7. Používateľské Rozhranie

### 7.1 Dizajnové Princípy
- Čistý a moderný dizajn
- Konzistentné používateľské prvky
- Intuitívna navigácia

### 7.2 Responzívny Dizajn
- Mobile-first prístup
- Adaptívne komponenty
- Optimalizované zobrazenie

### 7.3 Prístupnosť
- WCAG 2.1 štandardy
- Klávesové skratky
- Čítačka obrazovky
- Nastaviteľné veľkosti písma

### 7.4 Užívateľská Skúsenosť
- Rýchle načítanie
- Plynulé animácie
- Okamžitá spätná väzba
- Chybové hlásenia

## 8. Testovanie

### 8.1 Frontend Testovanie
- Unit testy komponentov
- Integračné testy
- End-to-end testy
- Testovanie prístupnosti

### 8.2 Backend Testovanie
- API testy
- Záťažové testy
- Bezpečnostné testy
- Testovanie databázy

### 8.3 Výkonnostné Testovanie
- Časy načítania
- Optimalizácia zdrojov
- Databázové dotazy
- Sieťová latencia

### 8.4 Kompatibilita
- Prehliadače
- Zariadenia
- Operačné systémy

## 9. Nasadenie a Údržba

### 9.1 Inštalačný Proces
Detailný postup inštalácie a konfigurácie.

### 9.2 Aktualizácie
- Postup aktualizácie
- Správa verzií
- Migrácie databázy

### 9.3 Monitoring
- Sledovanie výkonu
- Analýza chýb
- Používateľská aktivita

## 10. GDPR a Ochrana Údajov

### 10.1 Zber Údajov
- Účel zberu
- Rozsah údajov
- Doba uchovávania

### 10.2 Práva Používateľov
- Prístup k údajom
- Vymazanie údajov
- Oprava údajov
- Prenos údajov

### 10.3 Bezpečnosť Údajov
- Šifrovanie
- Prístupové práva
- Audit prístupov

## 11. Optimalizácia a Výkon

### 11.1 Frontend Optimalizácia
- Code splitting
- Lazy loading
- Cachovanie
- Kompresia assets

### 11.2 Backend Optimalizácia
- Query optimalizácia
- Cachovanie
- Connection pooling
- Load balancing

### 11.3 Databázová Optimalizácia
- Indexy
- Query plány
- Partitioning
- Replikácia

## 12. Známe Problémy a Riešenia

### 12.1 Známe Obmedzenia
- Výkonnostné limity
- Kompatibilita
- Škálovateľnosť

### 12.2 Riešenie Problémov
- Časté problémy
- Diagnostika
- Kontakty podpory

### 12.3 Plánované Vylepšenia
- Roadmapa
- Budúce funkcie
- Plánované optimalizácie

## Záver

GPU Comparison Platform predstavuje komplexné riešenie pre porovnávanie grafických kariet a správu používateľov. Táto dokumentácia poskytuje ucelený prehľad o všetkých aspektoch systému a slúži ako referenčný materiál pre vývojárov, administrátorov a používateľov platformy.