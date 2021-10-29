// Composants composés avec Context
// http://localhost:3000/alone/final/02.js

import * as React from 'react'
import CheckBox from '../checkbox'

function useCheckBox() {
  const [checked, setChecked] = React.useState(false)
  const tick = () => setChecked(!checked)

  return {
    checked,
    tick,
    checkboxProps: {
      role: 'checkbox',
      'aria-checked': checked,
      onClick: tick,
      onChange: tick,
    },
  }
}

function App() {
  const {checked, checkboxProps} = useCheckBox()
  return (
    <div>
      <CheckBox checked={checked} {...checkboxProps} />
      <br />
      <button aria-label="checkbox-personnalise" {...checkboxProps}>
        {checked ? '✔️' : '❌'}
      </button>
    </div>
  )
}

export default App
