import {fork , all} from 'redux-saga/effects';



const allSaga = [

];

export default function* rootSaga(){
    yield all(allSaga.map(saga => fork(saga)));
}

