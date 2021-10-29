import * as React from 'react'
import './checkbox.css'

function CheckBox({checked, onChange}) {
  return (
    <div className="demo">
      <div className="demo__content">
        <label className="switcher">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <div className="switcher__indicator"></div>
          <span></span>
        </label>
      </div>
    </div>
  )
}

export default CheckBox
