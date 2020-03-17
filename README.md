# Landing Page Highlighter Client and Server

## Landing Page Highlighter Client
Allows the user to highlight (draw a rectangular outline around) areas of an InVision prototype by click-dragging over its screens. Highlight information is ultimately incorporated into JSON project files that drive the CCSDK Landing Page.

## Landing Page Highlighter Server
A very simple Node/Express app that formats highlight data received from the client, then saves it to a file. This makes the highlights information persistent, so that the user could at some later time, make changes to their highlights then copy the updated information their clipboard.