"use client"
// Props Control
// 🚀 Hooks personnalisés Warning
// http://localhost:3000/alone/final/05.bonus-3.js

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

function useControlledCheckBoxWarning(
  controlPropValue,
  controlPropName,
  componentName,
) {
  const isControlled = controlPropValue != null
  const {current: previousIsControlledMode} = React.useRef(isControlled)

  React.useEffect(() => {
    warning(
      !(!previousIsControlledMode && isControlled),
      `\`useCheckBox\` passe d'un mode non-controllé à un mode controllé.  Décider d'un mode controllé ou non pour \`${componentName}\``,
    )
    warning(
      !(previousIsControlledMode && !isControlled),
      `\`useCheckBox\` passe d'un mode controllé à un mode non-controllé.  Décider d'un mode controllé ou non pour \`${componentName}\``,
    )
  }, [componentName, controlPropName, isControlled, previousIsControlledMode])
}

function useOnChangeWarning(
  controlPropValue,
  controlPropName,
  componentName,
  hasOnChange,
  onChangeProp,
) {
  const isControlled = controlPropValue != null
  React.useEffect(() => {
    warning(
      !(!hasOnChange && isControlled),
      `Un prop \`checked\` est passé à useCheckBox sans \`onChange\` . Cela rendra la checkbox en lecture seule. Si vous voulez le rendre modifiable, ajouter \`onChange\``,
    )
  }, [componentName, controlPropName, isControlled, hasOnChange, onChangeProp])
}

function useCheckBox({
  initialChecked = false,
  reducer = defaultCheckboxReducer,
  onChange,
  checked: controlledChecked,
} = {}) {
  const {current: initialState} = React.useRef({checked: initialChecked})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const checkedIsControlled = controlledChecked != null
  const checked = checkedIsControlled ? controlledChecked : state.checked
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControlledCheckBoxWarning(controlledChecked, 'checked', 'useCheckBox')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnChangeWarning(
      controlledChecked,
      'checked',
      'useCheckBox',
      Boolean(onChange),
      'onChange',
    )
  }

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
  const [allchecked, setAllchecked] = React.useState(false)
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
