document.addEventListener('DOMContentLoaded', function() {
  // Scroll Animation
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Initial check on load
  checkVisibility();
  
  // Check on scroll
  window.addEventListener('scroll', function() {
    checkVisibility();
  });
  
  // Check if elements are visible
  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + scrollTop;
      const elementHeight = element.offsetHeight;
      
      // Check if element is in viewport
      if (scrollTop + windowHeight > elementTop + (elementHeight * 0.2)) {
        element.classList.add('visible');
      }
    });
  }
  
  // Hero Section Parallax Effect (only on home page)
  const hero = document.querySelector('.hero');
  
  if (hero && !hero.classList.contains('page-hero')) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      // Move the background position to create parallax effect
      hero.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    });
  }
  
  // Project Gallery Hover Effect
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Scale up the image and show overlay
      const image = this.querySelector('.project-image');
      const overlay = this.querySelector('.project-overlay');
      
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
      
      if (overlay) {
        overlay.style.transform = 'translateY(0)';
        overlay.style.opacity = '1';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      // Reset image and overlay
      const image = this.querySelector('.project-image');
      const overlay = this.querySelector('.project-overlay');
      
      if (image) {
        image.style.transform = 'scale(1)';
      }
      
      if (overlay) {
        overlay.style.transform = 'translateY(20px)';
        overlay.style.opacity = '0.9';
      }
    });
  });
  
  // Service Cards Animation
  const serviceCards = document.querySelectorAll('.service-card, .expertise-item, .benefit-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = 'var(--shadow-md)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'var(--shadow)';
    });
  });
  
  // Button Hover Animation
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add active class to current navigation link
  const currentPage = window.location.pathname.split('/').pop();
  
  document.querySelectorAll('.nav-list a').forEach(link => {
    const linkHref = link.getAttribute('href');
    
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPage === '/' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Number Counter Animation (if exists)
  const animateCounters = document.querySelectorAll('.animate-counter');
  
  if (animateCounters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          let count = 0;
          const duration = 2000; // ms
          const increment = Math.ceil(target / (duration / 16)); // 60fps
          
          const updateCounter = () => {
            count += increment;
            if (count < target) {
              counter.innerText = count;
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    animateCounters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
});