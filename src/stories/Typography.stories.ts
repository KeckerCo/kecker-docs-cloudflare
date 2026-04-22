import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Design System/Typography',
};
export default meta;

type Story = StoryObj;

export const TypeScale: Story = {
  render: () => `
    <div style="padding:2rem;max-width:700px;background:#faf9f7;">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#971b2f;margin:0 0 2rem;">TYPE SCALE</p>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">h1 · 4.25rem max · EB Garamond 400</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:4.25rem;font-weight:400;color:#111;line-height:1.08;letter-spacing:-0.025em;">Software as Language.</div>
      </div>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">h2 · 2.5rem max · EB Garamond 400</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:2.5rem;font-weight:400;color:#111;line-height:1.1;letter-spacing:-0.02em;">Three traditions. One discipline.</div>
      </div>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">h3 · 1.5rem max · EB Garamond 400</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:1.5rem;font-weight:400;color:#111;line-height:1.1;letter-spacing:-0.02em;">Platonic Form</div>
      </div>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">lede · 1.375rem max · EB Garamond 400</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:1.375rem;color:#666;line-height:1.82;">We start with the right questions, then build the right thing.</div>
      </div>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">body · 1.125rem · EB Garamond 400</div>
        <div style="font-family:'EB Garamond',Georgia,serif;font-size:1.125rem;color:#2a2a2a;line-height:1.82;">Plato argued that behind every imperfect thing, there is an ideal version of it. We think that applies to software.</div>
      </div>

      <div style="margin-bottom:2rem;padding-bottom:2rem;border-bottom:1px solid #e0dbd5;">
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">eyebrow · 0.8125rem · Inter 600 · uppercase · tracked</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.8125rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#971b2f;">What We Build</div>
      </div>

      <div>
        <div style="font-family:'Inter',sans-serif;font-size:0.75rem;color:#999;margin-bottom:0.5rem;">UI label · 0.8125rem · Inter 500</div>
        <div style="font-family:'Inter',sans-serif;font-size:0.8125rem;font-weight:500;color:#666;">Home · Contact · Privacy Policy</div>
      </div>
    </div>
  `,
};

export const SerifSpecimen: Story = {
  render: () => `
    <div style="padding:2rem;max-width:600px;background:#faf9f7;">
      <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#971b2f;margin:0 0 1.5rem;">EB GARAMOND · Display & Prose</p>
      <p style="font-family:'EB Garamond',Georgia,serif;font-size:1.125rem;line-height:1.95;color:#2a2a2a;margin:0;">
        Plato argued that behind every imperfect thing, there is an ideal version of it.
        We think that applies to software. Every product has a form it could take that is
        genuinely clear, genuinely useful, and genuinely well made. The gap between what
        a thing is and what it could be is not a problem to explain away. It is where the
        real work happens.
      </p>
      <p style="font-family:'EB Garamond',Georgia,serif;font-style:italic;font-size:1.125rem;line-height:1.95;color:#666;margin:1.25rem 0 0;">
        <em>Italic weight — used for pillar taglines and CTA supporting copy.</em>
      </p>
    </div>
  `,
};
