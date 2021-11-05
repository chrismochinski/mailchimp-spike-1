import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchLists() {
  try {
      console.log('Get ALL LISTS saga')
    const response = yield axios.get("/api/subscribe/all-lists");
    yield put({ type: "SET_ALL_LISTS", payload: response });
    console.log('response in GET ALL LISTS:', response.data)
  } catch (error) {
    console.log("Failure to GET ALL SUBS AND ALL INFO", error);
  }
}

function* getAllListsSaga() {
  yield takeEvery("GET_ALL_LISTS", fetchLists);
}

export default getAllListsSaga;
