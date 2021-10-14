// Staate reducer
// http://localhost:3000/alone/exercise/02.js

import * as React from 'react'
import CheckBox from '../checkbox'

const executeAll = (...functions) => (...args) => functions.forEach(func => func?.(...args))

function defaultCheckboxReducer(state, action) {
  switch (action.type) {
    case 'tick': {
      return {checked: !state.checked}
    }
    case 'reset': {
      return action.initialState
    }
    default: {
      throw new Error(`Action non supporté: ${action.type}`)
    }
  }
}

// 🐶 ajoute un paramètre 'reducer' initialisé par defaut à 'defaultCheckboxReducer'
// 🤖 {initialChecked = false, reducer = defaultCheckboxReducer} = {}
function useCheckBox({initialChecked = false} = {}) {
  const {current: initialState} = React.useRef({checked: initialChecked})
  
  // 🐶 A la place d'utiliser 'defaultCheckboxReducer' utilise 'reducer' passé en paramètre.
  const [state, dispatch] = React.useReducer(defaultCheckboxReducer, initialState)
  const {checked} = state

  const tick = () => dispatch({type: 'tick'})
  const reset = () => dispatch({type: 'reset', initialState})

  const getCheckboxerProps = ({onClick, ...props} = {}) =>{
    return {
      'aria-checked': checked,
      onChange: executeAll(onClick, tick),
      ...props,
    }
  }

  const getResetterProps = ({onClick, ...props} = {}) => {
    return {
      onClick: executeAll(onClick, reset),
      ...props,
    }
  }

  return {
    checked,
    reset,
    tick,
    getCheckboxerProps,
    getResetterProps,
  }
}

function App() {
  const [timesChanged, setTimesChanged] = React.useState(0)
  const changedTooMuch = timesChanged >= 4

  // 🐶 dans ce reducer personnalisé, implémente la logique propre à la checkbox de App
  function customCheckboxStateReducer(state, action) {
    switch (action.type) {
      case 'tick': {
        // 🤖 implémente l'arret du changement d'état avec :
        //
        // if (timesChanged <= 5) {
        //   return {checked: state.checked}
        // }
        return {checked: !state.checked}
      }
      case 'reset': {
        return {checked: false}
      }
      default: {
        throw new Error(`Action non supporté: ${action.type}`)
      }
    }
  }

  const {checked, getCheckboxerProps, getResetterProps} = useCheckBox({
    reducer: customCheckboxStateReducer,
  })

  return (
    <div>
      <CheckBox
        {...getCheckboxerProps({
          disabled: changedTooMuch,
          checked: checked,
          onClick: () => setTimesChanged(count => count + 1),
        })}
      />
      {changedTooMuch ? (
        <div data-testid="notice">
          Tu as changer trop de fois !
          <br />
        </div>
      ) : timesChanged > 0 ? (
        <div data-testid="click-count">Click count: {timesChanged}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesChanged(0)})}>
        Reset
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
