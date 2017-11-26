import {call,takeEvery,apply,take}  from 'redux-saga/effects'
import action_types                 from '../redux/actions/action_types'

let process_equipments = function* (...args){
    let {department} = args[0] 
    let fetch_url = `http://localhost:3001/equipments/${department}`
    console.log('fetch url : ',fetch_url)
    const res  =  yield call(fetch,fetch_url, {mode: 'no-cors'})
    const json =  yield call([res, 'json'])
    // const json  = yield apply(res,res.json) 
}

export function* equipments(){ 
    yield takeEvery(action_types.EQUIPMENTS,process_equipments)
}



