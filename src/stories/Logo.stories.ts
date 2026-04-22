import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Design System/Logo',
};
export default meta;

type Story = StoryObj;

const MARK_SVG = `
  <svg viewBox="0 0 40 44" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Kecker mark">
    <rect x="3" y="3" width="5" height="38"/>
    <polygon points="8,14 8,17 33,3 27,3"/>
    <polygon points="8,18.5 8,21.5 27,41 33,41"/>
  </svg>
`;

export const LogoMark: Story = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:2rem;padding:2rem;">
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">On light background (currentColor → #111)</p>
        <div style="background:#faf9f7;padding:1.5rem;border:1px solid #e0dbd5;border-radius:6px;display:inline-flex;gap:1.5rem;align-items:flex-end;">
          <div style="color:#111;width:64px;">${MARK_SVG}</div>
          <div style="color:#111;width:40px;">${MARK_SVG}</div>
          <div style="color:#111;width:24px;">${MARK_SVG}</div>
          <div style="color:#111;width:18px;">${MARK_SVG}</div>
          <div style="color:#111;width:12px;">${MARK_SVG}</div>
        </div>
      </div>
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">Crimson accent</p>
        <div style="background:#faf9f7;padding:1.5rem;border:1px solid #e0dbd5;border-radius:6px;display:inline-flex;">
          <div style="color:#971b2f;width:64px;">${MARK_SVG}</div>
        </div>
      </div>
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">On dark background</p>
        <div style="background:#111111;padding:1.5rem;border-radius:6px;display:inline-flex;gap:1.5rem;align-items:flex-end;">
          <div style="color:#faf9f7;width:64px;">${MARK_SVG}</div>
          <div style="color:#faf9f7;width:40px;">${MARK_SVG}</div>
          <div style="color:#faf9f7;width:24px;">${MARK_SVG}</div>
        </div>
      </div>
    </div>
  `,
};

export const Wordmark: Story = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:2rem;padding:2rem;">
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">Standard — nav usage at 1.35rem</p>
        <div style="background:#faf9f7;padding:1.5rem;border:1px solid #e0dbd5;border-radius:6px;display:inline-flex;align-items:center;gap:0.5rem;">
          <div style="color:#111;width:18px;">${MARK_SVG}</div>
          <span style="font-family:'EB Garamond',Georgia,serif;font-size:1.35rem;font-weight:400;color:#111;letter-spacing:-0.01em;line-height:1;">Kecker</span>
        </div>
      </div>
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">Large — marketing usage</p>
        <div style="background:#faf9f7;padding:2rem;border:1px solid #e0dbd5;border-radius:6px;display:inline-flex;align-items:center;gap:0.75rem;">
          <div style="color:#111;width:36px;">${MARK_SVG}</div>
          <span style="font-family:'EB Garamond',Georgia,serif;font-size:2.5rem;font-weight:400;color:#111;letter-spacing:-0.01em;line-height:1;">Kecker</span>
        </div>
      </div>
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin:0 0 0.75rem;">On crimson</p>
        <div style="background:#971b2f;padding:1.5rem;border-radius:6px;display:inline-flex;align-items:center;gap:0.5rem;">
          <div style="color:#fff;width:18px;">${MARK_SVG}</div>
          <span style="font-family:'EB Garamond',Georgia,serif;font-size:1.35rem;font-weight:400;color:#fff;letter-spacing:-0.01em;line-height:1;">Kecker</span>
        </div>
      </div>
    </div>
  `,
};

export const DoAndDont: Story = {
  name: 'Do & Don\'t',
  render: () => `
    <div style="padding:2rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;max-width:700px;">
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;font-weight:600;color:#2a7a2a;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 1rem;">✓ Do</p>
        <ul style="font-family:'Inter',sans-serif;font-size:0.875rem;color:#2a2a2a;line-height:1.7;padding-left:1.25rem;">
          <li>Use on backgrounds with sufficient contrast</li>
          <li>Maintain proportions (never stretch)</li>
          <li>Use mark-only below 80px wordmark width</li>
          <li>Use white variant on dark/crimson backgrounds</li>
        </ul>
      </div>
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:0.75rem;font-weight:600;color:#971b2f;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 1rem;">✗ Don't</p>
        <ul style="font-family:'Inter',sans-serif;font-size:0.875rem;color:#2a2a2a;line-height:1.7;padding-left:1.25rem;">
          <li>Rotate or skew the mark</li>
          <li>Apply drop shadows or gradients</li>
          <li>Use the crimson mark on a crimson background</li>
          <li>Place mark below 16px (use text only)</li>
        </ul>
      </div>
    </div>
  `,
};
