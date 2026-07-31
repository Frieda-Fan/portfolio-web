class SoundEngine {
  constructor() {
    this.context = null;
    this.master = null;
    this.available = true;
    this.muted = true;
    this.buffers = new Map();
    this.activeSources = new Set();
    this.ambientNodes = null;
  }

  setAvailable(available) {
    this.available = available;
    if (!available) {
      this.stopAll();
      this.setMuted(true);
    }
  }

  ensureContext() {
    if (this.context) return this.context;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.context.destination);
    return this.context;
  }

  async unlock() {
    const context = this.ensureContext();
    if (context?.state === "suspended") await context.resume();
  }

  setMuted(muted) {
    const nextMuted = this.available ? muted : true;
    this.muted = nextMuted;
    window.localStorage.setItem("portfolio-sound-muted", String(nextMuted));
    if (!this.master || !this.context) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.setTargetAtTime(nextMuted ? 0 : 0.72, this.context.currentTime, 0.045);
    if (!nextMuted) this.startAmbient();
  }

  async enable() {
    if (!this.available) {
      this.setMuted(true);
      return false;
    }
    await this.unlock();
    this.setMuted(false);
    this.chime(0, 0.11);
    return true;
  }

  disableWithFeedback() {
    if (this.muted) return;
    this.tone({ duration: 0.18, from: 260, to: 92, gain: 0.055, type: "triangle" });
    this.noise({ at: 0.03, duration: 0.16, gain: 0.025, highpass: 900 });
    window.setTimeout(() => this.setMuted(true), 150);
  }

  startAmbient() {
    const context = this.ensureContext();
    if (!context || !this.master || this.ambientNodes) return;

    const seconds = 4;
    const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const data = buffer.getChannelData(0);
    let smoothed = 0;
    for (let index = 0; index < data.length; index += 1) {
      smoothed = smoothed * 0.985 + (Math.random() * 2 - 1) * 0.015;
      data[index] = smoothed;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const sub = context.createOscillator();
    const subGain = context.createGain();

    source.buffer = buffer;
    source.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 330;
    filter.Q.value = 0.55;
    gain.gain.value = 0.018;
    sub.type = "sine";
    sub.frequency.value = 43;
    subGain.gain.value = 0.0045;

    source.connect(filter).connect(gain).connect(this.master);
    sub.connect(subGain).connect(this.master);
    source.start();
    sub.start();
    this.ambientNodes = { source, sub };
  }

  stopAll() {
    this.activeSources.forEach((source) => {
      try { source.stop(); } catch { /* already stopped */ }
    });
    this.activeSources.clear();
  }

  track(source) {
    this.activeSources.add(source);
    source.addEventListener?.("ended", () => this.activeSources.delete(source), { once: true });
    return source;
  }

  tone({ at = 0, duration = 0.4, from = 120, to = from, gain = 0.08, type = "sine" }) {
    const context = this.ensureContext();
    if (!context || !this.master || this.muted) return;
    const start = context.currentTime + at;
    const oscillator = this.track(context.createOscillator());
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + duration);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + Math.min(0.06, duration * 0.2));
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope).connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  noise({ at = 0, duration = 0.12, gain = 0.05, highpass = 500 }) {
    const context = this.ensureContext();
    if (!context || !this.master || this.muted) return;
    const start = context.currentTime + at;
    const length = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / length);
    }
    const source = this.track(context.createBufferSource());
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    source.buffer = buffer;
    filter.type = "highpass";
    filter.frequency.value = highpass;
    envelope.gain.setValueAtTime(gain, start);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter).connect(envelope).connect(this.master);
    source.start(start);
  }

  chime(at = 0, gain = 0.08) {
    this.tone({ at, duration: 0.7, from: 220, to: 440, gain, type: "sine" });
    this.tone({ at: at + 0.05, duration: 0.8, from: 330, to: 660, gain: gain * 0.55, type: "triangle" });
  }

  gearOpen() {
    if (this.muted) return;
    this.tone({ duration: 1.45, from: 96, to: 42, gain: 0.075, type: "sawtooth" });
    this.tone({ at: 0.08, duration: 1.25, from: 54, to: 31, gain: 0.08, type: "triangle" });
    for (let index = 0; index < 18; index += 1) {
      const at = index * 0.072;
      this.noise({ at, duration: 0.035, gain: 0.026 + (index % 4) * 0.004, highpass: 1050 });
      this.tone({ at, duration: 0.055, from: 220 - index * 4, to: 128 - index * 2, gain: 0.018, type: "square" });
    }
    this.noise({ at: 1.28, duration: 0.18, gain: 0.1, highpass: 180 });
    this.tone({ at: 1.28, duration: 0.32, from: 78, to: 38, gain: 0.095, type: "sine" });
  }

  pageTurn() {
    this.noise({ duration: 0.16, gain: 0.08, highpass: 620 });
    this.tone({ duration: 0.2, from: 260, to: 180, gain: 0.028, type: "triangle" });
  }

  sigilReveal(count = 1) {
    for (let index = 0; index < count; index += 1) {
      this.tone({ at: index * 0.12, duration: 0.34, from: 330 + index * 45, to: 495 + index * 55, gain: 0.027, type: "triangle" });
    }
  }

  projectOpen() {
    this.tone({ duration: 0.32, from: 180, to: 360, gain: 0.045, type: "sine" });
    this.noise({ at: 0.04, duration: 0.13, gain: 0.035, highpass: 640 });
  }

  async loadVoice(category) {
    if (this.buffers.has(category)) return this.buffers.get(category);
    const promise = fetch(`/audio/voice/${category}.wav`)
      .then((response) => {
        if (!response.ok) throw new Error(`Voice audio failed: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((data) => this.ensureContext()?.decodeAudioData(data));
    this.buffers.set(category, promise);
    return promise;
  }

  async playCategory(category) {
    if (this.muted) return;
    await this.unlock();
    this.chime(0, 0.07);
    const buffer = await this.loadVoice(category);
    if (!buffer || !this.context || !this.master || this.muted) return;
    const source = this.track(this.context.createBufferSource());
    const gain = this.context.createGain();
    gain.gain.value = 0.82;
    source.buffer = buffer;
    source.connect(gain).connect(this.master);
    source.start(this.context.currentTime + 0.18);
  }
}

export const soundEngine = new SoundEngine();
