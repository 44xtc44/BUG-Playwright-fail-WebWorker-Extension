// firefox.js

// import { firefox as viewer } from "playwright";
import { firefox as viewer } from "playwright/test";

export { homePageOpen };

/**
 * https://testomat.io/blog/playwright-tutorial-experience-testing-browser-extensions/
 * https://www.browserstack.com/guide/fixtures-in-playwright
 */

/**
 * Run fun from command line.
 *  npx run-func firefox.js homePageOpen -y // yes
 *
 * @returns
 */
async function homePageOpen() {
  const brand = "firefox";
  const { pathToHomePage, pathToExtension } = await resolveExtensionPage();
  console.log("-> pathToExtension ", pathToExtension);
  const userDataDir = ""; // "" use some temporary directory elsewhere
  const browserContext = await viewer.launchPersistentContext(userDataDir, {
    channel: brand,
    headless: false, // useless if {args: [`--headless=new`]}
    args: [
      //  `--headless=new`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      `--allow-file-access-from-files`, // CORS errror; no HTTP server (extension)
    ],
  });

  const page = await browserContext.newPage();
  await page.goto(pathToHomePage);

  // Test the service worker section.

  // await browserContext.close(); // Close browser and/or end of test.
  return "foo";
}

/**
 * Load manifest.json for Browser brand and resolve start page of app.
 * Keep the paths intact if module is moved around in /tests folder.
 *
 * Page loader needs a full qualified path name.
 * Extension paht Manifest loader needs relative path.
 * @returns {Promise<{pathToHomePage:string, pathToExtension: string}>} home page paths || Error
 */
function resolveExtensionPage() {
  return new Promise((resolve, _) => {
    const __dirname = import.meta.dirname; // this test module's dir

    const array = __dirname.split("/");
    for (const [idx, dir] of array.entries()) {
      if (dir === "tests") {
        const protocol = "file://";
        const pkgDir = array.slice(0, idx).join("/");
        const homePageRelative = "/static/index.html";
        const pathToHomePage = protocol + pkgDir + homePageRelative;

        let pathToExtension = "";
        for (let i = 0; i < array.length - idx; i++) {
          pathToExtension += "../";
        }

        resolve({
          pathToHomePage: pathToHomePage,
          pathToExtension: pathToExtension,
        });
      }
    }
    throw new Error("Test parent folder not named '/tests'.");
  });
}
