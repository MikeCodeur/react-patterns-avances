"use client"
// Composants composés
// http://localhost:3000/alone/final/01.js

import * as React from 'react'
import CheckBox from '../checkbox'

function CompoundComponentParent({children}) {
  const [checked, setChecked] = React.useState(false)
  const tick = () => setChecked(!checked)
  return React.Children.map(children, child =>
    React.cloneElement(child, {checked: checked, tick: tick}),
  )
}

function Accept({checked, children}) {
  return checked ? <div>{children}</div> : null
}

function Decline({checked, children}) {
  return checked ? null : <div>{children}</div>
}

function CheckBoxButton({checked, tick, ...props}) {
  return <CheckBox checked={checked} onChange={tick} {...props} />
}

function App() {
  return (
    <div>
      <CompoundComponentParent>
        <CheckBoxButton />
        <Accept>✅ J'accepte les termes du contrat</Accept>
        <Decline>❌ Je decline les termes du contrat</Decline>
      </CompoundComponentParent>
    </div>
  )
}

export default App
