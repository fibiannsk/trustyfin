/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core Colors */
        background: 'var(--color-background)', /* white */
        foreground: 'var(--color-foreground)', /* gray-900 */
        border: 'var(--color-border)', /* gray-200 */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* red-600 */
        
        /* Card Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* gray-900 */
        },
        
        /* Popover Colors */
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* gray-900 */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-50 */
          foreground: 'var(--color-muted-foreground)' /* gray-500 */
        },
        
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* red-600 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* blue-900 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Destructive Colors */
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* green-600 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* Success Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        /* Warning Colors */
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        /* Error Colors */
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        /* Banking Specific Colors */
        surface: 'var(--color-surface)', /* gray-50 */
        'text-primary': 'var(--color-text-primary)', /* gray-900 */
        'text-secondary': 'var(--color-text-secondary)' /* gray-500 */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Inter', 'sans-serif'],
        accent: ['Inter', 'sans-serif']
      },
      fontWeight: {
        'headline': '700',
        'headline-bold': '800',
        'cta': '600',
        'accent': '500',
        'accent-medium': '600'
      },
      boxShadow: {
        'banking-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'banking-cta': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'scroll-reveal': 'scrollReveal 300ms ease-out'
      },
      keyframes: {
        scrollReveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      transitionDuration: {
        'banking': '250ms'
      },
      transitionTimingFunction: {
        'banking': 'ease-in-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}
