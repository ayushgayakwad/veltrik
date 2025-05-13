document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener('click', function() {
      navList.classList.toggle('active');
      
      // Transform hamburger into X
      const spans = this.querySelectorAll('span');
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navList && navList.classList.contains('active') && !event.target.closest('.main-nav')) {
      navList.classList.remove('active');
      
      if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
  
  // Testimonial Slider
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  if (prevBtn && nextBtn && testimonials.length > 0) {
    let currentIndex = 0;
    
    // Function to show testimonial at index
    const showTestimonial = (index) => {
      testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
      });
      testimonials[index].classList.add('active');
    };
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  }
  
  // Position Filter (for Careers page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const positionCards = document.querySelectorAll('.position-card');
  
  if (filterBtns.length > 0 && positionCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(innerBtn => {
          innerBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Show/hide position cards based on filter
        positionCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  const careerForm = document.getElementById('careerForm');
  
  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Simulate form submission - in real app would send to server
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Career Form Submission
  if (careerForm) {
    careerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const position = document.getElementById('position').value;
      const resume = document.getElementById('resume').value;
      
      // Simple validation
      if (!name || !email || !position || !resume) {
        alert('Please fill out all required fields.');
        return;
      }
      
      // Simulate form submission - in real app would send to server
      alert('Thank you for your application! We will review it and get back to you soon.');
      careerForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navList && navList.classList.contains('active')) {
          navList.classList.remove('active');
          
          if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  let scrollPosition = 0;
  
  window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      header.style.boxShadow = 'var(--shadow)';
      header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });
});