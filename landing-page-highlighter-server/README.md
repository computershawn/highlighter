# Landing Page Highlighter Server

This is a very simple Node/Express app that formats incoming data as JSON and saves it to a file. Files created this way could be made accessible to the Landing Page Highlighter client app.

## Setup
1. Install the node dependencies `npm install`
2. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploy

When you're ready to deploy, add a new Heroku application using `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.