/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  safelist: [
    // Track-specific classes for dynamic TrackCard.tsx
    'border-track-ai-beginner',
    'bg-track-ai-beginner-bg',
    'text-track-ai-beginner',
    'bg-gradient-track-ai-beginner',
    'border-track-ai-developer',
    'bg-track-ai-developer-bg',
    'text-track-ai-developer',
    'bg-gradient-track-ai-developer',
    'border-track-spring-backend',
    'bg-track-spring-backend-bg',
    'text-track-spring-backend',
    'bg-gradient-track-spring-backend',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary colors (full scale)
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          DEFAULT: 'hsl(var(--primary-500))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // Track colors (full scale × 3)
        track: {
          'ai-beginner': {
            50: 'hsl(var(--track-ai-beginner-50))',
            100: 'hsl(var(--track-ai-beginner-100))',
            200: 'hsl(var(--track-ai-beginner-200))',
            300: 'hsl(var(--track-ai-beginner-300))',
            400: 'hsl(var(--track-ai-beginner-400))',
            500: 'hsl(var(--track-ai-beginner-500))',
            600: 'hsl(var(--track-ai-beginner-600))',
            700: 'hsl(var(--track-ai-beginner-700))',
            DEFAULT: 'hsl(var(--track-ai-beginner))',
            bg: 'hsl(var(--track-ai-beginner-bg))',
            border: 'hsl(var(--track-ai-beginner-border))',
          },
          'ai-developer': {
            50: 'hsl(var(--track-ai-developer-50))',
            100: 'hsl(var(--track-ai-developer-100))',
            200: 'hsl(var(--track-ai-developer-200))',
            300: 'hsl(var(--track-ai-developer-300))',
            400: 'hsl(var(--track-ai-developer-400))',
            500: 'hsl(var(--track-ai-developer-500))',
            600: 'hsl(var(--track-ai-developer-600))',
            700: 'hsl(var(--track-ai-developer-700))',
            DEFAULT: 'hsl(var(--track-ai-developer))',
            bg: 'hsl(var(--track-ai-developer-bg))',
            border: 'hsl(var(--track-ai-developer-border))',
          },
          'spring-backend': {
            50: 'hsl(var(--track-spring-backend-50))',
            100: 'hsl(var(--track-spring-backend-100))',
            200: 'hsl(var(--track-spring-backend-200))',
            300: 'hsl(var(--track-spring-backend-300))',
            400: 'hsl(var(--track-spring-backend-400))',
            500: 'hsl(var(--track-spring-backend-500))',
            600: 'hsl(var(--track-spring-backend-600))',
            700: 'hsl(var(--track-spring-backend-700))',
            DEFAULT: 'hsl(var(--track-spring-backend))',
            bg: 'hsl(var(--track-spring-backend-bg))',
            border: 'hsl(var(--track-spring-backend-border))',
          },
        },

        // Badge colors (full scale × 3)
        badge: {
          'free': {
            50: 'hsl(var(--badge-free-50))',
            100: 'hsl(var(--badge-free-100))',
            500: 'hsl(var(--badge-free-500))',
            DEFAULT: 'hsl(var(--badge-free))',
            bg: 'hsl(var(--badge-free-bg))',
            text: 'hsl(var(--badge-free-text))',
          },
          'premium': {
            50: 'hsl(var(--badge-premium-50))',
            100: 'hsl(var(--badge-premium-100))',
            500: 'hsl(var(--badge-premium-500))',
            DEFAULT: 'hsl(var(--badge-premium))',
            bg: 'hsl(var(--badge-premium-bg))',
            text: 'hsl(var(--badge-premium-text))',
          },
          'soon': {
            50: 'hsl(var(--badge-soon-50))',
            100: 'hsl(var(--badge-soon-100))',
            500: 'hsl(var(--badge-soon-500))',
            DEFAULT: 'hsl(var(--badge-soon))',
            bg: 'hsl(var(--badge-soon-bg))',
            text: 'hsl(var(--badge-soon-text))',
          },
        },

        // Semantic colors
        success: {
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          DEFAULT: 'hsl(var(--success))',
          bg: 'hsl(var(--success-bg))',
        },
        warning: {
          50: 'hsl(var(--warning-50))',
          500: 'hsl(var(--warning-500))',
          DEFAULT: 'hsl(var(--warning))',
          bg: 'hsl(var(--warning-bg))',
        },
        error: {
          50: 'hsl(var(--error-50))',
          500: 'hsl(var(--error-500))',
          DEFAULT: 'hsl(var(--error))',
          bg: 'hsl(var(--error-bg))',
        },
        info: {
          50: 'hsl(var(--info-50))',
          500: 'hsl(var(--info-500))',
          DEFAULT: 'hsl(var(--info))',
          bg: 'hsl(var(--info-bg))',
        },

        gray: {
          50: "hsl(var(--gray-50))",
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          300: "hsl(var(--gray-300))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
          600: "hsl(var(--gray-600))",
          700: "hsl(var(--gray-700))",
          800: "hsl(var(--gray-800))",
          900: "hsl(var(--gray-900))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
        'xl': '0 12px 24px 0 rgba(0, 0, 0, 0.12), 0 6px 12px 0 rgba(0, 0, 0, 0.1)',
        '2xl': '0 24px 48px 0 rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
