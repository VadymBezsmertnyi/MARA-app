export type ThemeT = "light" | "dark";

export type ThemeContext = {
  theme: ThemeT;
  selectTheme: (newTheme: ThemeT) => Promise<void>;
  getTheme: () => Promise<void>;
  setIsSplash: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PropsT = {
  children: React.ReactNode;
};
