// hello.mjs

export { say };

function say(msg) {
  return new Promise((resolve, _) => {
    console.log("-> say ", msg);
    resolve(msg);
  });
}
