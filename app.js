const loader = document.querySelector(".loader");
var body = document.querySelector(".body");

window.addEventListener("load", vanish);
function vanish() {
  body.classList.remove("hide");
  loader.classList.add("dissapear");

  let controller;
  let slideScene;
  let pageScene;

  function animateSlides() {
    controller = new ScrollMagic.Controller();

    const sliders = document.querySelectorAll(".slide");

    sliders.forEach((slide, index, slides) => {
      revealImg = slide.querySelector(".reveal-img");
      revealText = slide.querySelector(".reveal-text");
      img = slide.querySelector("img");

      //  gsap.to(select, time, object,"delayed time")

      const slideTl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
      });

      slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
      slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
      slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");

      slideScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.25,
        reverse: false,
      })
        .setTween(slideTl)
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "yellow",
        //   name: "slide",
        // })
        .addTo(controller);
      // new animation
      const pageTl = gsap.timeline();
      let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
      pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
      pageTl.fromTo(
        slide,
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.5 }
      );
      pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" });

      // new scene
      pageScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: "100%",
        triggerHook: 0,
      })
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "yellow",
        //   name: "page",
        //   indent: 200,
        // })
        .setPin(slide, { pushFollowers: false })
        .setTween(pageTl)
        .addTo(controller);
    });
  }

  animateSlides();

  // cursor
  const mouse = document.querySelector(".cursor");
  const burger = document.querySelector(".burger");
  const mouseText = document.querySelector("span");
  // eventlitseners
  window.addEventListener("mousemove", cursor);
  window.addEventListener("mousemove", cursoractive);
  burger.addEventListener("click", navToggle);

  // function
  function cursor(e) {
    mouse.setAttribute(
      "style",
      "top: " + e.clientY + "px;left: " + e.clientX + "px"
    );
  }
  function cursoractive(e) {
    const item = e.target;
    if (item.id === "logo" || item.classList.contains("burger")) {
      mouse.classList.add("nav-active");
    } else {
      mouse.classList.remove("nav-active");
    }
    if (item.classList.contains("explore")) {
      mouse.classList.add("explore-active");
      gsap.to(".title-swipe", 1, { y: "0%" });
      mouse.innerText = "Tap";
    } else {
      mouse.classList.remove("explore-active");
      gsap.to(".title-swipe", 1, { y: "100%" });

      mouse.innerText = "";
    }
  }
  function navToggle(e) {
    if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      gsap.to(".line1", 0.5, { rotateZ: "45deg", y: 7, background: "black" });
      gsap.to(".line2", 0.5, { rotateZ: "-45deg", y: -7, background: "black" });
      gsap.to(".line3", 0, { opacity: 0 });
      gsap.to("#logo", 1, { color: "black" });
      gsap.to(".nav-bar", 1, {
        clipPath: "circle(2500px at 100% -10%)",
      });
      document.body.classList.add("hide");
    } else {
      e.target.classList.remove("active");
      gsap.to(".line1", 0.5, { rotateZ: "0", y: 0, background: "white" });
      gsap.to(".line2", 0.5, { rotateZ: "0", y: 0, background: "white" });
      gsap.to(".line3", 0, { opacity: 1 });
      gsap.to("#logo", 1, { color: "white" });
      gsap.to(".nav-bar", 1, {
        clipPath: "circle(50px at 100% -10%)",
      });
      document.body.classList.remove("hide");
    }
  }
}
