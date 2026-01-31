const SECTION_MAP: Record<string, string> = {
  "/": "Dasboard",
  "/dashboard": "Dashboard",
  "/habits": "Nawyki",
  "/learning": "Nauka",
  "/stats": "Statystyki",
  "/profile": "Profil",
  "/settings": "Ustawienia systemu",
};

export const getSectionName = (path: string) => {
  if (SECTION_MAP[path]) {
    return SECTION_MAP[path];
  }

  for (const key of Object.keys(SECTION_MAP)) {
    if (key !== "/" && path.startsWith(key)) {
      return SECTION_MAP[key];
    }
  }

  const last = path.split("/").filter(Boolean).pop() || "";

  if (!last) return "Sekcja";

  return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
};
