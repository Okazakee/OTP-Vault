import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';

// Define OTP entry type
export type OTPEntry = {
  id: string;
  name: string;
  icon: string;
  secret: string;
  issuer?: string;
  digits?: number;
  period?: number;
  type?: 'totp' | 'hotp';
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
  counter?: number;
};

// Get all entries
export async function getOTPEntries(): Promise<OTPEntry[] | null> {
  try {
    const entriesJson = await AsyncStorage.getItem('otpEntries');
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error fetching entries:', error);
    return [];
  }
}

// Add a new entry
export async function addOTPEntry(entry: Omit<OTPEntry, 'id'>): Promise<OTPEntry> {
  try {
    // Get existing entries or initialize empty array
    const existingEntries = await getOTPEntries() || [];

    // Create new entry with ID
    const newEntry: OTPEntry = {
      ...entry,
      id: generateUniqueId(),
      type: entry.type || 'totp',
      algorithm: entry.algorithm || 'SHA1',
      digits: entry.digits || 6,
      period: entry.period || 30,
    };

    // Add new entry to array
    const updatedEntries = [...existingEntries, newEntry];

    // Save updated array
    await AsyncStorage.setItem('otpEntries', JSON.stringify(updatedEntries));

    return newEntry;
  } catch (error) {
    console.error('Error adding entry:', error);
    throw error;
  }
}

// Update an existing entry
export async function updateOTPEntry(updatedEntry: OTPEntry): Promise<void> {
  try {
    const entries = await getOTPEntries() || [];
    const updatedEntries = entries.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );

    await AsyncStorage.setItem('otpEntries', JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
}

// Delete an entry
export async function deleteOTPEntry(id: string): Promise<void> {
  try {
    const entries = await getOTPEntries() || [];
    const updatedEntries = entries.filter(entry => entry.id !== id);

    await AsyncStorage.setItem('otpEntries', JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
}

// Generate a TOTP code (demo version that just creates random codes)
export function generateTOTP(entry: OTPEntry): string {
  // This is just a simple mock implementation
  // In a real app, you would implement the actual TOTP algorithm
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Get time remaining until next code refresh
export function getTimeRemaining(period = 30): number {
  const currentTime = Math.floor(Date.now() / 1000);
  return period - (currentTime % period);
}

// Generate a unique ID
function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}