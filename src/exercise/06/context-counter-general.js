import * as React from 'react'
import {reducer} from './context-counter'

const CounterContext = React.createContext()

function CounterProvider({step = 1, initialCount = 0, ...props}) {
  const [state, dispatch] = React.useReducer(reducer, {count: initialCount})
  return <CounterContext.Provider value={[state, dispatch]} {...props} />
}

function useCounter() {
  const context = React.useContext(CounterContext)
  if (context === undefined) {
    throw new Error(`useCounter doit être utilisé avec CounterProvider`)
  }
  return context
}

export {CounterProvider, useCounter}
