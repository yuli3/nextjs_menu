// utils/history.ts (Example implementation)
const HISTORY_KEY = 'menuHistory';
const MAX_HISTORY_LENGTH = 10; // Keep the last 10 items

export const getHistory = (): string[] => {
  if (typeof window === 'undefined') return []; // Prevent SSR errors
  const storedHistory = localStorage.getItem(HISTORY_KEY);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const addToHistory = (newItem: string): string[] => {
  if (typeof window === 'undefined') return [];
  const currentHistory = getHistory();

  // Prevent duplicates at the very top
  if (currentHistory[0] === newItem) {
    return currentHistory;
  }

  // Add new item to the beginning and limit length
  const updatedHistory = [newItem, ...currentHistory].slice(0, MAX_HISTORY_LENGTH);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
};