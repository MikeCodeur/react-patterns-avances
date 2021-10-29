// Composants composés
// 🚀 Tabs composant composés
// http://localhost:3000/alone/exercise/01.bonus-1.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import {default as TabsComponent} from '../tab'

const options = [
  {title: 'London', display: 'London is the capital city of England.'},
  {title: 'Paris', display: 'Paris is the capital of France.'},
  {title: 'Tokyo', display: 'Tokyo is the capital of Japan.'},
]

// 🐶 Même exercice que précédent mais avec un composant Tab
function CompoundComponentParent({children}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)

  // 🐶 remplace <TabsComponent> en clonant tous les enfants (children)
  // Pour parcourir tous les children utilise `React.Children.map`
  // Pour cloner utilise `React.cloneElement`
  // lors du clone passe les props 'selectedTabId' et 'selectTab'
  // 🤖
  // return React.Children.map(children, child =>
  // React.cloneElement(child, {
  //   selectedTabId: selectedTabId,
  //   selectTab: selectTab,
  // }),
  // 📑 https://fr.reactjs.org/docs/react-api.html#reactchildren
  // 📑 https://fr.reactjs.org/docs/react-api.html#cloneelement
  return (
    <TabsComponent
      selected={selectedTabId}
      onChange={selectTab}
      tabs={options}
    />
  )
}

// 🐶 Accepte les props 'selectedTabId' et'children' pour les 3 composants London,Paris,Tokyo

function London({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Londre'
  // 🤖 selectedTabId === 0
  return null
}

function Paris({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Paris'
  return null
}

function Tokyo({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Tokyo'
  return null
}

// 🐶 Accepte les props 'selectedTabId' 'selectTab' 'tabs' et '...props'
function Tabs({selectedTabId, selectTab, tabs}) {
  // 🐶 utilise <TabsComponent> avec ces 3 'props'
}
function App() {
  return (
    <CompoundComponentParent>
      {/* <Tabs tabs={options} />  */}

      {/* 
      <London>💷 Inscription pour aller à Londre</London>
      <Paris>🥖 Inscription pour aller à Paris</Paris>
      <Tokyo>🗻 Inscription pour aller à Tokyo</Tokyo> 
      */}
    </CompoundComponentParent>
  )
}

export default App
