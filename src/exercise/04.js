// Composants composés avec Context
// http://localhost:3000/alone/exercise/02.js

import * as React from 'react'
import CheckBox from '../checkbox'

function useCheckBox() {
  const [checked, setChecked] = React.useState(false)
  const tick = () => setChecked(!checked)

  // 🐶 Ajoute la propriété  'checkboxProps' en retour.
  // avec le  role:'checkbox','aria-checked': checked, onClick,onChange
  return {
    checked,
    tick,
  }
}

function App() {
  const {checked, checkboxProps} = useCheckBox()
  return (
    <div>
      <CheckBox checked={checked}  {...checkboxProps} />
      <br />
      <button aria-label="checkbox-personnalise" {...checkboxProps}>
        {checked ? '✔️' : '❌'}
      </button>
    </div>
  )
}

export default App