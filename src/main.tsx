import { createRoot } from "react-dom/client";
import "@fontsource/vt323/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./styles/global.css";
import "./os/os.css";
import App from "./App";
import { useLocale } from "./i18n/locale";

document.documentElement.lang = useLocale.getState().locale;

// No StrictMode: its double-mount leaves drei's <Html> portal root empty (the OS never appears on the screen).
createRoot(document.getElementById("root")!).render(<App />);
