import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WardrobeCam from './components/WardrobeCam'
import PropertiesMenu from './components/PropertiesMenu'
function App() {

  return (
    <>
    <div class="PropertiesMenu">
    <PropertiesMenu />
    </div>
    <div>
    <WardrobeCam />
    </div>
    </>
    
  )
}
export default App
