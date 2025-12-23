// background.js
"use strict";

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("/static/index.html"),
    active: true,
  });
});
