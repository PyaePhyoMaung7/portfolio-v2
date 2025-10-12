import { gsap } from "gsap";

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
      "<"
    );
  tl2
    .to("#profile-container", {
      duration: 0.3,
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
