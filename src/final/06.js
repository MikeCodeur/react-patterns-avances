// Context Module Functions
// http://localhost:3000/alone/final/06.js

import * as React from 'react'
import CheckBox from '../checkbox'

import {
  CounterProvider,
  useCounter,
  increment,
  decrement,
} from './06/context-counter'

function Counter() {
  const [state, dispatch] = useCounter()
  return (
    <div>
      <div>Compteur : {state.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatch)}>+</button>
    </div>
  )
}

function CounterCheckBox() {
  const [, dispatch] = useCounter()
  return (
    <div>
      <CheckBox onChange={() => increment(dispatch)} />
      <CheckBox onChange={() => decrement(dispatch)} />
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <Counter />
      <CounterCheckBox />
    </CounterProvider>
  )
}

export default App
