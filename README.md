# supcommunity-api
![version](https://img.shields.io/npm/v/supcommunity-api "Version")
![npm](https://img.shields.io/npm/dt/supcommunity.svg "Total Downloads")

A lightweight module allowing you to scrape the [https://www.supremecommunity.com](Supcommunity) website with NodeJS. 

------

## Installation
```
npm install supcommunity-api
```
Or with yarn,
```
yarn add supcommunity-api
```

------

## Usage
Supcommunity-api is an es6 based library, so if you use the es5 `require` to import the module, you will need to use `.default`.
```js
const SupcommunityScraper = require('supcommunity-api').default;
//Continue usage as normal
```

```js
import SupcommunityScraper from 'supcommunity-api';

(async () => {
    const SupcommunityController = new SupcommunityScraper({
        proxy: 'your-proxy'
    })
})();