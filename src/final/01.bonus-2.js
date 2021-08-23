// Compound Components 
// 🚀 Creation d'un composant personalisé
// http://localhost:3000/alone/final/01.bonus-1.js

import * as React from 'react'
import '../tab.css'

function Tabs({children, ...props}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)
  const clones = React.Children.map(children, child =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
      ...props,
    }),
  )
  return <div className="tabs" {...props}>{clones}</div>
}

function TabList({children, selectedTabId, selectTab, ...props}) {
  const clones = React.Children.map(children, (child, panelId) => {
    return typeof child.type === 'string'
      ? child
      : React.cloneElement(child, {
          selectedTabId: selectedTabId,
          selectTab: selectTab,
          panelId,
          ...props
        })
  })
  return <div className="tab" {...props}>{clones}</div>
}

function Tab({selectedTabId, selectTab, panelId, children}) {
  return (
    <button
      key={children}
      className={selectedTabId === panelId ? 'tablinks active' : 'tablinks'}
      onClick={e => selectTab(panelId)}
    >
      {children}
    </button>
  )
}

function TabPanels({selectedTabId, children}) {
  return React.Children.map(children, (child, panelId) => {
    return typeof child.type === 'string'
      ? child
      : React.cloneElement(child, {
          selectedTabId: selectedTabId,
          className:"tabcontent",
          panelId,
        })
  })
}

function Panel({selectedTabId, panelId, children, ...props}) {
  return selectedTabId === panelId ? <div {...props}>{children}</div> : null
}

function App() {
  return (
      <Tabs>
        <TabList>
          <Tab>Londre</Tab>
          <Tab>Paris</Tab>
          <Tab>Tokyo</Tab>
        </TabList>
        <TabPanels>
          <Panel>💷 Inscription pour aller à Londre</Panel>
          <Panel>🥖 Inscription pour aller à Paris</Panel>
          <Panel>🗻 Inscription pour aller à Tokyo</Panel>
        </TabPanels>
      </Tabs>
  )
}

export default App
