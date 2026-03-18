export const tokens = {
  global: {
    color: {
      palette: {
        brand: {
          500: "#2f6fed"
        },
        neutral: {
          0: "#ffffff",
          900: "#0f172a"
        }
      }
    },
    space: {
      page: "24px"
    },
    radius: {
      card: "32px"
    },
    shadow: {
      card: "0 16px 40px rgba(15, 23, 42, 0.08)"
    },
    icon: {
      size: {
        md: "20px"
      }
    },
    typography: {
      family: {
        sans: "Inter, sans-serif"
      },
      size: {
        body: "14px"
      }
    }
  },
  theme: {
    light: {
      color: {
        surface: {
          card: "#ffffff"
        }
      }
    }
  }
} as const;

export type Tokens = typeof tokens;
