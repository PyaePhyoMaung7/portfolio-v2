import { gsap } from "gsap";
import { about, contact, profile, projects } from "./animation";
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

  // Set up cursor trail
  interface CircleElement extends HTMLDivElement {
    x: number;
    y: number;
  }

  const coords = { x: 0, y: 0 };
  const circles = Array.from(
    document.querySelectorAll(".cursor-circle")
  ) as CircleElement[];

  circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = "rgba(139, 64, 198, 0.12)";
    circle.style.position = "fixed";
    circle.style.width = "24px";
    circle.style.height = "24px";
    circle.style.borderRadius = "50%";
    circle.style.pointerEvents = "none";
    circle.style.zIndex = "9999";
    circle.style.transition = "transform 0.1s linear, opacity 0.3s ease";
    circle.style.opacity = "0";
  });

  let isInView = false;
  window.addEventListener("mousemove", (e: MouseEvent) => {
    coords.x = e.clientX;
    coords.y = e.clientY;

    if (!isInView) {
      circles.forEach((circle) => (circle.style.opacity = "1"));
      isInView = true;
    }
  });

  document.documentElement.addEventListener("mouseleave", () => {
    circles.forEach((circle) => (circle.style.opacity = "0"));
    isInView = false;
  });

  const animateCircles = () => {
    if (!isInView) {
      requestAnimationFrame(animateCircles);
      return;
    }

    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      circle.style.left = `${x - 12}px`;
      circle.style.top = `${y - 12}px`;
      circle.style.transform = `scale(${
        (circles.length - index) / circles.length
      })`;
      circle.x = x;
      circle.y = y;

      const next = circles[index + 1] || circles[0];
      x += (next.x - x) * 0.3;
      y += (next.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  };

  animateCircles();
};

// Toggle Menu
let isMenuOpen = false;
const toggleMenu = () => {
  const menu = document.querySelector<HTMLDivElement>("#menu");
  if (!isMenuOpen) {
    gsap.to(menu, {
      top: "50px",
      duration: 0.2,
      ease: "power1.inOut",
    });
  } else {
    gsap.to(menu, {
      top: "-50px",
      duration: 0.2,
      ease: "power1.inOut",
    });
  }
  isMenuOpen = !isMenuOpen;
};

const showAnimations = () => {
  profile();
  about();
  projects();
  contact();
};
