"use client"
// Styling
// 🚀 Creation d'un composant personalisé
// http://localhost:3000/alone/final/01.bonus-1.js

import * as React from 'react'
import {default as TabsComponent} from '../tab'

function CompoundComponentParent({children}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)
  return React.Children.map(children, child =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
    }),
  )
}

function London({selectedTabId, children}) {
  return selectedTabId === 0 ? <div>{children}</div> : null
}

function Paris({selectedTabId, children}) {
  return selectedTabId === 1 ? <div>{children}</div> : null
}

function Tokyo({selectedTabId, children}) {
  return selectedTabId === 2 ? <div>{children}</div> : null
}

function Tabs({selectedTabId, selectTab, tabs}) {
  return (
    <TabsComponent selected={selectedTabId} onChange={selectTab} tabs={tabs} />
  )
}

function App() {
  const options = [
    {title: 'London', display: 'London is the capital city of England.'},
    {title: 'Paris', display: 'Paris is the capital of France.'},
    {title: 'Tokyo', display: 'Tokyo is the capital of Japan.'},
  ]
  return (
    <CompoundComponentParent>
      <Tabs tabs={options} />

      <London>💷 Inscription pour aller à Londre</London>
      <Paris>🥖 Inscription pour aller à Paris</Paris>
      <Tokyo>🗻 Inscription pour aller à Tokyo</Tokyo>
    </CompoundComponentParent>
  )
}

export default App
