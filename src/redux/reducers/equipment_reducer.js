
import { createReducer } from './../../utilities';
import  action_types  from './../actions/action_types'


export const equipments = createReducer([], {
    [action_types.EQUIPMENTS](state,{equipments}) {
        console.log(equipments)
        return equipments ? equipments : null
    }
});

