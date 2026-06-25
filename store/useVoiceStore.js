import { create } from 'zustand';

const useVoiceStore = create((set) => ({
  voiceFeedback: true,
  wakeWord: false,
  isInitialized: false,

  init: () => {
    if (typeof window !== 'undefined') {
      const voiceFeedback = localStorage.getItem('voiceFeedback') !== 'false'; // default true
      const wakeWord = localStorage.getItem('wakeWord') === 'true'; // default false
      set({ voiceFeedback, wakeWord, isInitialized: true });
    } else {
      set({ isInitialized: true });
    }
  },

  setVoiceFeedback: (enabled) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('voiceFeedback', enabled);
    }
    set({ voiceFeedback: enabled });
  },

  setWakeWord: (enabled) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wakeWord', enabled);
    }
    set({ wakeWord: enabled });
  }
}));

export default useVoiceStore;
