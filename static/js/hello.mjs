// hello.mjs

export { say };

/**
 * @param {string} msg 
 * @returns {Promise<string>}
 */
function say(msg) {
  return new Promise((resolve, _) => {
    console.log("-> say ", msg);
    resolve(msg);
  });
}
