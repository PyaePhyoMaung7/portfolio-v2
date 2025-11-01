import { gsap } from "gsap";
import { about, profile } from "./animation";
import { i18n } from "./i18n";

document.addEventListener("DOMContentLoaded", async () => {
  await loadResources();
  setTimeout(display, 100);
  setTimeout(showAnimations, 100);
});

// Display web
const display = () => {
  const cloak = document.querySelector<HTMLBodyElement>("#cloak")!;
  const content = document.querySelector<HTMLBodyElement>("#content")!;
  cloak.style.display = "none";
  content.style.display = "block";
  gsap.to(content, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.out",
  });
};

// Do before web is displayed
const loadResources = async () => {
  const btnEn = document.querySelector<HTMLButtonElement>("#btn-en");
  const btnEnText = btnEn!.querySelector<HTMLSpanElement>("#btn-en-text");
  const btnJp = document.querySelector<HTMLButtonElement>("#btn-jp");
  const btnJpText = btnJp!.querySelector<HTMLSpanElement>("#btn-jp-text");
  const modeToggle = document.querySelector<HTMLInputElement>("#mode-toggle");
  const menuBtn = document.querySelector<HTMLButtonElement>("#menu-btn");
  // const menuItems = document.querySelectorAll<HTMLButtonElement>(".menu-item");
  const main = document.querySelector<HTMLElement>("#main");

  // Load saved or default language
  const storageKey = "lang";
  const savedLang = localStorage.getItem(storageKey) || "en";
  if (savedLang === "en") {
    btnEnText!.classList.add("text-highlight");
  } else {
    btnJpText!.classList.add("text-highlight");
  }
  i18n.setLang(savedLang);

  // Toggle language
  btnEn!.addEventListener("click", () => {
    btnEnText!.classList.add("text-highlight");
    btnJpText!.classList.remove("text-highlight");
    localStorage.setItem(storageKey, "en");
    i18n.setLang("en");
  });
  btnJp!.addEventListener("click", () => {
    btnJpText!.classList.add("text-highlight");
    btnEnText!.classList.remove("text-highlight");
    localStorage.setItem(storageKey, "ja");
    i18n.setLang("ja");
  });

  // Load saved or default language
  const modeStorageKey = "mode";
  const savedMode = localStorage.getItem(modeStorageKey) || "dark";
  if (savedMode === "dark") {
    document.documentElement.classList.add("dark");
    modeToggle!.checked = true;
  } else {
    document.documentElement.classList.remove("dark");
    modeToggle!.checked = false;
  }

  // Toggle light/dark mode
  modeToggle!.addEventListener("change", () => {
    if (modeToggle!.checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(modeStorageKey, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(modeStorageKey, "light");
    }
  });

  // Toggle menu
  menuBtn!.addEventListener("click", () => {
    toggleMenu();
  });
  main!.addEventListener("click", () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  });
  // menuItems!.forEach((item) => {
  //   item.addEventListener("click", () => {
  //     toggleMenu();
  //   });
  // });

  // Update tab on scroll
  const sections = document.querySelectorAll<HTMLElement>(".section");
  const tabs = document.querySelectorAll<HTMLAnchorElement>(".tab");
  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + window.innerHeight / 2;
    tabs.forEach((tab) => {
      tab.classList.remove("active-section");
    });
    sections.forEach((section) => {
      const currentTabs = document.querySelectorAll<HTMLAnchorElement>(
        `.${section.id}-tab`
      );
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentTabs.forEach((tab) => tab!.classList.add("active-section"));
      }
    });
  });
};

// Toggle Menu
let isMenuOpen = false;
const toggleMenu = () => {
  const menu = document.querySelector<HTMLDivElement>("#menu");
  if (!isMenuOpen) {
    gsap.to(menu, {
      top: "45px",
      duration: 0.2,
      ease: "power1.inOut",
    });
  } else {
    gsap.to(menu, {
      top: "-82px",
      duration: 0.2,
      ease: "power1.inOut",
    });
  }
  isMenuOpen = !isMenuOpen;
};

const showAnimations = () => {
  profile();
  about();
};
