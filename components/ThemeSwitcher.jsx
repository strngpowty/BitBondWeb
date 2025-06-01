import { useState } from "react";

function ThemeSwitcher() {
  const themes = [
    { label: "🦇 Theme-Halloween", value: "halloween" },
    { label: "⚜️ Theme-Luxury", value: "luxury" },
    { label: "🕸️ Theme-Black", value: "black" },
    { label: "🎀 Theme-Valentine", value: "valentine" },
    { label: "🔮 Theme-Coffee", value: "coffee" },
    { label: "🎐 Theme-Nord", value: "nord" },
    { label: "👾 Theme-Cyberpunk", value: "cyberpunk" },
  ];

  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme.value);
    setCurrentTheme(theme);
  };

  return (
    <div className="dropdown dropdown-bottom w-full max-w-xs">
      <div tabIndex={0} className="btn btn-outline border-primary w-full truncate">
        {currentTheme.label}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-w-xs">
        {themes.map((theme) => (
          <li key={theme.value}>
            <button onClick={() => {document.activeElement?.blur(); changeTheme(theme)}} className="truncate">
              {theme.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeSwitcher;
