import type { Meta, StoryObj } from '@storybook/html';
import { color } from '../design-system';

const meta: Meta = {
  title: 'Design System/Colors',
};
export default meta;

type Story = StoryObj;

function renderSwatch(name: string, value: string): string {
  return `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;">
      <div style="
        width:3rem;height:3rem;border-radius:6px;
        background:${value};
        border:1px solid rgba(0,0,0,0.08);
        flex-shrink:0;
      "></div>
      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.875rem;font-weight:600;color:#111;margin-bottom:0.2rem;">${name}</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.8125rem;color:#666;">${value}</div>
      </div>
    </div>
  `;
}

export const Palette: Story = {
  render: () => `
    <div style="padding:2rem;max-width:500px;">
      <h2 style="font-family:'EB Garamond',Georgia,serif;font-size:1.5rem;font-weight:400;margin:0 0 1.5rem;color:#111;">Color Tokens</h2>
      ${Object.entries(color).map(([name, value]) => renderSwatch(name, value)).join('')}
    </div>
  `,
};
