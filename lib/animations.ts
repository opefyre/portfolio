import gsap from "gsap";

// Fade in from bottom
export const fadeInUp = {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
};

// Stagger children animation
export const staggerChildren = (delay = 0.1) => ({
    stagger: delay,
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
});

// Scale in animation
export const scaleIn = {
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "back.out(1.4)",
};

// Slide in from left
export const slideInLeft = {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
};

// Slide in from right
export const slideInRight = {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
};

// Rotate in animation
export const rotateIn = {
    rotation: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
};

// Glitch effect
export const glitchEffect = (element: HTMLElement) => {
    const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.1 });
    tl.to(element, {
        x: -2,
        duration: 0.05,
    })
        .to(element, {
            x: 2,
            duration: 0.05,
        })
        .to(element, {
            x: 0,
            duration: 0.05,
        });
    return tl;
};

// Text reveal animation
export const textReveal = (element: HTMLElement, duration = 1) => {
    return gsap.from(element.querySelectorAll("span"), {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: duration,
        ease: "power2.out",
    });
};

// Counter animation
export const counterAnimation = (
    element: HTMLElement,
    endValue: number,
    duration = 2
) => {
    const obj = { val: 0 };
    return gsap.to(obj, {
        val: endValue,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
            element.textContent = Math.ceil(obj.val).toString();
        },
    });
};

// Parallax effect
export const parallaxEffect = (element: HTMLElement, distance = 100) => {
    return gsap.to(element, {
        y: distance,
        ease: "none",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
};
