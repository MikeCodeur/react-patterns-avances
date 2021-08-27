// Context Module Functions
//  🚀 Reset des compteurs
// http://localhost:3000/alone/final/06.bonus-2.js

import * as React from 'react'
import CheckBox from '../checkbox'
import {
  CounterProvider,
  CounterChangedProvider,
  useCounterChanged,
  useCounter,
  decrement,
  increment,
  reset,
} from './06/context-counter'

function Counter() {
  const [state, dispatch] = useCounter()
  const [stateCounterchanged, dispatchCounterChanged] = useCounterChanged()

  const handleReset = () => {
    reset(dispatch)
    reset(dispatchCounterChanged)
  }

  return (
    <div>
      <div>Compteur : {state.count}</div>
      <div>Compteur change : {stateCounterchanged.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatch)}>+</button>
      <button onClick={handleReset}>reset All</button>
    </div>
  )
}

function TwoCheckbox() {
  const [, dispatch] = useCounter()
  const [, dispatchCounterChanged] = useCounterChanged()
  return (
    <div>
      <CheckBox onChange={() => increment(dispatch)} />
      <CheckBox onChange={() => increment(dispatchCounterChanged)} />
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <CounterChangedProvider>
        <Counter />
        <TwoCheckbox />
      </CounterChangedProvider>
    </CounterProvider>
  )
}

export default App
