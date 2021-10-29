// Composants composés avec Context
// 🚀 Validation du Hook Provider
// http://localhost:3000/alone/final/02.bonus-1.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import '../tab.css'

const TabsContext = React.createContext()
TabsContext.displayName = 'TabsContext'

function Tabs({children, ...props}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)

  return (
    <TabsContext.Provider value={{selectedTabId, selectTab}}>
      <div className="tabs" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("useTabs s'utilise dans un <Tabs /> ")
  }
  return context
}

function TabList({children, ...props}) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      tabId: tabId,
      ...props,
    }),
  )
  return (
    <div className="tab" {...props}>
      {clones}
    </div>
  )
}

function Tab({tabId, children}) {
  const {selectedTabId, selectTab} = useTabs()
  return (
    <button
      key={children}
      className={selectedTabId === tabId ? 'tablinks active' : 'tablinks'}
      onClick={e => selectTab(tabId)}
    >
      {children}
    </button>
  )
}

function TabPanels({children}) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      className: 'tabcontent',
      panelId,
    }),
  )
}

function Panel({panelId, children, ...props}) {
  const {selectedTabId} = useTabs()
  return selectedTabId === panelId ? <div {...props}>{children}</div> : null
}

const App = () => <Panel />
function _App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Londre</Tab>
        <Tab>Paris</Tab>
        <Tab>Tokyo</Tab>
        <Tab>ss</Tab>
      </TabList>
      <TabPanels>
        <Panel>💷 Inscription pour aller à Londre</Panel>
        <Panel>🥖 Inscription pour aller à Paris</Panel>
        <Panel>🗻 Inscription pour aller à Tokyo</Panel>
      </TabPanels>
      <small> * Ceci est un autre composant</small>
    </Tabs>
  )
}

export default App
