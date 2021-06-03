# densho-sites-of-shame

A storytelling map for [Densho](https://densho.org/).

## What's included

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In addition, we've added:

 * Linting with `prettier`
 * `react-router`
 * `yarn` for package management


## Developing


Install:

```
yarn install
```

Development server:

```
yarn start
```

Staging build:

```
yarn staging
```

Production build:

```
yarn build:production
```

## Deployment

Run the steps above to install and build:

```bash
yarn install
yarn build:production
```

There are some environment variables that will have to be set in order for the production build to work. `cp .env.production.example .env.production` and edit the variables in `.env.production`:
 * `REACT_APP_DATA_PATH`: The production data path
 * `REACT_APP_MAPBOX_ACCESS_TOKEN`: The Mapbox access token
 * `REACT_APP_MAPBOX_BASE_LAYER`: The Mapbox style URL
