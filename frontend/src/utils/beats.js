import * as Tone from "tone";
import { Howl } from "howler";

export function initTone() {
  window.mergedChannel = new Tone.Merge().toMaster();
  window.leftEar = new Tone.Oscillator();
  window.rightEar = new Tone.Oscillator();
  window.leftEar.connect(window.mergedChannel.left);
  window.rightEar.connect(window.mergedChannel.right);
  console.info("# DEBUG: Tone.js initialized.");
}

// Beat-related functions

export function initBeat(hertz, freq) {
  const left_freq = hertz - freq / 2;
  const right_freq = hertz + freq / 2;

  window.leftEar.set("frequency", left_freq);
  window.rightEar.set("frequency", right_freq);
  console.info(
    `# DEBUG: Tone.js - frequencies were set to ${left_freq} / ${right_freq}.`
  );
}

export function playBeat() {
  window.leftEar.start();
  window.rightEar.start();
  console.info("# DEBUG: Tone.js - a beat is playing.");
}

export function stopBeat() {
  window.leftEar.stop();
  window.rightEar.stop();
  console.info("# DEBUG: Tone.js - a beat was stopped.");
}

export function testBeat() {
  window.leftEar.set("frequency", 450);
  window.rightEar.set("frequency", 450);
  window.leftEar.set("volume", -50);
  window.rightEar.set("volume", -50);
  console.info("# DEBUG: Tone.js - test beat was set.");
}

export function setVolume(vol) {
  window.leftEar.set("volume", vol);
  window.rightEar.set("volume", vol);
}

// Carsound-related functions

export function asyncLoadCarSound(sound_path) {
  return new Promise((resolve, reject) => {
    if (window.player) {
      console.error(
        "# Error: Howler.js - window.howlPlayer should be cleared after each load!"
      );
      reject();
    } else {
      window.howlPlayer = new Howl({
        src: [sound_path],
        preload: true,
        html5: true,
        volume: 1.0,
        onload: () => {
          console.info(
            `# DEBUG: Howler.js - a sound (${sound_path}) was loaded.`
          );
          resolve();
        },
      });
    }
  });
}

export function asyncLoadCategorySound(sound_path, category, loop = false) {
  const category_volume = category.startsWith("IADS") ? 0.5 : 1.0;
  return new Promise((resolve, reject) => {
    if (window.player) {
      console.error(
        "# Error: Howler.js - window.howlPlayer should be cleared after each load!"
      );
      reject();
    } else {
      window.howlPlayer = new Howl({
        src: [sound_path],
        preload: true,
        html5: true,
        volume: category_volume,
        loop: loop,
        onload: () => {
          console.info(
            `# DEBUG: Howler.js - a ${category} sound (${sound_path}) was loaded.`
          );
          resolve();
        },
      });
    }
  });
}

export function getSoundDurationInMs() {
  if (!window.howlPlayer) {
    console.error(
      "# Error: Howler.js - window.howlPlayer should be initialized!"
    );
    return 0;
  } else if (window.howlPlayer.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
    return 0;
  } else {
    return window.howlPlayer.duration() * 1000;
  }
}

export async function asyncPlaySoundOnce() {
  const soundPromise = new Promise((resolve, reject) => {
    if (!window.howlPlayer) {
      console.error(
        "# Error: Howler.js - window.howlPlayer should be initialized!"
      );
      reject();
    } else {
      console.info(`# DEBUG: Howler.js - a sound is playing.`);
      window.howlPlayer.once("end", () => {
        console.info(`# DEBUG: Howler.js - a sound was stopped.`);
        resolve();
      });
      window.howlPlayer.play();
    }
  });

  try {
    await soundPromise;
  } catch (e) {
    console.error(e);
  }
}

export function playSound() {
  if (!window.howlPlayer) {
    console.error(
      "# Error: Howler.js - window.howlPlayer should be initialized!"
    );
  } else if (window.howlPlayer.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    window.howlPlayer.play();
  }
}

export function setLoopAndPlayCarSound() {
  if (window.howlPlayer) {
    console.info(`# DEBUG: Howler.js - a sound was set to LOOP.`);
    window.howlPlayer.volume(1.0);
    window.howlPlayer.loop(true);
    if (!window.howlPlayer.playing()) {
      console.info(`# DEBUG: Howler.js - a LOOP sound is playing.`);
      window.howlPlayer.play();
    }
  }
}

export function justStopCarSound() {
  if (window.howlPlayer) {
    window.howlPlayer.stop();
    console.info(`# DEBUG: Howler.js - a sound was stopped.`);
  }
}

export function stopAndUnloadCarSound() {
  if (window.howlPlayer) {
    if (window.howlPlayer.playing()) {
      window.howlPlayer.stop();
      console.info(`# DEBUG: Howler.js - a sound was stopped.`);
    }
    window.howlPlayer.unload();
    window.howlPlayer = null;
    console.info(`# DEBUG: Howler.js - a sound was unloaded.`);
  }
}

export function checkCarSoundPlaying() {
  if (!window.howlPlayer) {
    return false;
  } else {
    return window.howlPlayer.playing();
  }
}
