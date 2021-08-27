import * as React from 'react'
import {reducer} from './context-counter'

const CounterChangedContext = React.createContext()

function CounterChangedProvider({step = 1, initialCount = 0, ...props}) {
  const [state, dispatch] = React.useReducer(reducer, {count: initialCount})
  return <CounterChangedContext.Provider value={[state, dispatch]} {...props} />
}

function useCounterChanged() {
  const context = React.useContext(CounterChangedContext)
  if (context === undefined) {
    throw new Error(
      `useCounterChanged doit être utilisé avec CounterChangedProvider`,
    )
  }
  return context
}

export {CounterChangedProvider, useCounterChanged}
