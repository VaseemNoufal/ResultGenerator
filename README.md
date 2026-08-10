# Result Poster Maker

A frontend-only HTML/CSS/JavaScript result-poster generator.

## Features

- Login screen
- Hardcoded demo credentials in `js/auth.js`
- LocalStorage login session
- Dashboard with 5 poster models
- Model 01 is active and uses the supplied poster artwork
- Models 02–05 are placeholders for future designs
- Live poster editor
- Program name + 1st/2nd/3rd prize inputs
- PNG export
- Responsive layout

## Demo login

Username: `admin`
Password: `mubashirfaizal`

## Run

Open `index.html` in a browser. For best results, use a small local server such as VS Code Live Server.

## Important security note

This login is intentionally frontend-only. The password is visible in the JavaScript source and therefore is NOT suitable for protecting private data. If this becomes a real production application, replace it with proper server-side authentication.

## Adding future poster models

1. Add the new artwork to `assets/`.
2. Add a model card in `dashboard.html`.
3. Create a new editor page or make the editor load model configurations dynamically.
4. Add the relevant text positions in the editor JavaScript.
