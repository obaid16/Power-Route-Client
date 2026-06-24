"use client";

import { useState, useEffect, useCallback } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = true;
        reco.interimResults = true;
        reco.lang = "en-US";

        reco.onstart = () => setIsListening(true);
        reco.onend = () => setIsListening(false);
        
        reco.onresult = (event) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          
          const lowerTranscript = currentTranscript.toLowerCase();
          
          // Wake Word Detection
          if (lowerTranscript.includes("power ai") || lowerTranscript.includes("hey power ai")) {
            window.dispatchEvent(new CustomEvent('open-ai-assistant'));
            
            // Extract the command after the wake word if any
            const command = lowerTranscript.split(/power ai|hey power ai/)[1]?.trim();
            if (command) {
              setTranscript(command);
            } else {
              setTranscript("Listening...");
            }
          } else {
            setTranscript(currentTranscript);
          }
        };

        reco.onerror = (event) => {
          setError(event.error);
          setIsListening(false);
        };

        Promise.resolve().then(() => setRecognition(reco));
      } else {
        Promise.resolve().then(() => setError("Speech Recognition is not supported in this browser."));
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript("");
      setError(null);
      try {
        recognition.start();
      } catch (e) {
        // Recognition might already be started
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    setTranscript
  };
}
