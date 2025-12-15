// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      // Women-centric brand palette
      colors: {
        brand: {
          50: "#FFF5F9",
          100: "#FCE7F3",
          200: "#F9CBE8",
          300: "#F4A0D6",
          400: "#EF6FBF",
          500: "#E33A9A",
          600: "#D32F86",
          700: "#B6286D",
          800: "#8F2056",
          900: "#6E1842",
        },
        coral: {
          50: "#FFF6F4",
          100: "#FFEDEA",
          300: "#FFB8A3",
          500: "#FF7A5A",
          700: "#DB4F3D",
        },
        lavender: {
          50: "#FBF7FF",
          100: "#F3EFFF",
          300: "#D8C8FF",
          500: "#B79BFF",
        },
        indigoAccent: {
          50: "#F5F8FF",
          100: "#EAEFFF",
          300: "#BFD1FF",
          500: "#7FA8FF",
        },
        gold: {
          50: "#FFFBF1",
          100: "#FEF6E0",
          300: "#F6D59E",
          500: "#F0B03F",
        },
        neutralSoft: {
          50: "#FBFBFC",
          100: "#F6F6F8",
          300: "#E6E7EB",
          500: "#CFCFE0",
        },
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, rgba(227,58,154,0.95) 0%, rgba(143,107,255,0.9) 50%, rgba(240,176,63,0.88) 100%)",
        "soft-pink-lav":
          "linear-gradient(180deg, rgba(243,229,244,0.9), rgba(244,224,255,0.6))",
      },

      boxShadow: {
        "soft-lg": "0 10px 30px -10px rgba(142, 74, 164, 0.18)",
        "glass": "0 6px 18px rgba(16,24,40,0.28)",
      },

      borderRadius: {
        "xl-2": "1rem",
        "xxl": "1.5rem",
      },

      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
        display: ["Poppins", "system-ui"],
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "float-slow": "float 6s ease-in-out infinite",
        "pop-in": "popIn .35s cubic-bezier(.2,.9,.3,1) both",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
          "100%": { transform: "translateY(0px)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(.98)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },

      maxWidth: {
        "8xl": "96rem",
      },
    },
  },

  // Add the plugins including line-clamp
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp")
  ],

  safelist: [
    "bg-brand-500",
    "text-brand-500",
    "from-brand-500",
    "to-indigoAccent-500",
    "bg-coral-500",
    "bg-lavender-500",
  ],
};
