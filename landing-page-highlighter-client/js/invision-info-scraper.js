// InVision Info Scraper for CCSDK Landing Page. This utility scrapes
// data from screens inside CCSDK InVision prototypes. The data is used
// with the Landing Page Highlighter widget.
// 
// 1.  Visit an InVision prototype like like this one for Lake Nona
//     projects.invisionapp.com/d/main#/projects/prototypes/19178327
// 2.  Navigate to the PUBLIC version of the prototype: Click the
//     'Share' button at the top, scroll to the bottom of the 'Invite
//     people to project' modal, click 'public share link' and paste
//     that link into a new browser window.
// 3.  Open the console in Chrome Inspector
// 4.  Paste the below block of code into the console
// 5.  This should copy the InVision screens data for this project
//     into a javascript array in your clipboard.
// 6.  Create a new js file with a relevant name. For this Lake Nona
//     project, we could call it something like
//     'invision-screens-data-ccsdk-lake-nona.js'
// 7.  At the top of this new file, assign the array to a variable,
//     something like 'nonaData'.
// 8.  Include invisision-screens-data-ccsdk-lake-nona.js in index.html
//     inside the landing-page-highlighter-client. In the 'script.js'
//     file, we can then access the Lake Nona InVision screen data by
//     referring to the nonaData array
function scrapeInVisionInfo() {
    const projectIdInternal = window.config.share.projectID.toString();
    const projectIdShared = window.config.share.key;
    var tempArray = [];
    window.config.screens.forEach(item => {
        screenId = item.id.toString();
        screenTitle = item.name;
        screenImageURL = item.imageUrl;
        tempArray.push({
            projectIdInternal,
            projectIdShared,
            screenId,
            screenTitle,
            screenImageURL
        });
    });
    return tempArray;
}
const infos = scrapeInVisionInfo();
copy(infos);




// OLD VERSION
// This involves a lot of manual running of code in Chrome Inspector.
// The above method is much easier and faster.
// InVision Info Scraper for CCSDK Landing Page
// 
// 1.  Visit an InVision prototype like like this one for Lake Nona
//     projects.invisionapp.com/d/main#/projects/prototypes/19178327
// 2.  Click on the thumbnail for the first screen in the set
// 3.  Enter 'History' mode by clicking the clock icon at the bottom
//     of the InVision UI
// 4.  Open the console in Chrome Inspector
// 5.  Paste the below block of code into the console
// 6.  Repeatedly press the right arrow key on your keyboard. Wait
//     for a second until the console logs a message saying that
//     it got an item
// 7.  The console will log a 'Done' message when it has data for
//     all screens in this prototype
// 8.  In the console, type 'copy(listOfItems)'. This copies all of
//     the data into a JSON object, which you can paste into a new
//     file on your desktop.

// var numItems = document.querySelectorAll('.screen-item').length - 1;
// var listOfItems = [];
// function getNextListItem() {
//     if(listOfItems.length <= numItems) {
//         var image = document.querySelector('.screenImage.projectScreen');
//         var screenImageURL = image.getAttribute('src');
//         var loc = location.toString().split('/');
//         var projIdInternal = loc[loc.length - 3];
//         var screenId = loc[loc.length - 2];
//         var screenTitle = document.querySelector('.list-item.screen a').innerText;
//         var imageInfo = {
//             projIdInternal, screenId, screenTitle, screenImageURL
//         };
//         // Only add to listOfItems if we haven't done so already
//         const index = listOfItems.findIndex(item => item.screenId === screenId);
//         if(index === -1) {
//             listOfItems.push(imageInfo);
//             console.log('Got item', listOfItems.length);
//         }
//         if(listOfItems.length === numItems) console.log('Done');
//     }
// }
// getNextListItem();
// document.addEventListener('keydown', getItemOnKeypress);
// function getItemOnKeypress(e) {
//     if(e.key === 'ArrowRight') {
//         setTimeout(getNextListItem, 1000);
//     }
// }