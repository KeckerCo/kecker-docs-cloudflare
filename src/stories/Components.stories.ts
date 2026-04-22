import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Patterns',
};
export default meta;

type Story = StoryObj;

export const Eyebrow: Story = {
  render: () => `
    <div style="padding:2rem;background:#faf9f7;display:flex;flex-direction:column;gap:3rem;">
      <div>
        <span class="eyebrow">What We Build</span>
        <h2 style="font-family:'EB Garamond',Georgia,serif;font-size:2.5rem;font-weight:400;color:#111;margin:0;letter-spacing:-0.02em;">Engineering at the intersection of reason and craft.</h2>
      </div>
      <div>
        <span class="eyebrow">Our Philosophy</span>
        <h2 style="font-family:'EB Garamond',Georgia,serif;font-size:2.5rem;font-weight:400;color:#111;margin:0;letter-spacing:-0.02em;">Three traditions. One discipline.</h2>
      </div>
    </div>
  `,
};

export const PillarItem: Story = {
  render: () => `
    <div style="padding:2rem;background:#faf9f7;max-width:700px;">
      <article class="pillar">
        <div class="pillar-mark" aria-hidden="true">I</div>
        <div class="pillar-content">
          <h3>Platonic Form</h3>
          <p class="pillar-tagline">The ideal is the standard.</p>
          <p class="pillar-body">
            Plato argued that behind every imperfect thing, there is an ideal version of it.
            We think that applies to software. Every product has a form it could take that is
            genuinely clear, genuinely useful, and genuinely well made.
          </p>
        </div>
      </article>
    </div>
  `,
};

export const ServiceCard: Story = {
  render: () => `
    <div style="padding:2rem;background:#faf9f7;max-width:340px;">
      <article class="service-card" style="border:1px solid #e0dbd5;border-radius:10px;">
        <span class="eyebrow">01</span>
        <h3>Mobile &amp; Web Engineering</h3>
        <p>
          We build mobile and web apps that hold up. Not just at launch, but as the user base
          grows and the requirements change.
        </p>
      </article>
    </div>
  `,
};

export const PullQuote: Story = {
  render: () => `
    <div style="padding:3rem;background:#f3ede6;max-width:600px;">
      <span class="eyebrow">Eudaimonia</span>
      <blockquote class="pull-quote">
        Software should make things better. For the people using it, the people building it,
        and the world it runs in.
      </blockquote>
    </div>
  `,
};
