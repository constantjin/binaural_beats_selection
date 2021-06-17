import os, glob, random

from flask import request, current_app
from flask.views import MethodView


class SoundAPI(MethodView):
    def get(self):
        sound_dir_glob = current_app.config["SOUND_DIR"] + "/**/" 
        sound_dir_list = list(filter(lambda p: not p.endswith("/sounds/"), glob.glob(sound_dir_glob, recursive=True)))

        def prepare_path(sound_dir):
            category = os.path.basename(sound_dir[:-1])
            sound_glob = sound_dir + "*.wav"
            soundfile_list = list(glob.glob(sound_glob))
            random.shuffle(soundfile_list)

            first_filename_with_ext = os.path.basename(soundfile_list[0])
            first_name = os.path.splitext(first_filename_with_ext)[0]
            first_url = current_app.config["SOUND_URL"] + f"{category}/" + first_filename_with_ext

            second_filename_with_ext = os.path.basename(soundfile_list[1])
            second_name = os.path.splitext(second_filename_with_ext)[0]
            second_url = current_app.config["SOUND_URL"] + f"{category}/" + second_filename_with_ext

            return {"category": category, "first_name": first_name, "first_url": first_url, "second_name": second_name, "second_url": second_url}
        
        data = list(map(prepare_path, sound_dir_list))
        random.shuffle(data)
        dummy_url = current_app.config["SOUND_URL"] + "dummy.wav"

        return {"status": "success", "data": {"dummy": dummy_url, "sounds": data}}, 200
