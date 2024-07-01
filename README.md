Web Blocker Chrome Extension
Overview
The Web Blocker Chrome Extension allows users to block specific websites, either by manually adding URLs or by blocking the current page. The extension uses Chrome's storage.sync API to manage the blocklist and redirects blocked websites to a custom "blocked" page.

Features
Add Website to Blocklist:
Enter a URL and click "Add" to block it.
Block Current Page:
Click "Block Current Page" to add the current site to the blocklist.
Remove Website from Blocklist:
Click "Remove" next to the URL to unblock it.

Installation
Clone or download the extension.
Run in Command Line:
npm install
npm run build(it will create a dist folder)
Next step:-
Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode."
Click "Load unpacked" and select the extension directory (..your_src_code_dir../dist)
Key Components
App.js: Manages the blocklist and user interactions.
ToggleSwitch.js: (optional) Component for enabling/disabling the blocker.
blocked.html: Custom page shown for blocked websites.

How It Works
Blocklist Management:
Uses Chrome storage to save and retrieve the blocklist.
Adds or removes URLs from the blocklist.
URL Blocking:
Listens for navigation events and checks against the blocklist.
Redirects blocked URLs to a custom page.

Files
App.js: Main React component.
ToggleSwitch.js: Toggle for enabling/disabling the blocker.
App.css: Styling for the extension.
blocked.html: Page displayed when a blocked URL is accessed.
