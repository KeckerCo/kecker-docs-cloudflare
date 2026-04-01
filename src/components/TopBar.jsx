import React from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../config'
import './TopBar.css'

export default function TopBar({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div className="topbar-logo-mobile">
        <Link to="/">
          <span>{siteConfig.name}</span>
        </Link>
      </div>

      <div className="topbar-actions">
        {siteConfig.topbarLinks.map((link) => (
          <a key={link.name} href={link.url} className="topbar-link">
            {link.name}
          </a>
        ))}
      </div>
    </header>
  )
}
