// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const body = document.body

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open")
      mobileMenu.classList.toggle("open")
      body.classList.toggle("no-scroll")
    })

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-link")

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("open")
        mobileMenu.classList.remove("open")
        body.classList.remove("no-scroll")
      })
    })
  }

  // Custom cursor (only on desktop)
  if (window.innerWidth > 768) {
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")

    if (cursorDot && cursorOutline) {
      window.addEventListener("mousemove", (e) => {
        const posX = e.clientX
        const posY = e.clientY

        cursorDot.style.left = `${posX}px`
        cursorDot.style.top = `${posY}px`

        setTimeout(() => {
          cursorOutline.style.left = `${posX}px`
          cursorOutline.style.top = `${posY}px`
        }, 50)
      })

      // Hide cursor when leaving window
      document.addEventListener("mouseout", () => {
        cursorDot.style.opacity = "0"
        cursorOutline.style.opacity = "0"
      })

      document.addEventListener("mouseover", () => {
        cursorDot.style.opacity = "1"
        cursorOutline.style.opacity = "1"
      })

      // Make cursor bigger when hovering over links and buttons
      const hoverElements = document.querySelectorAll("a, button, .menu-btn, .project-card, .skill-item, .contact-card")

      hoverElements.forEach((element) => {
        element.addEventListener("mouseover", () => {
          cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
          cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
          cursorOutline.style.borderColor = "var(--primary-color)"
        })

        element.addEventListener("mouseout", () => {
          cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
          cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
          cursorOutline.style.borderColor = "var(--primary-color)"
        })
      })
    }
  }

  // Typing animation
  const titleAnimation = document.querySelector(".title-animation")
  if (titleAnimation) {
    const words = ["backend developer.", "solution-oriented developer.", "BCA student.", "quick learner."];


    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isEnd = false

    function typeEffect() {
      isEnd = false
      const currentWord = words[wordIndex]

      if (isDeleting) {
        titleAnimation.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
      } else {
        titleAnimation.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isEnd = true
        isDeleting = true
        setTimeout(() => typeEffect(), 2000)
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(() => typeEffect(), 500)
      } else {
        setTimeout(() => typeEffect(), isDeleting ? 50 : 100)
      }
    }

    // Start typing animation
    setTimeout(typeEffect, 1000)
  }

  // Sticky header
  const header = document.querySelector("header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    })
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    ".section-header, .hero-text, .hero-image, .about-image, .about-text, .skills-text, .skills-showcase, .project-card, .contact-info, .contact-form-container",
  )

  animateElements.forEach((element) => {
    observer.observe(element)
  })
})

