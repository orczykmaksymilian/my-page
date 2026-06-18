// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  // Smooth scroll to section when clicking navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Account for fixed header height
        const headerOffset = 70;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active navigation link on scroll
  function updateActiveNav() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Offset for better detection
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
      updateActiveNav();
    });
  });
  
  // Initial call to set active nav on page load
  updateActiveNav();
  
  // ===================================
  // CONTACT FORM HANDLING
  // ===================================
  
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For now, we'll just show an alert
      alert(`Thank you for your message, ${name}! We'll get back to you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
      
      // In a real implementation, you would use fetch() or XMLHttpRequest
      // to send the data to your backend:
      /*
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      })
      .then(response => response.json())
      .then(data => {
        alert('Message sent successfully!');
        contactForm.reset();
      })
      .catch(error => {
        alert('Error sending message. Please try again.');
      });
      */
    });
  }
  
  // ===================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===================================
  
  // Add fade-in animation to cards as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards for animation
  const cards = document.querySelectorAll('.about-card, .featured-card, .project-card, .skill-category');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // ===================================
  // KEYBOARD NAVIGATION
  // ===================================
  
  // Allow keyboard navigation through sections
  document.addEventListener('keydown', function(e) {
    // Arrow Up - scroll to previous section
    if (e.key === 'ArrowUp' && e.ctrlKey) {
      e.preventDefault();
      scrollToAdjacentSection('up');
    }
    
    // Arrow Down - scroll to next section
    if (e.key === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      scrollToAdjacentSection('down');
    }
  });
  
  function scrollToAdjacentSection(direction) {
    const currentScrollPos = window.scrollY;
    let targetSection = null;
    
    if (direction === 'down') {
      // Find next section
      for (let section of sections) {
        if (section.offsetTop > currentScrollPos + 100) {
          targetSection = section;
          break;
        }
      }
    } else {
      // Find previous section
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < currentScrollPos - 100) {
          targetSection = sections[i];
          break;
        }
      }
    }
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  // ===================================
  // PERFORMANCE: LAZY LOADING IMAGES
  // ===================================
  
  // Add lazy loading to images if browser doesn't support it natively
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
  }
  
  // ===================================
  // SCROLL TO TOP ON PAGE LOAD
  // ===================================
  
  // Ensure page starts at the top
  window.scrollTo(0, 0);
  
  console.log('Portfolio initialized successfully! 🚀');
});

// ===================================
// PROJECT MODAL FUNCTIONALITY
// ===================================

// Sample project data - Replace with your actual project data
const projectData = {
  1: {
    title: "Sales Performance Dashboard",
    description: "Comprehensive Power BI dashboard tracking sales metrics, regional performance, and forecasting trends. Integrated with Azure SQL Database for real-time updates.",
    images: ["./images/img.jpg", "./images/img.jpg", "./images/img.jpg"],
    technologies: ["Power BI", "Azure SQL", "DAX", "Power Query"],
    features: [
      "Real-time sales tracking and KPI monitoring",
      "Regional performance comparison with drill-down capabilities",
      "Predictive analytics for sales forecasting",
      "Automated data refresh from Azure SQL Database",
      "Interactive filters and slicers for custom views"
    ],
    liveLink: "#",
    githubLink: "#"
  },
  2: {
    title: "Customer Analytics Platform",
    description: "End-to-end analytics solution for customer segmentation and behavior analysis. Built with Python and deployed on Azure with automated data pipelines.",
    images: ["./images/img.jpg", "./images/img.jpg"],
    technologies: ["Python", "Azure", "Pandas", "Scikit-learn"],
    features: [
      "Customer segmentation using machine learning",
      "Behavioral pattern analysis and insights",
      "Automated data pipeline with Azure Data Factory",
      "Interactive dashboards for stakeholder reporting",
      "Predictive customer lifetime value modeling"
    ],
    liveLink: "#",
    githubLink: "#"
  },
  3: {
    title: "Financial Reporting Automation",
    description: "Automated monthly financial reports using Excel VBA and Power Automate. Reduced manual processing time by 80% and improved accuracy.",
    images: ["./images/img.jpg"],
    technologies: ["Excel VBA", "Power Automate", "SQL", "SharePoint"],
    features: [
      "Automated data extraction from multiple sources",
      "Dynamic report generation with custom formatting",
      "Email distribution to stakeholders",
      "Error handling and data validation",
      "Integration with SharePoint for document management"
    ],
    liveLink: "#",
    githubLink: "#"
  }
};

let currentProjectId = null;
let currentImageIndex = 0;
let currentImages = [];

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const project = projectData[projectId];
  
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }
  
  currentProjectId = projectId;
  currentImages = project.images;
  currentImageIndex = 0;
  
  // Update modal content
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDescription').textContent = project.description;
  document.getElementById('modalImage').src = project.images[0];
  
  // Update technologies
  const techTagsContainer = document.getElementById('modalTechTags');
  techTagsContainer.innerHTML = project.technologies.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');
  
  // Update features
  const featuresContainer = document.getElementById('modalFeatures');
  featuresContainer.innerHTML = project.features.map(feature => 
    `<li>${feature}</li>`
  ).join('');
  
  // Update links
  document.getElementById('modalLiveLink').href = project.liveLink;
  document.getElementById('modalGithubLink').href = project.githubLink;
  
  // Update carousel indicators
  updateCarouselIndicators();
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  if (currentImages.length <= 1) return;
  
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  document.getElementById('modalImage').src = currentImages[currentImageIndex];
  updateCarouselIndicators();
}

function prevImage() {
  if (currentImages.length <= 1) return;
  
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById('modalImage').src = currentImages[currentImageIndex];
  updateCarouselIndicators();
}

function updateCarouselIndicators() {
  const indicatorsContainer = document.getElementById('carouselIndicators');
  
  if (currentImages.length <= 1) {
    indicatorsContainer.innerHTML = '';
    return;
  }
  
  indicatorsContainer.innerHTML = currentImages.map((_, index) => 
    `<div class="carousel-indicator ${index === currentImageIndex ? 'active' : ''}" onclick="goToImage(${index})"></div>`
  ).join('');
}

function goToImage(index) {
  currentImageIndex = index;
  document.getElementById('modalImage').src = currentImages[currentImageIndex];
  updateCarouselIndicators();
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('projectModal');
  if (!modal.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
