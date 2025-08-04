import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [
    // Falcon Shoelace handles theming automatically via CSS custom properties
    // No preset needed - use design tokens instead of Tailwind colors
  ],
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './src/index.html',
    // Include Shoelace components for proper class detection
    './node_modules/@shoelace-style/shoelace/dist/**/*.js',
    './node_modules/@crowdstrike/falcon-shoelace/dist/**/*.js'
  ],
  theme: {
    extend: {
      // Layout utilities only - colors handled by CrowdStrike design tokens
      spacing: {
        'xs': '3px',
        'sm': '5px', 
        'md': '10px',
        'lg': '14px',
        'xl': '19px'
      },
      transitionDuration: {
        '200': '200ms'
      }
    },
    // Disable default colors to prevent conflicts with CrowdStrike design tokens
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Only keep essential utility colors, remove theme colors
      white: '#ffffff',
      black: '#000000'
    }
  },
  plugins: [
    // Add any additional Tailwind plugins here if needed
  ]
};

export default config;
