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
  tl1
    .to("#timeline-item-1", {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    })
    .to("#line", { height: "30%", duration: 0.2, ease: "power2.out" })
    .to(
      "#timeline-item-2",
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      "+=0.2"
    )
    .to("#line", { height: "60%", duration: 0.2, ease: "power2.out" })
    .to(
      "#timeline-item-3",
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      "+=0.2"
    )
    .to("#line", { height: "85%", duration: 0.2, ease: "power2.out" })
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
