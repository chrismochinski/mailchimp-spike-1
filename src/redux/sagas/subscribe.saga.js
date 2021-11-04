import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* addNewSubscriber(action) {
    try {
        console.log("action.payload in addNewSubscriber saga is:", action.payload)
        yield axios({
            method: "POST", 
            url: "/api/subscribe", 
            data: action.payload
        });
        yield put({ type: "FETCH_SUBSCRIBER_LIST" });
    } catch (error) {
        console.log("error in sending new subscriber to mailchimp!", error)
    };
};


function* addSubscribeSaga() {
    yield takeEvery("ADD_SUBSCRIBER", addNewSubscriber);
}

export default addSubscribeSaga;