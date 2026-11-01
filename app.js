
/* =========================================
   RAJ BARBER STUDIO
   Interactive JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const body = document.body;

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("open", isOpen);
      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close menu when a navigation link is selected
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside it
    document.addEventListener("click", event => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close mobile navigation when returning to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // 2. AUTOMATIC COPYRIGHT YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // 4. ACTIVE NAVIGATION LINK
  const pageSections = document.querySelectorAll(
    "main section[id], header[id]"
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navItems.forEach(link => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );

    pageSections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  // 5. BACK TO TOP BUTTON
  const backToTop = document.querySelector(".back-to-top");

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 400
    );
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();


  // 6. HANDLE IMAGE LOADING ERRORS
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.classList.add("image-unavailable");
      img.style.backgroundColor = "#E5E1D8";
    });
  });

});
