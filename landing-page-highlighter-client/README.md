# Landing Page Highlighter Client

The Landing Page Highlighter is utility app for use with the [CCSDK Landing Page](https://github.com/civicresourcegroup/landingPage). This app takes a collection of static InVision screens (JPEG images) and loads them into the browser. The user selects a screen, and then draws rectangular outlines around content that they wish to highlight. They can then copy the rectangles' x/y coordinates, width, and height to their clipboard. This outline data ultmately gets pasted into JSON project files that drive the CCSDK Landing Page.

## Develop and Test
If using Visual Studio Code, you can use the Live Server extension to view the site in a browser. You can also use python `python -m SimpleHTTPServer 8000` or `php -S localhost:8000` at the command-line to view the site in a browser.

## Deploy
Upload the files in this folder to a folder on the web. To use the 'save' functionality, you will need to change `http://localhost:8080` inside serverActions.js to point to the location of your back-end app (see landing-page-highlighter-server)..