// ===== CONFIGURATION =====
const CONFIG = {
  whatsappPhone: '916303932545',
  callPhone: '916303932545',
  whatsappMessage: 'Hello%20I%20need%20medical%20equipment',
  waPopupDelay: 7000, // milliseconds
  waPopupStorageKey: 'waShown'
};

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupPopupBehavior();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Hero buttons
  const callBtn = document.querySelector('[data-action="call"]');
  const whatsappBtn = document.querySelector('[data-action="whatsapp"]');

  if (callBtn) {
    callBtn.addEventListener('click', () => {
      window.location.href = `tel:+${CONFIG.callPhone}`;
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.location.href = `https://wa.me/${CONFIG.whatsappPhone}?text=${CONFIG.whatsappMessage}`;
    });
  }

  // Smooth scrolling for navigation links
  setupSmoothScroll();
}

// ===== POPUP BEHAVIOR =====
function setupPopupBehavior() {
  // Only show popup if user hasn't seen it
  if (!localStorage.getItem(CONFIG.waPopupStorageKey)) {
    setTimeout(() => {
      showWhatsappPopup();
    }, CONFIG.waPopupDelay);
  }
}

function showWhatsappPopup() {
  // Open WhatsApp with a welcome message
  const waURL = `https://wa.me/${CONFIG.whatsappPhone}?text=${CONFIG.whatsappMessage}`;
  window.open(waURL, '_blank');
  
  // Mark as shown so it doesn't show again
  localStorage.setItem(CONFIG.waPopupStorageKey, 'true');
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScroll() {
  // Add smooth scroll behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Only prevent default for valid internal links
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===== HELPER FUNCTIONS =====

/**
 * Track click events for analytics (optional)
 */
function trackEvent(category, action, label) {
  // Placeholder for analytics tracking
  // Can be connected to Google Analytics or other tools
  console.log(`Event: ${category} - ${action} - ${label}`);
}

/**
 * Validate phone number format
 */
function validatePhoneNumber(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, '').slice(-10));
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== FORM VALIDATION (Optional Enhancement) =====
function setupFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');

    // Optional: Add custom validation before submission
    if (nameInput && nameInput.value.trim().length < 2) {
      e.preventDefault();
      alert('Please enter a valid name');
      return;
    }

    if (phoneInput && !validatePhoneNumber(phoneInput.value)) {
      e.preventDefault();
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    // If all validations pass, form will submit normally
  });
}

// Initialize form validation
if (document.readyState !== 'loading') {
  setupFormValidation();
} else {
  document.addEventListener('DOMContentLoaded', setupFormValidation);
}

// ===== MOBILE MENU SUPPORT (Optional Future Enhancement) =====
/**
 * Can be used to add mobile hamburger menu functionality
 */
function setupMobileMenu() {
  // Placeholder for future mobile menu implementation
  // This would handle responsive navigation on smaller screens
}

// ===== PERFORMANCE MONITORING (Optional) =====
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  });
}