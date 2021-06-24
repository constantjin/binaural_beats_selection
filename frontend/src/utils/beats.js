import * as Tone from "tone";
import { Howl } from "howler";
import { getSubjectStore } from "../stores";

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
  window.leftEar.set("volume", -35);
  window.rightEar.set("volume", -35);
  console.info("# DEBUG: Tone.js - test beat was set.");
}

export function setVolume(vol) {
  window.leftEar.set("volume", vol);
  window.rightEar.set("volume", vol);
}

// Carsound-related functions

export function asyncLoadCarSound(sound_path) {
  return new Promise((resolve, reject) => {
    if (window.howlPlayer) {
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
  const category_volume = category.startsWith("IADS")
    ? getSubjectStore().IADS_volume
    : 1.0;
  console.info(`# DEBUG: Howler.js - volume is set to ${category_volume}.`);

  return new Promise((resolve, reject) => {
    if (window.howlPlayer) {
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

// Additional Howler.js utility functions
function _loadDummySoundToHowl(sound_path, category) {
  return new Promise((resolve, reject) => {
    if (category === "CAR") {
      window.carDummyHowl = new Howl({
        src: [sound_path],
        preload: true,
        html5: true,
        volume: 1.0,
        loop: true,
        onload: () => {
          console.info(
            `# DEBUG: Howler.js - a dummy CAR sound (${sound_path}) was loaded.`
          );
          resolve();
        },
      });
    } else if (category === "IADS") {
      window.iadsDummyHowl = new Howl({
        src: [sound_path],
        preload: true,
        html5: true,
        volume: 1.0,
        loop: true,
        onload: () => {
          console.info(
            `# DEBUG: Howler.js - a dummy IADS sound (${sound_path}) was loaded.`
          );
          resolve();
        },
      });
    }
  });
}

export async function asyncLoadDummySounds(car_dummy, iads_dummy) {
  await _loadDummySoundToHowl(car_dummy, "CAR");
  await _loadDummySoundToHowl(iads_dummy, "IADS");
}

export function playCarDummySound() {
  if (!window.carDummyHowl) {
    console.error(
      "# Error: Howler.js - window.carDummyHowl should be initialized!"
    );
  } else if (window.carDummyHowl.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    console.info(`# DEBUG: Howler.js - a dummy CAR sound is playing.`);
    window.carDummyHowl.play();
  }
}

export function playIADSDummySound() {
  if (!window.iadsDummyHowl) {
    console.error(
      "# Error: Howler.js - window.iadsDummyHowl should be initialized!"
    );
  } else if (window.iadsDummyHowl.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    console.info(`# DEBUG: Howler.js - a dummy IADS sound is playing.`);
    window.iadsDummyHowl.play();
  }
}

export function stopCarDummySound() {
  if (!window.carDummyHowl) {
    console.error(
      "# Error: Howler.js - window.carDummyHowl should be initialized!"
    );
  } else if (window.carDummyHowl.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    if (window.carDummyHowl.playing()) {
      console.info(`# DEBUG: Howler.js - a dummy CAR sound was stopped.`);
      window.carDummyHowl.stop();
    }
  }
}

export function stopIADSDummySound() {
  if (!window.iadsDummyHowl) {
    console.error(
      "# Error: Howler.js - window.iadsDummyHowl should be initialized!"
    );
  } else if (window.iadsDummyHowl.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    if (window.iadsDummyHowl.playing()) {
      console.info(`# DEBUG: Howler.js - a dummy IADS sound was stopped.`);
      window.iadsDummyHowl.stop();
    }
  }
}

export function setIADSDummySoundVolume(vol) {
  if (!window.iadsDummyHowl) {
    console.error(
      "# Error: Howler.js - window.iadsDummyHowl should be initialized!"
    );
  } else if (window.iadsDummyHowl.state() !== "loaded") {
    console.error("# Error: Howler.js - the sound should be loaded!");
  } else {
    window.iadsDummyHowl.volume(vol);
  }
}

export function stopAndUnloadDummySounds() {
  if (window.carDummyHowl && window.iadsDummyHowl) {
    if (window.carDummyHowl.playing()) {
      window.carDummyHowl.stop();
    }
    if (window.iadsDummyHowl.playing()) {
      window.iadsDummyHowl.stop();
    }
    console.info(`# DEBUG: Howler.js - all dummy sounds were stopped.`);
    window.carDummyHowl.unload();
    window.carDummyHowl = null;
    window.iadsDummyHowl.unload();
    window.iadsDummyHowl = null;
    console.info(`# DEBUG: Howler.js - all dummy sounds were unloaded.`);
  }
}
