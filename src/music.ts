// Original gentle Web Audio melody. Starts only after Muchchu taps the music button.

export function createLoveSong() {
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextClass) {
    return { stop() {} };
  }

  const ctx = new AudioContextClass();
  const master = ctx.createGain();
  master.gain.value = 0.055;
  master.connect(ctx.destination);

  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 698.46];
  let index = 0;
  let timer: number | undefined;

  const playNote = () => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[index % notes.length];
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.7, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.85);
    index += 1;
  };

  ctx.resume().then(() => {
    playNote();
    timer = window.setInterval(playNote, 620);
  });

  return {
    stop() {
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      window.setTimeout(() => ctx.close(), 250);
    },
  };
}