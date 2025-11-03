import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function profile() {
  const tl1 = gsap.timeline();
  const tl2 = gsap.timeline();
  tl1
    .to(".profile-text", {
      duration: 0.3,
      y: 0,
      stagger: 0.2,
      ease: "power2.out",
    })
    .to(".cv-button", {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "bounce.out",
    })
    .to(
      ".social-icon",
      {
        opacity: 1,
        ease: "ease.out",
        stagger: 0.1,
      },
      "-=0.3"
    );
  tl2
    .to("#profile-container", {
      duration: 0.2,
      scaleX: 1,
      ease: "power2.out",
    })
    .to(
      "#profile-image",
      {
        duration: 0.3,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
      },
      "+=0.3"
    );
}

export function about() {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#timeline",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#timeline",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  tl1
    .to(".about-text", {
      duration: 0.3,
      y: 0,
      stagger: 0.2,
      ease: "power2.out",
    })
    .to(".count", {
      scale: 1.5,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(".count", {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(".count", {
      scale: 1.3,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(".count", {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(
      ".plus",
      {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      },
      "-=0.4"
    );

  tl2
    .to("#timeline-item-1", {
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    })
    .to("#line", { height: "30%", duration: 0.1, ease: "power2.out" })
    .to(
      "#timeline-item-2",
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      "+=0.2"
    )
    .to("#line", { height: "60%", duration: 0.1, ease: "power2.out" })
    .to(
      "#timeline-item-3",
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      "+=0.2"
    )
    .to("#line", { height: "85%", duration: 0.1, ease: "power2.out" })
    .to(
      "#timeline-item-4",
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      "+=0.2"
    );
}

export function projects() {
  const cards = gsap.utils.toArray<HTMLElement>(".card");
  // group cards by their top offset (row)
  const rows = cards.reduce((acc, card) => {
    const top = Math.round(card.getBoundingClientRect().top + window.scrollY);
    if (!acc[top]) acc[top] = [];
    acc[top].push(card);
    return acc;
  }, {} as Record<number, HTMLElement[]>);
  // animate each row separately
  Object.values(rows).forEach((rowCards) => {
    gsap.to(rowCards, {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rowCards[0], // use the first card of the row as trigger
        start: "top 80%", // when this row hits 80% of viewport
      },
    });
  });
}

export function contact() {
  const textEl3 = document.querySelector(".contact-text3") as HTMLElement;
  const messageBodyStr = textEl3.textContent || "";
  textEl3.textContent = "";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  tl.to(".contact-text", {
    duration: 0.3,
    y: 0,
    delay: 0.2,
    stagger: 0.2,
    ease: "power2.out",
  });

  const speed = 15;
  const endFlashSpeed = 0.5;
  const cursor = "|";
  const typingTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  typingTl
    .to(
      {},
      {
        duration: messageBodyStr.length / speed,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * messageBodyStr.length);
          textEl3.textContent =
            messageBodyStr.substring(0, currentLength) + cursor;
        },
        onComplete: function () {
          textEl3.textContent = messageBodyStr;
        },
      },
      "+=0.5"
    )
    .to(".cursor", {
      opacity: 1,
      duration: 0,
      repeat: -1,
      yoyo: true,
      repeatDelay: endFlashSpeed,
      ease: "none",
    });
}
