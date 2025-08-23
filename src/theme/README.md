# Portfolio Theme Options

This directory contains different theme options for your portfolio site. Each theme file provides a complete color scheme for both light and dark modes.

## Available Themes

1. **hero-theme.json** - The original purple-based theme
2. **modern-blue-theme.json** - A professional blue theme with good contrast
3. **green-theme.json** - A fresh, nature-inspired green theme
4. **dark-mode-theme.json** - A minimalist theme optimized for dark mode

## How to Use

To change your site's theme, update your `src/context/themeProvider.tsx` file to import the desired theme:

```tsx
// Example: Using the modern-blue-theme
import themeConfig from "@/theme/modern-blue-theme.json";
```

Or create a theme switcher component that allows users to select their preferred theme:

```tsx
// Example theme switcher implementation
import { useState, useEffect } from "react";
import heroTheme from "@/theme/hero-theme.json";
import blueTheme from "@/theme/modern-blue-theme.json";
import greenTheme from "@/theme/green-theme.json";
import darkTheme from "@/theme/dark-mode-theme.json";

const themes = {
  hero: heroTheme,
  blue: blueTheme,
  green: greenTheme,
  dark: darkTheme
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("hero");
  
  useEffect(() => {
    // Apply the selected theme
    document.documentElement.setAttribute("data-theme", currentTheme);
    // You would need to implement the actual theme application logic
  }, [currentTheme]);
  
  return (
    <div>
      <select 
        value={currentTheme} 
        onChange={(e) => setCurrentTheme(e.target.value)}
      >
        <option value="hero">Purple Theme</option>
        <option value="blue">Modern Blue</option>
        <option value="green">Green Theme</option>
        <option value="dark">Dark Mode</option>
      </select>
    </div>
  );
}
```

## Theme Structure

Each theme follows the Hero UI theme structure with:

- Light and dark mode variants
- Color scales for default, primary, secondary, success, warning, and danger
- Background and foreground colors
- Content area styling
- Focus and overlay colors

## Customization

Feel free to modify any of these themes or create your own by copying one of the existing files and adjusting the color values.