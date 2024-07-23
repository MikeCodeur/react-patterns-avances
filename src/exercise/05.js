"use client"
// Props Control
// http://localhost:3000/alone/exercise/05.js

import * as React from 'react'
import CheckBox from '../checkbox'

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
  // 🐶 ajoute un prop `onChange` .
  // 🐶 ajoute un prop `checked`
  // 🤖 tu peux crée un alias  `controlledChecked` pour eviter le "variable shadowing."
  //
  //  onChange,
  //  checked: controlledChecked
} = {}) {
  const initialState = {checked: initialChecked}
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // 🐶 créé une variable 'checkedIsControlled' qui permet de savoir si 'checked' est controllé
  // 🤖 const checkedIsControlled = controlledChecked != null

  // 🐶 modifie la ligne suivante pour mettre à jour la valeur de 'checked' à 'controlledChecked'
  // si 'checkedIsControlled' est à true sinon à 'state.checked'
  // cele nous permet soit d'utiliser le state soit le prop
  const {checked} = state

  // 🐶 nous voulons maintenant appeler `onChange` à chaque fois que l'on doit changer le state
  // et dispatch que si 'checked' est non controllé.
  // pour cela on va creer une fonction intermediaire 'dispatchWithOnChange' qui gérera ce cas.
  // 🤖
  // function dispatchWithOnChange(action) {
  //   if (!checkedIsControlled) {
  //     dispatch(action)
  //   }
  //   // équivalent à `onChange(state, action)`
  //   onChange?.(reducer({...state, checked}, action), action)
  // }

  // 🐶 Dans les ligne suivante utilise 'dispatchWithOnChange' au lieu de 'dispatch'
  const tick = () => dispatch({type: actionTypes.tick})
  const reset = () => dispatch({type: actionTypes.reset, initialState})

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

function SuperCheckBox({checked: controlledChecked, onChange}) {
  const {checked, getCheckboxerProps} = useCheckBox({
    checked: controlledChecked,
    onChange,
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
        <div data-testid="change-count">
          Nombre de changement: {timesChanged}
        </div>
      ) : null}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Checkbox non controllé:</div>
        <SuperCheckBox
          onChange={(...args) =>
            console.info('Uncontrolled CheckBox onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default App
