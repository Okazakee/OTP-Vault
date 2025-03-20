// In a file like utils/otpUtils.ts

// Get all entries
export async function getOTPEntries() {
  try {
    const entriesJson = await AsyncStorage.getItem('otpEntries');
    return entriesJson ? JSON.parse(entriesJson) : null;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return null;
  }
}

// More functions for adding, updating, deleting...