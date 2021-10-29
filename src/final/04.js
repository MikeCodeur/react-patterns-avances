// Composants composés avec Context
// http://localhost:3000/alone/final/02.js

import * as React from 'react'
import CheckBox from '../checkbox'

const executeAll =
  (...functions) =>
  (...args) =>
    functions.forEach(func => func?.(...args))

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

function useCheckBox({
  initialChecked = false,
  reducer = defaultCheckboxReducer,
} = {}) {
  const {current: initialState} = React.useRef({checked: initialChecked})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {checked} = state

  const tick = () => dispatch({type: 'tick'})
  const reset = () => dispatch({type: 'reset', initialState})

  const getCheckboxerProps = ({onClick, ...props} = {}) => {
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

  function checkboxStateReducer(state, action) {
    switch (action.type) {
      case 'tick': {
        if (changedTooMuch) {
          return {checked: state.checked}
        }
        return {checked: !state.checked}
      }
      case 'reset': {
        return {checked: false}
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`)
      }
    }
  }

  const {checked, getCheckboxerProps, getResetterProps} = useCheckBox({
    reducer: checkboxStateReducer,
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
        <div data-testid="click-count">
          Nombre de changement: {timesChanged}
        </div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesChanged(0)})}>
        Reset
      </button>
    </div>
  )
}

export default App
