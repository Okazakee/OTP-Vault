import { createContext, useEffect, useState } from 'react';

// Define what our entries look like
type OTPEntry = {
  id: string;
  name: string;
  icon: string;
};

// Define what our context provides
type EntriesContextType = {
  entries: OTPEntry[] | null;
  isLoading: boolean;
  // functions to manipulate entries...
};

// Create the context with default values
const EntriesContext = createContext<EntriesContextType>({
  entries: null,
  isLoading: true,
  // empty function implementations...
});

export function EntriesProvider({ children }) {
  // State for entries
  const [entries, setEntries] = useState<OTPEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load entries - we'll implement this soon
  const loadEntries = async () => {/* ... */};

  // Load entries when component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  // Provide the state and functions to children
  return (
    <EntriesContext.Provider value={{
      entries,
      isLoading,
      // other functions...
    }}>
      {children}
    </EntriesContext.Provider>
  );
}