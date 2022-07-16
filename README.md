# KISS - Keep it a Simple Site

## What is KISS?

KISS is a tool that aims to help people who are not experient with programming maintain a website with tools they know. The resulting website is built in Vue and can be maintained through a Google Sheets spreadsheet.

## How to create a KISS website?

First, we should create a Google Sheets spreadsheet for the configuration and get its share link.
This spreadsheet should follow [this template](https://docs.google.com/spreadsheets/d/1k4cYSBwhI9DRZbonvT_LVoMLZsNFCwkqcj1KfXnC-yY/edit#gid=0).

Then, we need to create a spreadsheet for the website data. This one should also follow a template, such as [this one](https://docs.google.com/spreadsheets/d/17HhEY0a6bn1yBY2jvbs6mU5NEAZenc--vXF4i8nbhv0/edit#gid=118762471).

We will also need an API key, so if you don't have one, folllow [this guide from Google](https://developers.google.com/workspace/guides/get-started).

We can now clone the project. Then, we need to navigate to `kiss/src/lib/settings.js` and place the spreadsheet IDs and API key there, as such:

```js
const settings = {
  spreadsheetID: 'DATA_SPREADSHEET_ID_HERE',
  configID: 'CONFIG_SPREADSHEET_ID_HERE',
  apiKey: 'API_KEY_HERE'
}

export default settings

```

With these configured, we just need to navigate into kiss/ and run 

```bash
npm install
npm run serve
```

to see our website.
