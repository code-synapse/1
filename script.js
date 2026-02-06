const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rateRange = document.getElementById("rate-range");
const pitchRange = document.getElementById("pitch-range");
const rateValue = document.getElementById("rate-value");
const pitchValue = document.getElementById("pitch-value");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const message = document.getElementById("message");

const synth = window.speechSynthesis;
let voices = [];

function setMessage(text) {
  message.textContent = text;
}

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  if (!voices.length) {
    setMessage("利用可能な音声を読み込み中です...");
    return;
  }

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " - default" : ""}`;
    voiceSelect.append(option);
  });

  const jaVoiceIndex = voices.findIndex((voice) => voice.lang.toLowerCase().startsWith("ja"));
  if (jaVoiceIndex >= 0) {
    voiceSelect.value = String(jaVoiceIndex);
  }

  setMessage("準備完了。テキストを入力して読み上げできます。");
}

function speakText() {
  const text = textInput.value.trim();
  if (!text) {
    setMessage("先に読み上げる文字を入力してください。");
    return;
  }

  if (!voices.length) {
    setMessage("音声の初期化がまだ完了していません。少し待ってから再度お試しください。");
    return;
  }

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[Number(voiceSelect.value)] ?? voices[0];
  utterance.rate = Number(rateRange.value);
  utterance.pitch = Number(pitchRange.value);

  utterance.onstart = () => setMessage("読み上げ中...");
  utterance.onend = () => setMessage("読み上げが完了しました。");
  utterance.onerror = () => setMessage("読み上げ中にエラーが発生しました。");

  synth.speak(utterance);
}

rateRange.addEventListener("input", () => {
  rateValue.textContent = Number(rateRange.value).toFixed(1);
});

pitchRange.addEventListener("input", () => {
  pitchValue.textContent = Number(pitchRange.value).toFixed(1);
});

speakBtn.addEventListener("click", speakText);

stopBtn.addEventListener("click", () => {
  synth.cancel();
  setMessage("読み上げを停止しました。");
});

if (typeof speechSynthesis !== "undefined") {
  populateVoices();
  speechSynthesis.onvoiceschanged = populateVoices;
} else {
  setMessage("このブラウザは音声読み上げに対応していません。");
  speakBtn.disabled = true;
  stopBtn.disabled = true;
}
