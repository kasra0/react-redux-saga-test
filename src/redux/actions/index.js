import action_types         from './action_types'
import {makeActionCreator}  from '../../utilities'

export const equipment  = makeActionCreator(action_types.EQUIPMENT, 'department','id','equipment')
export const equipments = makeActionCreator(action_types.EQUIPMENTS,'department','equipments')

