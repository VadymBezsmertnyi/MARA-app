export type ThemeT = "light" | "dark";

export type ThemeContext = {
  theme: ThemeT;
  heightStatusBar: number;
  selectTheme: (newTheme: ThemeT) => Promise<void>;
  getTheme: () => Promise<void>;
};

export type PropsT = {
  children: React.ReactNode;
};
