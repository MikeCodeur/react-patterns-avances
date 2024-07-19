"use client"
// Context Module Functions
// 🚀 utilisation de 2 contextes
// http://localhost:3000/alone/final/06.bonus-1.js

import * as React from 'react'
import CheckBox from '../checkbox'

import {
  CounterProvider,
  useCounter,
  useCounterChanged,
  CounterChangedProvider,
  increment,
  decrement,
} from './06/context-counter'

function Counter() {
  const [state, dispatch] = useCounter()
  const [stateCounterchanged, dispatchCounterChanged] = useCounterChanged()

  return (
    <div>
      <div>Compteur : {state.count}</div>
      <div>Compteur change : {stateCounterchanged.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatchCounterChanged)}>+</button>
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
