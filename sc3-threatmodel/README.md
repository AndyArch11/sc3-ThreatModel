# Threat Model - Single Page Application

This project provides a Threat Model form in a simple Single Page Application (SPA) built using React. 

## Features

- A Threat Model that captures STRIDE threats and DREAD prioritisation
- Exports results to an Excel spreadsheet for ongoing development

## Project Structure

```
sc3-threatmodel
├── dist
│   ├── assets
│   │   ├── index-xxxx.css             # Compiled CSS styles
│   │   ├── index-xxxx.js              # Main application bundle
│   │   ├── vendor-xxxx.js             # Core vendor libraries bundle
│   │   ├── ExcelExport-xxxx.js        # Lazy-loaded Excel export bundle
│   │   └── rolldown-runtime-xxxx.js   # Module runtime helper
│   └── index.html                     # Compiled root HTML file
│ 
├── node-modules           # supporting JavaScript libraries
│ 
├── public
│   └── robots.txt         # Web crawler directives
├── src
│   ├── index.jsx          # Entry point for the React application, mounts App
│   ├── index.css          # CSS styles for the React application
│   ├── App.jsx             # Main App component, imports TMForm
│   ├── App.css            # CSS styles for the application
│   ├── App.test.jsx            # App-level rendering tests
│   ├── setupTests.js           # Vitest and Testing Library test configuration
│   └── components
│       └── TM.css              # Stylesheets
│       └── TMForm.jsx          # Threat Model SPA form
│       └── TMInputForm.jsx     # Captures threat details
│       └── TMIntro.jsx         # Guidance on performing threat modelling
│       └── TMReport.jsx        # Threat Model report
│       └── TMTable.jsx         # Threat Model list of threats
│       └── ExcelExport.js      # ExcelJS workbook generator, lazy-loaded on export
|
├── index.html                  # Vite root entry HTML template
├── vite.config.mjs             # Vite and Vitest configuration
├── eslint.config.mjs           # ESLint flat configuration
├── .stylelintrc.json           # Stylelint configuration
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

### Clone the repository:
 
### `git clone https://github.com/AndyArch11/sc3-ThreatModel.git`

change to the project directory
### `cd sc3-threatmodel`

### Install dependencies

In the project folder

### `npm install`
### `npm install react-router-dom`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the Vitest test runner.

### `npm run test:watch`

Runs Vitest in interactive watch mode for active development.

### `npm run lint`

Performs a lint parse across the project.

### `npm run lint:css`

Performs a lint parse across the project's CSS files.

### `npm run build`

Builds the app for production to the `dist` folder using Vite.\
It correctly bundles React in production mode and optimises the build for the best performance.
The build process bundles the deployment package into separate chunks for faster downloads. The Excel bundle is lazy loaded at the time of requesting an Excel extract.

When making updates to the code, ensure that you update the `Version` number in `TMForm.jsx`.

The build is minified and the filenames include hashes for cache busting.\
Your app is ready to be deployed!

If launching as an embedded SPA, configure the following entry points in the host HTML page:

``` html
<!-- 1. Include CSS -->
<link rel="stylesheet" href="./assets/index-xxxx.css">

<!-- 2. Target container -->
<div id="root"></div>

<!-- 3. Entrypoint script (loads all other modules automatically) -->
<script type="module" src="./assets/index-xxxx.js"></script>
```

Or embedded as an `<iframe>` for CSS/JS isolation

``` html
<iframe 
  src="/path-to-app/index.html" 
  width="100%" 
  height="900px" 
  style="border: none;">
</iframe>
```

N.B. Current vite build generates a new hash with each build

``` pwsh
npm run build   

> sc3-threatmodel@0.1.0 build
> vite build

vite v8.3.0 building client environment for production...
✓ 33 modules transformed.
computing gzip size...
dist/index.html                             0.77 kB │ gzip:   0.40 kB
dist/assets/index-C2PTjvuO.css             15.71 kB │ gzip:   3.60 kB
dist/assets/rolldown-runtime-W7wSyTde.js    0.97 kB │ gzip:   0.56 kB
dist/assets/index-DwCrICfx.js             167.34 kB │ gzip:  35.19 kB
dist/assets/vendor-ngGLjx8h.js            218.84 kB │ gzip:  68.26 kB
dist/assets/ExcelExport-C_vHzQBG.js       937.24 kB │ gzip: 259.44 kB
```

To not have the file names being regenerated with each build, update `vite.config.mjs` with:

``` js
build: {
  chunkSizeWarningLimit: 1200,
  rollupOptions: {
    output: {
      entryFileNames: 'assets/sc3-app.js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: 'assets/[name].[ext]',
    },
  },
}
```