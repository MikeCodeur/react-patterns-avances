import * as React from 'react'
import './tab.css'

function Tabs({selected = 0, onChange, tabs}) {
  return (
    <div className="tabs">
      <div className="tab">
        {tabs.map((item, id) => {
          return (
            <button key={id}
              className={selected === id ? 'tablinks active' : 'tablinks'}
              onClick={e => onChange(id)}
            >
              {item.title}
            </button>
          )
        })}
      </div>
      <div className="tabcontent">
        <h3>{tabs[selected].display}</h3>
        <p>{tabs[selected].display}</p>
      </div>
    </div>
  )
}

export default Tabs
