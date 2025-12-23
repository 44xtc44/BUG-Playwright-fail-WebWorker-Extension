// worker.mjs

/* 
// import into worker
import {say} from "./hello.mjs"
self.onmessage = async function (e) {
  console.log("-> worker received message", e.data);
  // Uncaught DataCloneError: Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': MessageEvent object could not be cloned.
  const obj = JSON.parse(JSON.stringify(e));
  const imported = await say("hello from imported module")
  self.postMessage({ txt: "worker " + imported, e: obj });
};
self.onerror = (e) => {
  const obj = JSON.parse(JSON.stringify(e));
  self.postMessage(obj);
  self.close();
};

 */

// no import - simple, had an issue with imports here, fixed by ren modules to .mjs
self.onmessage = function (e) {
  console.log("-> worker received message", e.data);
  // Uncaught DataCloneError: Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': MessageEvent object could not be cloned.
  const obj = JSON.parse(JSON.stringify(e));
  self.postMessage({ txt: "worker " + "without an imported module", e: obj });
};
self.onerror = (e) => {
  const obj = JSON.parse(JSON.stringify(e));
  self.postMessage(obj);
  self.close();
};
