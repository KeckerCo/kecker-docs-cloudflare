import type { Preview } from '@storybook/html';
import '../src/styles/global.css';

// Load Google Fonts (same as the site)
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&display=swap';
document.head.appendChild(link);

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'warm',
      values: [
        { name: 'warm', value: '#faf9f7' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#111111' },
        { name: 'crimson', value: '#971b2f' },
      ],
    },
    layout: 'padded',
  },
};

export default preview;
