# 8-Bit Heroes | Videogame Store

E-commerce di videogiochi fisici e digitali, sviluppato come progetto finale di gruppo del master in Web Development di [Boolean](https://boolean.careers).

**🔗 Demo live: [8bitheroes.netlify.app](https://8bitheroes.netlify.app)**

> Il backend è ospitato su un piano gratuito che va in pausa dopo un periodo di inattività, il primo caricamento può richiedere fino a un minuto.

## Funzionalità

- **Homepage** con le sezioni dei giochi in offerta e dei più venduti
- **Catalogo** con ricerca per nome e ordinamento per prezzo, nome e data
- **Dettaglio prodotto** con prezzo scontato, trailer, requisiti minimi e prodotti correlati
- **Carrello** con modifica delle quantità e riepilogo del totale
- **Wishlist** dei giochi preferiti
- **Checkout** con dati di spedizione e fatturazione
- **Pop-up di benvenuto** alla prima visita, con iscrizione alla newsletter

## Stack

| Frontend | Backend | Database | Deploy |
|---|---|---|---|
| React, Vite, React Router, Axios, Bootstrap, Context API | Node.js, Express, Nodemailer | MySQL | Netlify, Render, Aiven |

Il codice del backend è in un repository separato: [8_bit_heroes_backend](https://github.com/mattia-galasso/8_bit_heroes_backend).

## Il team

Progetto sviluppato in cinque con divisione per milestone:

| Sezione | Sviluppatore |
|---|---|
| Homepage | **Mattia Galasso** |
| Pagina di ricerca | [Edoardo Nicora](https://github.com/nicoraedoardo) |
| Dettaglio prodotto | [Leonardo Monti](https://github.com/leonardo-monti) |
| Carrello | [Michele Ferri](https://github.com/micheleferri01) |
| Checkout | [Manuel Aliquò](https://github.com/ManuelAliquo) |

Il lavoro è stato gestito su Git con branch separati per funzionalità e revisione reciproca del codice.

## Note sulla demo

L'invio della mail di benvenuto della newsletter funziona in locale ma è disattivato nella demo online, l'hosting gratuito del backend blocca il traffico SMTP in uscita.