// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const mobileMenu = document.querySelector(".mobile-menu")
const body = document.body

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  hamburger.classList.toggle("active")

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span")
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    hamburger.classList.remove("active")

    // Reset hamburger
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Typed.js effect
const typedText = document.querySelector(".typed-text")
const phrases = ["Web Developer", "PHP Developer", "BCA Student", "Backend Developer", "Solution-Oriented Developer"]
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeEffect() {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    // Deleting text
    typedText.textContent = currentPhrase.substring(0, charIndex - 1)
    charIndex--
    typingSpeed = 50
  } else {
    // Typing text
    typedText.textContent = currentPhrase.substring(0, charIndex + 1)
    charIndex++
    typingSpeed = 100
  }

  // If word is complete, start deleting after pause
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true
    typingSpeed = 1000 // Pause at end of word
  }

  // If deletion is complete, move to next word
  if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typingSpeed = 500 // Pause before typing next word
  }

  setTimeout(typeEffect, typingSpeed)
}

// Start the typing effect
setTimeout(typeEffect, 1000)

// Form submission handling
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("form-status")
const thanksModal = document.getElementById("thanks-modal")
const closeModal = document.querySelector(".close-modal")
const closeButton = document.getElementById("close-thanks")

// Handle form submission
contactForm.addEventListener("submit", (e) => {
  // FormSubmit will handle the actual submission
  // This is just for showing the thank you message
  // If you want to test the thank you message without actually submitting:
  // e.preventDefault();
  // showThanksModal();
})

// Show thanks modal
function showThanksModal() {
  thanksModal.classList.add("active")
}

// Close modal when clicking the X
if (closeModal) {
  closeModal.addEventListener("click", () => {
    thanksModal.classList.remove("active")
  })
}

// Close modal when clicking the close button
if (closeButton) {
  closeButton.addEventListener("click", () => {
    thanksModal.classList.remove("active")
  })
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === thanksModal) {
    thanksModal.classList.remove("active")
  }
})

// Create a thanks.html page for redirect after form submission
// This is optional but recommended for FormSubmit redirects
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the thanks page
  if (window.location.pathname.includes("thanks.html")) {
    // Redirect back to main page after 5 seconds
    setTimeout(() => {
      window.location.href = "index.html#contact"
    }, 5000)
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header
        behavior: "smooth",
      })
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all sections for scroll animations
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in")
  observer.observe(section)
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursorDot = document.querySelector(".cursor-dot")
  const cursorOutline = document.querySelector(".cursor-outline")

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    // Add a slight delay to the outline cursor for a nice effect
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

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const body = document.body

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

  // Sticky header
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Typing animation
  const words = ["websites.", "applications.", "solutions.", "experiences."]
  const titleAnimation = document.querySelector(".title-animation")
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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

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

