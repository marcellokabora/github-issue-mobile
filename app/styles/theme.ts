export const colors = {
    primary: "#0366d6",
    success: "#28a745",
    error: "#d73a49",
    background: {
        primary: "#ffffff",
        secondary: "#f6f8fa",
    },
    text: {
        primary: "#24292e",
        secondary: "#586069",
        light: "#ffffff",
    },
    border: "#e1e4e8",
} as const;

export const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
    },
    weights: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    } as const,
};

export const spacing = {
    xs: 4,
    sm: 8,
    base: 16,
    lg: 24,
    xl: 32,
} as const; 