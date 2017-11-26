import {combineReducers}     from 'redux'
import  {equipments}         from './equipment_reducer'

const root_reducer = combineReducers({
    equipments
})

export default root_reducer