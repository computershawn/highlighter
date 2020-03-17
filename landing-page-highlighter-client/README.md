# Landing Page Highlighter Client

The Landing Page Highlighter is utility app for use with the [CCSDK Landing Page](https://github.com/civicresourcegroup/landingPage). This app takes a collection of static InVision screens (JPEG images) and loads them into the browser. The user selects a screen, and then draws rectangular outlines around content that they wish to highlight. They can then copy the rectangles' x/y coordinates, width, and height to their clipboard. This outline data ultmately gets pasted into JSON project files that drive the Script Editor UI inside the CCSDK Landing Page.

## Develop and Test
If using Visual Studio Code, you can use the Live Server extension to view the site in a browser. You can also use python `python -m SimpleHTTPServer 8000` or `php -S localhost:8000` at the command-line to view the site in a browser.

Note that the 'data' folder contains several javascript files, each with an array of information about different CCSDK projects. Currently we use a manual process to scrape data from the InVision prototype using a short script in Chrome Inspector console. We may be able to automate the process or make it part of Rod's Script Editor bookmarklet. For now, it's a manual process that takes a minute or so to complete. See the comments in invision-info-scraper.js for instructions on how to use it.

Note also that, for now, the InVision project screens displayed highlighter app are hard-coded on line 12 of script.js: `let currentDataset = tdmsData;`. We should allow the user to select (possibly from a select drop-down) which data file they want to work with. Until then, we can load a different project data file by setting `currentDataset` to `brightlineData`, `lakeNonaData` or `miscData`. These correspond to the data files loaded as scripts in lines 42 – 45 of index.html.

## Using the Widget
The widget should display a JPEG image of an InVision project screen in the browser. This image is used as reference.
1. Double-click inside the image to create a rectangular outline around the content you intend to highlight.
2. Drag the corners and edges of the highlight to your liking.
3. To assign a name to the highlight (optional), you can click the pink circle in its center. You can name the highlight using the input field that appears in the upper-left of the screen.
4. You can create as many highlights as you want. To navigate to a different screen and create outlines, use the Previous or Next buttons or the screen selection drop-down in the Screen Selection dialog.
5. When you're finished creating highlights, click the 'copy' button in the Screen Selection dialog to copy highlights data to your clipboard.

## Deploy
Upload the files in this folder to a folder on the web. This widget works fine without using the 'save' functionality. That being said, the save process creates a JSON file on the back end. So it could be useful in a future version of the highlighter widget, where we may want to retrieve and edit a previously-created set of highlights. To use the 'save' feature, you will need to change `http://localhost:8080` inside serverActions.js to point to the location of your back-end app (see landing-page-highlighter-server).