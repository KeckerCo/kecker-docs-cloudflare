import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Buttons',
  argTypes: {
    label: { control: 'text', defaultValue: 'Get in Touch' },
    disabled: { control: 'boolean', defaultValue: false },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: ({ label, disabled }) => `
    <div style="padding:2rem;background:#faf9f7;">
      <a href="#" class="button button-primary" ${disabled ? 'aria-disabled="true" style="pointer-events:none;opacity:0.5;"' : ''}>${label || 'Get in Touch'}</a>
    </div>
  `,
  args: { label: 'Get in Touch' },
};

export const Ghost: Story = {
  render: ({ label }) => `
    <div style="padding:2rem;background:#faf9f7;">
      <a href="#" class="button button-ghost">${label || 'Our philosophy ↓'}</a>
    </div>
  `,
  args: { label: 'Our philosophy ↓' },
};

export const AllVariants: Story = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:2rem;padding:2rem;background:#faf9f7;">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
        <a href="#" class="button button-primary">Primary</a>
        <a href="#" class="button button-ghost">Ghost</a>
      </div>
      <div style="display:flex;gap:1rem;align-items:center;">
        <a href="#" class="button button-primary" aria-disabled="true" style="pointer-events:none;opacity:0.5;">Primary disabled</a>
        <a href="#" class="button button-ghost" aria-disabled="true" style="pointer-events:none;opacity:0.5;">Ghost disabled</a>
      </div>
      <div>
        <a href="#" class="cta-email">frontdoor@kecker.co →</a>
      </div>
      <div>
        <a href="#" class="text-link">Our philosophy ↓</a>
      </div>
    </div>
  `,
};
