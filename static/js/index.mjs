// index.js
"use strict";

function setText(text) {
  document.getElementById("title").textContent = text;
}

/**
 * Two ways to instanstiate the worker.
 * ECMAScript { type: "module" } and new URL()
 */
// let worker = new Worker("/static/js/worker.mjs", { type: "module" });
let worker = new Worker(new URL("/static/js/worker.mjs", import.meta.url), {
  type: "module",
});

worker.postMessage({ txt: "au travail, monsieur" });
worker.onmessage = (e) => {
  console.log("-> caller received message.", e.data);
  setText(e.data.txt);
};

worker.onerror = (e) => {
  console.log("-> worker reported error.", e);
};
