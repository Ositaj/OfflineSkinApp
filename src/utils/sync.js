import NetInfo from '@react-native-community/netinfo';
import { getUnsynced, markAsSynced } from './db';

// Example: fake API endpoint (replace with your real backend later)
const API_URL = "https://your-backend.com/api/upload";

export const syncWithDoctor = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    console.log("❌ No internet, sync skipped.");
    return;
  }

  getUnsynced(async (records) => {
    for (let record of records) {
      try {
        // Send result to backend
        let res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record)
        });

        if (res.ok) {
          console.log("✅ Synced record:", record.id);
          markAsSynced(record.id);
        } else {
          console.log("⚠️ Failed to sync record:", record.id);
        }
      } catch (error) {
        console.log("❌ Error syncing record:", error);
      }
    }
  });
};
