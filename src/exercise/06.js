// Context Module Functions
// http://localhost:3000/alone/exercise/06.js

import * as React from 'react'
import CheckBox from '../checkbox'

// 🐶 Note : Le module commun  './06/context-counter' exporte 'context-counter-changed.js' et 'context-counter-general.js'
import {CounterProvider, useCounter} from './06/context-counter'

function Counter() {
  const [state, dispatch] = useCounter()
  // ⛏️ Déplace et adapte les fonctions 'increment' et 'decrement' dans '06/context-counter.js'
  // Pense ensuite à les réimporter pour pourvoir les utiliser 
  const increment = () => dispatch({type: 'increment'})
  const decrement = () => dispatch({type: 'decrement'})
  return (
    <div>
      <div>Compteur : {state.count}</div>
      {/* 🐶 utilise les fonction 'increment' et 'decrement' importé avec comme paramètre 'dipatch'  */}
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}

function TwoCheckbox() {
  const [, dispatch] = useCounter()
  // ⛏️ supprime 'increment' car on l'utilise la fonction importé
  const increment = () => dispatch({type: 'increment'})
  const decrement = () => dispatch({type: 'decrement'})
  return (
    <div>
      {/* 🐶 utilise les fonction 'increment' importé avec comme paramètre 'dipatch'  */}
      <CheckBox onChange={increment}/>
      <CheckBox onChange={decrement}/>
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <Counter />
      <TwoCheckbox />
    </CounterProvider>
  )
}

export default App
