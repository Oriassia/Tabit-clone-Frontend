import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  
  interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
  }
  
  const initialState: ThemeContextType = {
    theme: "system",
    setTheme: () => null,
  };
  
  const ThemeProviderContext = createContext<ThemeContextType>(initialState);
  
  interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: string;
    storageKey?: string;
  }
  
  export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
  }: ThemeProviderProps) {
    const [theme, setTheme] = useState<string>(
      () => localStorage.getItem(storageKey) || defaultTheme
    );
  
    useEffect(() => {
      const root = window.document.documentElement;
  
      root.classList.remove("light", "dark");
  
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
  
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }, [theme]);
  
    const value: ThemeContextType = {
      theme,
      setTheme: (newTheme: string) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
    };
  
    return (
      <ThemeProviderContext.Provider {...props} value={value}>
        {children}
      </ThemeProviderContext.Provider>
    );
  }
  
  export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeProviderContext);
  
    if (context === undefined) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
  
    return context;
  };
  
  // Example component to toggle themes
  export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
  
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
  
    return (
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    );
  }