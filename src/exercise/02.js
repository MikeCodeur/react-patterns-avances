// Composants composés avec Context
// http://localhost:3000/alone/exercise/02.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import '../tab.css'

// 🐶 Créé un contexte 'TabsContext' 
// 🤖 utilise `React.createContext()`

function Tabs({children, ...props}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)

  // ⛏️ Supprime les 'clones' car nous allons passer les 'children' au context provider
  const clones = React.Children.map(children, child => {
    return typeof child.type === 'string'
      ? child
      : React.cloneElement(child, {
          selectedTabId: selectedTabId,
          selectTab: selectTab,
          ...props,
        })
  })
  // 🐶 retourne le context provider avec {selectedTabId, selectTab} comme 'value'.
  // 🤖 <TabsContext.Provider value={{selectedTabId, selectTab}}>
  return (
    // 🐶 cette div doit être dans le <TabsContext.Provider
    <div className="tabs" {...props}>
      {/* 🐶 change clone par children */}
      {clones}
    </div>
  )
}

// 🐶 Créé une hook consumer `useTabs()`
function useTabs() {return null}
// Ce hook retourne le contexte
// 🤖 React.useContext(TabsContext)

// ⛏️ Supprime les props 'selectedTabId'  'selectTab' car inutile
function TabList({children, selectedTabId, selectTab, ...props}) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      // ⛏️ Supprime les props 'selectedTabId'  'selectTab' car inutile
      selectedTabId: selectedTabId,
      selectTab: selectTab,
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

// ⛏️ Supprime les props 'selectedTabId' et 'selectTab' car on utlisera `useTabs()`
function Tab({selectedTabId, selectTab, tabId, children}) {
  // 🐶 utilise `useTabs()`
  // 🤖 const {selectedTabId, selectTab} = useTabs()
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

// ⛏️ Supprime selectedTabId
function TabPanels({selectedTabId, children}) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      // ⛏️ Supprime selectedTabId
      selectedTabId: selectedTabId,
      className: 'tabcontent',
      panelId,
    }),
  )
}
// ⛏️ Supprime selectedTabId
function Panel({selectedTabId, panelId, children, ...props}) {
  // 🐶 utilise `useTabs()` pour avoir 'selectedTabId'
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
      <small> * Ceci est un autre composant</small>
    </Tabs>
  )
}

export default App