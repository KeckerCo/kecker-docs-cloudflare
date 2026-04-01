import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation, siteConfig } from '../config'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <Link to="/" onClick={onClose}>
            <span className="sidebar-logo-text">{siteConfig.name}</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((group) => (
            <div key={group.group} className="sidebar-group">
              <div className="sidebar-group-title">{group.group}</div>
              <ul className="sidebar-group-pages">
                {group.pages.map((page) => {
                  const href = page.slug === 'home' ? '/' : `/${page.slug}`
                  const isActive =
                    page.slug === 'home'
                      ? location.pathname === '/'
                      : location.pathname === `/${page.slug}`
                  return (
                    <li key={page.slug}>
                      <Link
                        to={href}
                        className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
                        onClick={onClose}
                      >
                        {page.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href={siteConfig.footerSocials.github} target="_blank" rel="noopener noreferrer" className="sidebar-social">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href={siteConfig.footerSocials.x} target="_blank" rel="noopener noreferrer" className="sidebar-social">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </aside>
    </>
  )
}
