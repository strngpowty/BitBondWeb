function ThemeSwitcher() {
    const changeTheme = (e) => {
        document.documentElement.setAttribute("data-theme", e.target.value)
    }
    return (
        <select className="select select-bordered w-full max-w-xs" onChange={changeTheme}>
            <option value="halloween">🦇 Theme-Halloween</option>
            <option value="luxury">⚜️ Theme-Luxury</option>
            <option value="black">🕸️ Theme-Black</option>
            <option value="valentine">🎀 Theme-Valentine</option>
            <option value="coffee">🔮 Theme-Coffee</option>
            <option value="nord">🎐 Theme-Nord</option>
            <option value="cyberpunk">👾 Theme-Cyberpunk</option>
        </select>
    )
}

export default ThemeSwitcher;