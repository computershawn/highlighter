/*
................................
................................
................................
................................
*/

let highlights = [];
let currentHighlight = null;
let isFormOpen = false;
let currentScreenIndex = 0;
let currentDataset = miscData;
let msgShowing = false;


/* Based on 'Make resizable div' by Hung Nguyen */
/* https://codepen.io/ZeroX-DG/pen/vjdoYe */
function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const handles = document.querySelectorAll(div + ' .handle')
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < handles.length; i++) {
        const currentHandle = handles[i];
        currentHandle.addEventListener('mousedown', function (e) {
            e.preventDefault();
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        })

        function resize(e) {
            if (currentHandle.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            }
            else if (currentHandle.classList.contains('bottom-side')) {
                const height = original_height + (e.pageY - original_mouse_y)
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            }
            else if (currentHandle.classList.contains('right-side')) {
                const width = original_width + (e.pageX - original_mouse_x);
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
            }
            else if (currentHandle.classList.contains('top-left')) {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + window.scrollX + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = original_y + (e.pageY - original_mouse_y) + window.scrollY + 'px'
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize);
            // element.style.backgroundColor = 'rgba(255, 0, 0, 0.125)';
            const i = highlights.findIndex(item => item.elementId === element.getAttribute('id'));
            highlights[i].top = parseInt(element.style.top);
            highlights[i].left = parseInt(element.style.left);
            highlights[i].width = parseInt(element.style.width);
            highlights[i].height = parseInt(element.style.height);
        }
    }
}

const createRectangle = event => {
    const defaultWd = 40;
    const defaultHt = 40;
    const nextIndex = (highlights.length === 0) ? 1 : highlights[highlights.length - 1].index + 1;
    const nextId = `highlight-item-${nextIndex}`;
    const recHTML = `<div class="handles">
            <div class="clicky-space"></div>
            <div class="handle top-left"></div>
            <div class="handle bottom-right"></div>
            <div class="handle arrow-down side bottom-side"></div>
            <div class="handle arrow-right side right-side"></div>
        </div>`;
    let newRec = document.createElement('div');
    newRec.setAttribute('id', nextId);
    newRec.dataset.screenId = currentDataset[currentScreenIndex].screenId;
    newRec.classList.add('resizable', 'fadey-fay');
    newRec.style.top = `${event.pageY}px`;
    newRec.style.left = `${event.pageX}px`;
    newRec.style.width = `${defaultWd}px`;
    newRec.style.height = `${defaultHt}px`;
    newRec.innerHTML = recHTML;
    document.querySelector('.wrapper').appendChild(newRec);
    makeResizableDiv(`#${nextId}`);
    document.querySelector(`#${nextId} .clicky-space`).addEventListener('click', () => {
        toggleForm(nextId, isFormOpen);
    });
    const highlightObj = {
        index: nextIndex,
        name: 'none',
        invisionId: currentDataset[currentScreenIndex].projIdShared,
        screenId: currentDataset[currentScreenIndex].screenId,
        screenTitle: currentDataset[currentScreenIndex].screenTitle,
        elementId: nextId,
        top: event.pageY,
        left: event.pageX,
        width: defaultWd,
        height: defaultHt,
    };
    highlights = highlights.concat(highlightObj);
}

function toggleForm(highlightId, formStatus) {
    const form = document.querySelector('#form-wrapper');
    if (!formStatus) {
        // Form is closed
        // isFormOpen = true;
        updateFormStatus(true);
        currentHighlight = highlightId;
        const val = highlights.find(h => h.elementId === currentHighlight).name;
        document.getElementById("highlight-title").value = val;
        // CSS fade-in not working correctly here, need to fix
        form.classList.remove('hide');
        form.classList.add('form-fade-in');
        document.getElementById(highlightId).style.backgroundColor = 'rgba(0, 255, 220, 0.25)';
    } else {
        if (highlightId === null || highlightId === currentHighlight) {
            // Form is open and user either clicked 'submit' or clicked
            // on an already-selected highlight
            form.classList.remove('form-fade-in');
            setTimeout(() => form.classList.add('hide'), 300);
            document.getElementById(currentHighlight).style.backgroundColor = 'rgba(255, 0, 0, 0.125)';
            // isFormOpen = false;
            updateFormStatus(false);
            currentHighlight = null;
        } else {
            // Form already open and we clicked on a different highlight
            document.getElementById(currentHighlight).style.backgroundColor = 'rgba(255, 0, 0, 0.125)';
            document.getElementById(highlightId).style.backgroundColor = 'rgba(0, 255, 220, 0.25)';
            currentHighlight = highlightId;
            const val = highlights.find(h => h.elementId === currentHighlight).name;
            document.getElementById("highlight-title").value = val;
        }
    }
}

// Go to either the next or the previous screen
// depending on which button the user clicked
function advance(forward) {
    if (forward) {
        currentScreenIndex = Math.min(currentScreenIndex + 1, currentDataset.length - 1);
    } else {
        currentScreenIndex = Math.max(0, currentScreenIndex - 1);
    }
    const url = currentDataset[currentScreenIndex].screenImageURL;
    document.querySelector('.wrapper img').setAttribute('src', url);
    // Update the dropdown-select
    document.querySelector("#select-screen").selectedIndex = currentScreenIndex.toString();
    renderCurrentHighlights(currentScreenIndex);
}

function initListeners() {
    // document.querySelector('.wrapper').addEventListener('dblclick', createRectangle);
    document.querySelector('.wrapper').addEventListener('dblclick', createRectangle);

    document.querySelector('.wrapper img').setAttribute('src', currentDataset[currentScreenIndex].screenImageURL);

    document.querySelector('#info-form').addEventListener('submit', evt => {
        evt.preventDefault();
        const val = document.getElementById("highlight-title").value;
        const i = highlights.findIndex(h => h.elementId === currentHighlight);
        highlights[i].name = val;
        toggleForm(null, isFormOpen);
    });

    document.querySelector('#cancel-btn').addEventListener('click', evt => {
        toggleForm(null, isFormOpen);
    });

    document.querySelector('#close-form').addEventListener('click', evt => {
        evt.preventDefault();
        toggleForm(null, isFormOpen);
    });

    document.querySelector('#btn-prev').addEventListener('click', evt => advance(false));
    document.querySelector('#btn-next').addEventListener('click', evt => advance(true));
    document.querySelector('#btn-copy').addEventListener('click', evt => copyToClipboard());
    document.querySelector('#btn-save').addEventListener('click', evt => saveData());
    document.querySelector('#btn-clear').addEventListener('click', evt => clearData());


    currentDataset.forEach((item, index) => {
        let op = document.createElement('option');
        op.value = index;
        op.innerText = item.screenTitle;
        document.querySelector('#select-screen').append(op);
    });

    document.querySelector('#select-screen').addEventListener('change', (evt) => {
        currentScreenIndex = parseInt(evt.target.value);
        const url = currentDataset[currentScreenIndex].screenImageURL;
        document.querySelector('.wrapper img').setAttribute('src', url);
        renderCurrentHighlights(currentScreenIndex);
    });
}

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push({
            invisionId: obj.invisionId,
            screenId: obj.screenId,
            screenTitle: obj.screenTitle,
            name: obj.name,
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height
        });
        return acc
    }, {})
}

// Package the highlights data nicely for copying to clipboard
function getHighlightsData(logItAsWell, messageIsShowing) {
    let groupedHighlights = groupBy(highlights, 'screenTitle');
    // Optionally log the data to the browser console
    if(logItAsWell) {
        for (let [key, group] of Object.entries(groupedHighlights)) {
            const screenObj = currentDataset.find(item => item.screenTitle === key);
            let s = screenObj.screenTitle + '\n';
            s += 'Invision ID\tScreen ID\tObject\tLeft\tTop	Width\tHeight\n'
            group.forEach(h => {
                s += h.invisionId + '\t';
                s += h.screenId + '\t';
                s += h.name + '\t';
                s += h.left + '\t';
                s += h.top + '\t';
                s += h.width + '\t';
                s += h.height + '\t\n';    
            });
            s += '\n';
            console.log(s);
        }        
    }

    // Display a confirmation message
    if(!messageIsShowing) {
        messageStatus(true);
        const msg = (highlights.length > 0) ? 'Copied to clipboard!' : 'No items highlighted';
        document.querySelector('.modal-msg p').innerText = msg;
        document.querySelector('.modal-msg').classList.add('copied');
        //document.querySelector("#btn-copy").disabled = true;
        setTimeout(() => {
            messageStatus(false);
            document.querySelector('.modal-msg').classList.remove('copied');        
            //document.querySelector("#btn-copy").disabled = false;
        }, 3200);
    }

    return groupedHighlights;
}

function messageStatus(status) {
    msgShowing = status;
}

function updateFormStatus(status) {
    isFormOpen = status;
}

function copyToClipboard() {
    const clipboardData = getHighlightsData(true, msgShowing);
    navigator.clipboard.writeText(JSON.stringify(clipboardData, null, 4))
    .then(() => {
      // Success!
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });    
}

function clearData(formStatus) {
    // Remove highlight elements from the DOM
    const wrapper = document.querySelector(".wrapper");
    highlights.forEach(h => {
        highlighElem = document.querySelector(`#${h.elementId}`);
        wrapper.removeChild(highlighElem);
    });

    // Remove highlights from the state
    highlights = [];
    currentHighlight = null;
    // Dismiss the form
    if(formStatus) {
        form.classList.remove('form-fade-in');
        setTimeout(() => form.classList.add('hide'), 300);
        // isFormOpen = false;
        updateFormStatus(false);
    }
}

function renderCurrentHighlights(screenIndex) {
    const currentScreenId = currentDataset[currentScreenIndex].screenId;
    const highlightElements = document.querySelectorAll('.resizable');
    highlightElements.length && highlightElements.forEach(elem => {
        if (elem.dataset.screenId === currentScreenId) {
            elem.style.display = 'block';
            elem.classList.add('fadey-fay');
        } else {
            elem.style.display = 'none';
            elem.classList.remove('fadey-fay');
        }
    });
}

// Send the current set of highlights to the back end app,
// which creates a JSON file and saves it to the back end.
// TODO: Allow this client app to get the JSON file and
// load its outlines.
function saveData() {
    let groupedHighlights = groupBy(highlights, 'screenTitle');
    // Func saveHighlightsData is in servrActions.js
    if(Object.entries(groupedHighlights).length > 0) {
        saveHighlightsData(groupedHighlights);
    }
}


window.addEventListener('DOMContentLoaded', event => {
    initListeners();
});
