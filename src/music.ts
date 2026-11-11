
export function createLoveSong() {
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as {
      webkitAudioContext: typeof AudioContext;
    }).webkitAudioContext;

  if (!AudioContextClass) return { stop() {} };

  const ctx = new AudioContextClass();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  let stopped = false;
  let timer: number | undefined;
  let index = 0;

  // Peaceful, dreamy romantic melody
  const melody = [
    523.25, 659.25, 587.33, 523.25,
    440.00, 523.25, 587.33, 659.25,
    587.33, 523.25, 440.00, 392.00,
    440.00, 523.25, 493.88, 523.25,
  ];

  // Warm and gentle background chords
  const chords = [
    [261.63, 329.63, 392.00],
    [220.00, 261.63, 329.63],
    [174.61, 220.00, 261.63],
    [196.00, 246.94, 293.66],
  ];

  function softNote(
    frequency: number,
    start: number,
    duration: number,
    volume: number
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(
      volume,
      start + 0.35
    );
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      start + duration
    );

    osc.connect(gain);
    gain.connect(master);

    osc.start(start);
    osc.stop(start + duration + 0.1);
  }

  function playStep() {
    if (stopped) return;

    const now = ctx.currentTime;

    // Main delicate melody
    softNote(
      melody[index % melody.length],
      now,
      2.8,
      0.12
    );

    // Very subtle high sparkle
    if (index % 4 === 0) {
      softNote(
        melody[index % melody.length] * 2,
        now + 0.2,
        2.2,
        0.012
      );
    }

    // Slow, warm background harmony
    if (index % 4 === 0) {
      const chord = chords[
        Math.floor(index / 4) % chords.length
      ];

      chord.forEach((frequency) => {
        softNote(
          frequency / 2,
          now,
          5.5,
          0.018
        );
      });
    }

    index++;
  }

  async function start() {
    await ctx.resume();

    if (stopped) return;

    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(
      0.38,
      ctx.currentTime + 4
    );

    playStep();

    // Slow, peaceful rhythm
    timer = window.setInterval(playStep, 1050);
  }

  void start();

  return {
    stop() {
      if (stopped) return;
      stopped = true;

      if (timer !== undefined) {
        window.clearInterval(timer);
      }

      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(
        0,
        ctx.currentTime,
        0.8
      );

      window.setTimeout(() => {
        void ctx.close();
      }, 4000);
    },
  };
}
