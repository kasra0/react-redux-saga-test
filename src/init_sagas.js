import * as sagas from './sagas'

export  const init_sagas = (saga_middleware)=>{
   let values = Object.values(sagas)
   values.forEach(saga_middleware.run.bind(saga_middleware)) 
}

