import React, { useState, useRef } from "react";

function About() {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // Hindi के लिए
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      console.log("Recognized:", speechText);
      setText((prev) => prev + " " + speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Mic error: " + event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div>
      <h2>Mic Input Example</h2>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={startListening}>🎤 बोलो</button>
    </div>
  );
}

export default About;

