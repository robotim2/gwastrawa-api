import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import { useThemeProvider } from '../utils/ThemeContext';


export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div className="flex items-center cursor-pointer">
      <button
        type="button"
        aria-label={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        onClick={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
        className="btn rounded-full"
      >
        {currentTheme === 'light' ? (
          <MoonIcon className="w-7 h-7 text-black dark:hidden" />
        ) : (
          <SunIcon className="w-7 h-7 text-white dark:block" />
        )}
      </button>
    </div>
  );
}
