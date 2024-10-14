# PWA-Text-Editor

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)

## Description
This is a single-page application of a text editor, called Just Another Text Editor (JATE), that runs within a browser and meets the criteria of a Progressive Web Application (PWA).  This application is developed to provide users a means of creating and storing notes or code snippets, with or without an internet connection, so that they can reliably retrieve them for later use. A screenshot of the application can be found below:  
![JATE Screenshot](https://github.com/user-attachments/assets/b6b2a931-7417-4cb2-b35d-c7768eb7f297)

The application is deployed on Render and should also function offline. The app can be found at:  
https://pwa-text-editor-un22.onrender.com/

---

## Installation
As a PWA, installation of JATE depends on the capability of your browser. For most browsers, simply visit the application link and once the application opens, click on the Black Install button in the upper left hand corner. You will be prompted if you want to install JATE. Click OK and you are done. JATE should appear as an installed app on your computer thereafter. 

For Chromium-based browsers only: you can subsequently uninstall JATE by clicking on the three dots to the right and select "Uninstall Just Another Text Editor".
  
---
## Usage
Usage of J.A.T.E. although simple once you understand the concept behind it, may not be as intuitive from the get go. J.A.T.E does not employ the usual method of creating, opening, updating and/or deleting a note.  
  
J.A.T.E essentially only services the one note. Saving your note requires that the application loses focus in order to do so. In other words, you need to click off the body of the application in order for your note to be saved.  

Once you have do so, your note is, however, stored within the IndexedDB Database. Hence your note will not be lost if you close your browser, or the app itself.  

The IndexedDB 'backend' though, does service the methods of GET and PUT. In principle, application development tools such a Insomnia and Postman can employ those methods using this app, although the utility of such would be minimal.  

As a PWA, the only feature truly implemented for such an app is the offline fuctionality. If you select to inspect the page, and subsequently navigate to the application tab, one of the options for the app is to drill down to the service worker and select offline. This will simulate the app operating as if any of the online resources were unavaliable i.e. operating offline.

---

## License
None

---

## Contributing
All code in this app was refactored by Warren Shan from starter code provided by Xandromus.
  

---

## Tests
During development, the application is tested using `localhost`. 

---
