// Your script here.



  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = document.querySelectorAll('[type="range"], [name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
  }

  function setOption() {
    msg[this.name] = this.value;
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function handleSpeak() {
    toggle(false);
  }

  function handleStop() {
    toggle(true);
  }

  // Add event listeners
  voicesDropdown.addEventListener('input', setVoice);
  options.forEach(option => option.addEventListener('input', setOption));
  speakButton.addEventListener('click', handleSpeak);
  stopButton.addEventListener('click', handleStop);

  // Additional code to populate voices on page load
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  populateVoices();
