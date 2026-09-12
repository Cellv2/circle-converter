// src/main.ts
import "./style.css";
import appTemplate from "./app.html?raw";
import heroImg from "./assets/hero.png";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
import { setupCounter } from "./counter.ts";

const rootElement = document.querySelector("#app");

if (rootElement) {
    rootElement.innerHTML = appTemplate;

    const hero = rootElement.querySelector<HTMLImageElement>("#hero-img");
    const tsLogo = rootElement.querySelector<HTMLImageElement>("#ts-logo");
    const viteLogoEl =
        rootElement.querySelector<HTMLImageElement>("#vite-logo");
    const viteLogoDocs =
        rootElement.querySelector<HTMLImageElement>("#vite-logo-docs");
    const tsLogoDocs =
        rootElement.querySelector<HTMLImageElement>("#ts-logo-docs");

    if (hero) hero.src = heroImg;
    if (tsLogo) tsLogo.src = typescriptLogo;
    if (viteLogoEl) viteLogoEl.src = viteLogo;
    if (viteLogoDocs) viteLogoDocs.src = viteLogo;
    if (tsLogoDocs) tsLogoDocs.src = typescriptLogo;

    const counterElement =
        rootElement.querySelector<HTMLButtonElement>("#counter");
    if (counterElement) {
        setupCounter(counterElement);
    }
} else {
    console.error("Unable to mount application: #app element not found.");
}
