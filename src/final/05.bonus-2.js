"use client"
// Props Control
// 🚀 Warning controllé / non controllé
// http://localhost:3000/alone/final/05.bonus-2.js

import * as React from 'react'
import CheckBox from '../checkbox'
import warning from 'warning'

const executeAll =
  (...functions) =>
  (...args) =>
    functions.forEach(func => func?.(...args))

const actionTypes = {
  tick: 'tick',
  reset: 'reset',
}

function defaultCheckboxReducer(state, action) {
  switch (action.type) {
    case actionTypes.tick: {
      return {checked: !state.checked}
    }
    case actionTypes.reset: {
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
  onChange,
  checked: controlledChecked,
} = {}) {
  const initialState = {checked: initialChecked}
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const checkedIsControlled = controlledChecked != null
  const checked = checkedIsControlled ? controlledChecked : state.checked

  const {current: previousIsControlledMode} = React.useRef(checkedIsControlled)

  React.useEffect(() => {
    warning(
      !(!previousIsControlledMode && checkedIsControlled),
      `\`useCheckBox\` passe d'un mode non-controllé à un mode controllé. Décider d'un mode controllé ou non pour \`useCheckBox\``,
    )
    warning(
      !(previousIsControlledMode && !checkedIsControlled),
      `\`useCheckBox\` passe d'un mode controllé à un mode non-controllé. Décider d'un mode controllé ou non \`useCheckBox\` `,
    )
  }, [checkedIsControlled, previousIsControlledMode])

  const hasOnChange = typeof onChange != 'undefined'
  React.useEffect(() => {
    warning(
      !(!hasOnChange && checkedIsControlled),
      `Un prop \`checked\` est passé à useCheckBox sans \`onChange\` . Cela rendra la checkbox en lecture seule. Si vous voulez le rendre modifiable, ajouter \`onChange\``,
    )
  }, [hasOnChange, checkedIsControlled])

  function dispatchWithOnChange(action) {
    if (!checkedIsControlled) {
      dispatch(action)
    }
    onChange?.(reducer({...state, checked}, action), action)
  }

  const tick = () => dispatchWithOnChange({type: actionTypes.tick})
  const reset = () =>
    dispatchWithOnChange({type: actionTypes.reset, initialState})

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

function SuperCheckBox({checked: controlledChecked, onChange, readOnly}) {
  const {checked, getCheckboxerProps} = useCheckBox({
    checked: controlledChecked,
    onChange,
    readOnly,
  })
  const props = getCheckboxerProps({checked})
  return <CheckBox {...props} />
}

function App() {
  const [allchecked, setAllchecked] = React.useState(/*false*/)
  const [timesChanged, setTimesChanged] = React.useState(0)
  const changedTooMuch = timesChanged >= 4

  function handlecheckboxChange(state, action) {
    if (action.type === actionTypes.tick && changedTooMuch) {
      return
    }
    setAllchecked(state.checked)
    setTimesChanged(timesChanged => timesChanged + 1)
  }

  function handleResetClick() {
    setAllchecked(false)
    setTimesChanged(0)
  }
  return (
    <div>
      <SuperCheckBox checked={allchecked} onChange={handlecheckboxChange} />
      <SuperCheckBox checked={allchecked} onChange={handlecheckboxChange} />
      <SuperCheckBox checked={allchecked} onChange={handlecheckboxChange} />

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
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Checkbox non controllé :</div>
        <SuperCheckBox
        /* onChange={(...args) =>
            console.info('Uncontrolled CheckBox onChange', ...args)
          }*/
        />
      </div>
    </div>
  )
}

export default App
