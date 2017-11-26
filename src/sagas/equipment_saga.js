import {effects}    from 'redux-saga'
import action_types from '../redux/actions/action_types'

export function* equipment(){
   let state =  yield effects.take(action_types.EQUIPMENT) 
}