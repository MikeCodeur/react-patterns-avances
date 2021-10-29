import * as React from 'react'
import './checkbox.css'

function CheckBox({checked, onChange, ...props}) {
  const {onClick, ...rest} = props
  return (
    <div className="demo" {...rest}>
      <div className="demo__content">
        <label className="switcher">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <div className="switcher__indicator"></div>
          <span></span>
        </label>
      </div>
    </div>
  )
}

export default CheckBox
