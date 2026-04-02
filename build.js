import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'
import { siteConfig } from './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Configure marked
marked.setOptions({ gfm: true, breaks: false })

function preprocessMarkdown(md) {
  return md
    .replace(/:::info\n([\s\S]*?):::/g, (_, body) =>
      `<div class="callout callout--info">${marked.parse(body.trim())}</div>`)
    .replace(/:::warning\n([\s\S]*?):::/g, (_, body) =>
      `<div class="callout callout--warning">${marked.parse(body.trim())}</div>`)
    .replace(/:::tip\n([\s\S]*?):::/g, (_, body) =>
      `<div class="callout callout--tip">${marked.parse(body.trim())}</div>`)
}

function renderSidebar(activeSlug) {
  const groups = siteConfig.navigation.map(group => {
    const links = group.pages.map(page => {
      const href = page.slug === 'home' ? '/index.html' : `/${page.slug}.html`
      const isActive = page.slug === activeSlug
      return `<li><a href="${href}" class="sidebar-link${isActive ? ' sidebar-link--active' : ''}">${page.title}</a></li>`
    }).join('\n')
    return `
      <div class="sidebar-group">
        <div class="sidebar-group-title">${group.group}</div>
        <ul class="sidebar-group-pages">${links}</ul>
      </div>`
  }).join('\n')

  return `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <a href="/index.html" class="sidebar-logo-link">${siteConfig.name}</a>
      </div>
      <nav class="sidebar-nav">${groups}</nav>
      <div class="sidebar-footer">
        <a href="${siteConfig.footerSocials.github}" target="_blank" rel="noopener noreferrer" class="sidebar-social" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="${siteConfig.footerSocials.x}" target="_blank" rel="noopener noreferrer" class="sidebar-social" aria-label="X / Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </aside>`
}

function renderTopBar() {
  const links = siteConfig.topbarLinks.map(l =>
    `<a href="${l.url}" class="topbar-link">${l.name}</a>`
  ).join('')
  return `
    <header class="topbar">
      <button class="topbar-menu-btn" onclick="toggleSidebar()" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <a href="/index.html" class="topbar-logo-mobile">${siteConfig.name}</a>
      <div class="topbar-actions">${links}</div>
    </header>`
}

function getCSS() {
  return `
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; height: 100%; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #fff;
      color: #1f2937;
      -webkit-font-smoothing: antialiased;
    }
    ::selection { background: #f5c0c8; color: #971B2F; }

    /* Layout */
    .layout { display: flex; min-height: 100vh; }
    .main { margin-left: 260px; flex: 1; min-height: 100vh; background: #fff; }
    .content-wrap { padding-top: 56px; }

    /* Sidebar */
    .sidebar {
      width: 260px; height: 100vh; position: fixed; top: 0; left: 0;
      background: #fafafa; border-right: 1px solid #e5e7eb;
      display: flex; flex-direction: column; overflow-y: auto; z-index: 100;
      transition: transform 0.3s ease;
    }
    .sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid #e5e7eb; }
    .sidebar-logo-link {
      text-decoration: none; font-family: 'Cardo', serif;
      font-size: 1.4rem; font-weight: 700; color: #971B2F; letter-spacing: -0.02em;
    }
    .sidebar-nav { flex: 1; padding: 16px 12px; }
    .sidebar-group { margin-bottom: 24px; }
    .sidebar-group-title {
      font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: #9ca3af; padding: 0 8px; margin-bottom: 6px;
    }
    .sidebar-group-pages { list-style: none; margin: 0; padding: 0; }
    .sidebar-link {
      display: block; padding: 6px 10px; border-radius: 6px;
      font-size: 0.875rem; color: #374151; text-decoration: none;
      transition: background 0.15s, color 0.15s; margin-bottom: 2px;
    }
    .sidebar-link:hover { background: #f3e8ea; color: #971B2F; }
    .sidebar-link--active { background: #fce8eb; color: #971B2F; font-weight: 500; }
    .sidebar-footer { padding: 16px 20px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; }
    .sidebar-social { color: #9ca3af; transition: color 0.15s; }
    .sidebar-social:hover { color: #971B2F; }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.3); z-index: 99;
    }

    /* Topbar */
    .topbar {
      position: fixed; top: 0; left: 260px; right: 0; height: 56px;
      background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid #e5e7eb;
      display: flex; align-items: center; padding: 0 24px; z-index: 50; gap: 12px;
    }
    .topbar-menu-btn {
      display: none; background: none; border: none; cursor: pointer;
      color: #374151; padding: 4px; border-radius: 6px;
    }
    .topbar-menu-btn:hover { background: #f3f4f6; }
    .topbar-logo-mobile {
      display: none; text-decoration: none; font-family: 'Cardo', serif;
      font-size: 1.2rem; font-weight: 700; color: #971B2F;
    }
    .topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 16px; }
    .topbar-link {
      font-size: 0.875rem; color: #374151; text-decoration: none;
      padding: 6px 12px; border-radius: 6px; transition: background 0.15s, color 0.15s;
    }
    .topbar-link:hover { color: #971B2F; background: #fce8eb; }

    /* Doc content */
    .doc-content {
      max-width: 720px; padding: 40px 48px 80px;
      font-family: 'Cardo', serif; font-size: 1.05rem; line-height: 1.8; color: #1f2937;
    }
    .doc-content h1 {
      font-family: 'Cardo', serif; font-size: 2.2rem; font-weight: 700;
      color: #111827; margin: 0 0 8px; line-height: 1.2; letter-spacing: -0.02em;
    }
    .doc-content h2 {
      font-family: 'Cardo', serif; font-size: 1.5rem; font-weight: 700;
      color: #111827; margin: 40px 0 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;
    }
    .doc-content h3 {
      font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600;
      color: #374151; margin: 28px 0 8px;
    }
    .doc-content p { margin: 0 0 16px; }
    .doc-content ul, .doc-content ol { margin: 0 0 16px; padding-left: 24px; }
    .doc-content li { margin-bottom: 6px; }
    .doc-content a {
      color: #971B2F; text-decoration: none;
      border-bottom: 1px solid #f5c0c8; transition: border-color 0.15s, color 0.15s;
    }
    .doc-content a:hover { color: #D54E6B; border-bottom-color: #D54E6B; }
    .doc-content code {
      background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px;
      padding: 1px 6px; font-family: 'Courier New', monospace; font-size: 0.875em; color: #971B2F;
    }
    .doc-content pre {
      background: #1f2937; border-radius: 8px; padding: 20px 24px;
      overflow-x: auto; margin: 20px 0;
    }
    .doc-content pre code {
      background: none; border: none; padding: 0;
      font-size: 0.875rem; color: #e5e7eb; line-height: 1.6;
    }
    .doc-content blockquote {
      border-left: 4px solid #971B2F; margin: 20px 0; padding: 12px 20px;
      background: #fce8eb; border-radius: 0 8px 8px 0; color: #374151; font-style: italic;
    }
    .doc-content table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem; }
    .doc-content th {
      background: #f9fafb; border: 1px solid #e5e7eb;
      padding: 10px 14px; text-align: left; font-weight: 600; color: #374151;
    }
    .doc-content td { border: 1px solid #e5e7eb; padding: 10px 14px; color: #4b5563; }
    .doc-content tr:hover td { background: #f9fafb; }

    /* Callouts */
    .callout { border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-size: 0.9rem; line-height: 1.6; }
    .callout p { margin: 0; }
    .callout--info { background: #fce8eb; border: 1px solid #f5c0c8; border-left: 4px solid #971B2F; color: #6b1020; }
    .callout--warning { background: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; color: #92400e; }
    .callout--tip { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #22c55e; color: #14532d; }

    /* Mobile */
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar--open { transform: translateX(0); }
      .sidebar-overlay { display: block; }
      .main { margin-left: 0; }
      .topbar { left: 0; }
      .topbar-menu-btn { display: flex; }
      .topbar-logo-mobile { display: block; flex: 1; }
      .doc-content { padding: 24px 20px 60px; font-size: 1rem; }
      .doc-content h1 { font-size: 1.8rem; }
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
  `
}

function getJS() {
  return `
    function toggleSidebar() {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      sidebar.classList.toggle('sidebar--open');
      overlay.style.display = sidebar.classList.contains('sidebar--open') ? 'block' : 'none';
    }
    document.querySelector('.sidebar-overlay')?.addEventListener('click', function() {
      document.querySelector('.sidebar').classList.remove('sidebar--open');
      this.style.display = 'none';
    });
  `
}

function renderPage({ slug, title, contentHtml }) {
  const sidebar = renderSidebar(slug)
  const topbar = renderTopBar()
  const css = getCSS()
  const js = getJS()

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — ${siteConfig.name}</title>
  <meta name="description" content="${siteConfig.description}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>${css}</style>
</head>
<body>
  <div class="sidebar-overlay"></div>
  <div class="layout">
    ${sidebar}
    <div class="main">
      ${topbar}
      <div class="content-wrap">
        <article class="doc-content">
          ${contentHtml}
        </article>
      </div>
    </div>
  </div>
  <script>${js}</script>
</body>
</html>`
}

// Build
mkdirSync(join(__dirname, 'dist'), { recursive: true })

// Copy favicon
if (existsSync(join(__dirname, 'public', 'favicon.svg'))) {
  copyFileSync(join(__dirname, 'public', 'favicon.svg'), join(__dirname, 'dist', 'favicon.svg'))
}


let pagesBuilt = 0
for (const group of siteConfig.navigation) {
  for (const page of group.pages) {
    const mdPath = join(__dirname, 'content', page.file)
    const raw = readFileSync(mdPath, 'utf8')
    const preprocessed = preprocessMarkdown(raw)
    const contentHtml = marked.parse(preprocessed)

    const html = renderPage({
      slug: page.slug,
      title: page.title,
      contentHtml,
    })

    const outFile = page.slug === 'home'
      ? join(__dirname, 'dist', 'index.html')
      : join(__dirname, 'dist', `${page.slug}.html`)

    writeFileSync(outFile, html)
    console.log(`✓ Built: ${outFile}`)
    pagesBuilt++
  }
}

console.log(`\n✅ Built ${pagesBuilt} pages to dist/`)
