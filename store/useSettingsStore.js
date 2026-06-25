import { create } from 'zustand';

const useSettingsStore = create((set) => ({
  voiceFeedback: true,
  wakeWord: false,
  chargingComplete: true,
  bookingReminders: true,
  priceDrops: true,
  safetyAlerts: true,
  isInitialized: false,

  init: () => {
    if (typeof window !== 'undefined') {
      const voiceFeedback = localStorage.getItem('voiceFeedback') !== 'false';
      const wakeWord = localStorage.getItem('wakeWord') === 'true';
      const chargingComplete = localStorage.getItem('chargingComplete') !== 'false';
      const bookingReminders = localStorage.getItem('bookingReminders') !== 'false';
      const priceDrops = localStorage.getItem('priceDrops') !== 'false';
      const safetyAlerts = localStorage.getItem('safetyAlerts') !== 'false';
      
      set({ 
        voiceFeedback, 
        wakeWord, 
        chargingComplete, 
        bookingReminders, 
        priceDrops, 
        safetyAlerts, 
        isInitialized: true 
      });
    } else {
      set({ isInitialized: true });
    }
  },

  setVoiceFeedback: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('voiceFeedback', enabled);
    set({ voiceFeedback: enabled });
  },

  setWakeWord: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('wakeWord', enabled);
    set({ wakeWord: enabled });
  },

  setChargingComplete: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('chargingComplete', enabled);
    set({ chargingComplete: enabled });
  },

  setBookingReminders: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('bookingReminders', enabled);
    set({ bookingReminders: enabled });
  },

  setPriceDrops: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('priceDrops', enabled);
    set({ priceDrops: enabled });
  },

  setSafetyAlerts: (enabled) => {
    if (typeof window !== 'undefined') localStorage.setItem('safetyAlerts', enabled);
    set({ safetyAlerts: enabled });
  }
}));

export default useSettingsStore;
