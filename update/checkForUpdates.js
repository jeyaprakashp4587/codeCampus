import * as Updates from "expo-updates";

async function checkForUpdates() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      console.log("update available");
      Updates.reloadAsync();
    }
  } catch (e) {
    console.error(e);
  }
}

export default checkForUpdates;
