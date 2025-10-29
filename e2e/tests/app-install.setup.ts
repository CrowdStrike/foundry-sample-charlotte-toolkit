import { test as setup } from '../src/fixtures';

setup('install Charlotte Toolkit app', async ({ appCatalogPage, appName }) => {
  // Check if app is already installed (this navigates to the app page)
  const isInstalled = await appCatalogPage.isAppInstalled(appName);

  if (!isInstalled) {
    console.log(`App '${appName}' is not installed. Installing...`);
    const installed = await appCatalogPage.installApp(appName);

    if (!installed) {
      throw new Error(
        `Failed to install app '${appName}'. Please install the app manually at:\n` +
        `https://falcon.us-2.crowdstrike.com/foundry/app-catalog/90f5d42520f6435f890ed94662a25d93\n` +
        `This is a known issue - see #ask-foundry for app installation problems.`
      );
    }
  } else {
    console.log(`App '${appName}' is already installed`);
  }
});
