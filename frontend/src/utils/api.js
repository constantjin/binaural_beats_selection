import axios from "axios";

const soundsEndPoint = "/api/sounds";
const registerEndPoint = "/api/subjects";
const ratingsEndPoint = "/api/ratings";
const beatsEndPoint = "/api/beats";

export async function asyncFetchSoundUrls() {
  try {
    const responses = await axios.get(soundsEndPoint);
    return responses.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function asyncRegisterSubject(data) {
  try {
    const response = await axios.post(registerEndPoint, data);
    const subjectId = response.data.data.id;
    console.log(`-- DEBUG -- \nregisterd subject_id:\n  ${subjectId}`);
    return subjectId;
  } catch (err) {
    console.error(err);
    console.log(err.response.data.data);
    throw err;
  }
}

export async function asyncSaveRating(data) {
  try {
    const response = await axios.post(ratingsEndPoint, data);
    const ratingId = response.data.data.id;
    console.log(`-- DEBUG -- \nsaved rating_id:\n  ${ratingId}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data.data);
    throw err;
  }
}

export async function asyncSaveBeat(data) {
  try {
    const response = await axios.post(beatsEndPoint, data);
    const beatId = response.data.data.id;
    console.log(`-- DEBUG -- \nsaved beat_id:\n  ${beatId}`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data.data);
    throw err;
  }
}
