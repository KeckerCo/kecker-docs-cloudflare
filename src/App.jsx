import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DocPage from './components/DocPage'
import './App.css'

function DocRoute() {
  const { slug } = useParams()
  return <DocPage slug={slug} />
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<DocPage slug="home" />} />
            <Route path="/:slug" element={<DocRoute />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
