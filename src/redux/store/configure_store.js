import {createStore,applyMiddleware,compose} from 'redux'
import create_saga_middleware                from 'redux-saga'
import root_reducer                          from './../reducers'
import {init_sagas}                          from './../../init_sagas'

export default function configure_store  (initial_state){
    const saga_middleware = create_saga_middleware()
    const middlewares     = [saga_middleware]
    const composables     = [applyMiddleware(...middlewares)]
    const enhancer        = compose(...composables)   
    let store = createStore(root_reducer,initial_state,enhancer)
    init_sagas(saga_middleware)
 return store
}
