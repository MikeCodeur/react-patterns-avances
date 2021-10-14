
import {CounterProvider, useCounter} from './context-counter-general'
import {CounterChangedProvider, useCounterChanged} from './context-counter-changed'

// 🐶 créé les fonction 'increment' et 'decrement' avec comme paramètre 'dispatch' et qui disptach l'action

const defaultReducer = (state, action) => {
  const change = action.step ?? 1
  switch (action.type) {
    case 'increment': {
      return {...state, count: state.count + change}
    }
    case 'decrement': {
      return {...state, count: state.count - change}
    }
    case 'reset': {
      return {...state, count: 0}
    }
    default: {
      throw new Error(`Type d'action non supporté: ${action.type}`)
    }
  }
}



export {
  defaultReducer as reducer,
  CounterProvider,
  useCounter,
  CounterChangedProvider,
  useCounterChanged,
  // 🐶 exporte les fonctions 'increment' et 'decrement'
}
