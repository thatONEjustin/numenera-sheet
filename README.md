# numenera-sheet

A much easier to understand character sheet for people playing the ttrpg Numenera.

Built with astrojs, svelte, and tailwindcss!

Deployed to netlify!

Right now this stores all user input data into an object,
converts that object to JSON, then applies LZString to compress
the data to store in localStorage.

---

## Install

Requirements: node@latest

1. Open powershell (in administrator) or your preferred terminal
2. run `git clone git@github.com:thatONEjustin/numenera-sheet.git`
3. run `npm install`
4. run `npm run dev`
