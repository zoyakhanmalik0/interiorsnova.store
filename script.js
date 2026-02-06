// Mobile nav toggle
document.addEventListener('DOMContentLoaded',function(){
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  
  console.log('Nav element:', nav);
  console.log('Toggle element:', toggle);
  
  if (toggle && nav) {
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      console.log('Toggle clicked');
      nav.classList.toggle('active');
      const isActive = nav.classList.contains('active');
      toggle.setAttribute('aria-expanded', isActive);
      console.log('Menu is now:', isActive ? 'open' : 'closed');
    });
  }

  // Close menu when clicking on a link
  if (nav) {
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Search toggle functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchInputWrapper = document.getElementById('searchInputWrapper');
  const searchInput = document.getElementById('site-search');
  const searchForm = document.getElementById('searchForm');

  if(searchBtn && searchInputWrapper) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      searchInputWrapper.classList.toggle('active');
      searchForm.classList.toggle('active');
      if(searchInputWrapper.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
      if(!searchForm.contains(e.target)) {
        searchInputWrapper.classList.remove('active');
        searchForm.classList.remove('active');
      }
    });

    // Allow form submission
    searchForm.addEventListener('submit', function(e) {
      if(!searchInput.value.trim()) {
        e.preventDefault();
      }
    });
  }

  // Simple hero slider
  const slider = document.getElementById('heroSlider');
  const dots = document.getElementById('heroDots');
  const slides = slider.querySelectorAll('.slide');
  let idx = 0;

  function goTo(i){
    idx = (i + slides.length) % slides.length;
    slider.style.transform = `translateX(-${idx * 100}%)`;
    Array.from(dots.children).forEach((b,bi)=>b.classList.toggle('active',bi===idx));
  }

  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click',()=>goTo(i));
    dots.appendChild(b);
  });
  goTo(0);
  setInterval(()=>goTo(idx+1),5000);

  // WhatsApp link handler
  const whatsappButtons = document.querySelectorAll('.product-whatsapp');
  const whatsappPhone = '923025289473'; // Update this with your WhatsApp number (format: country code + number without +)
  
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const product = this.getAttribute('data-product');
      const price = this.getAttribute('data-price');
      const message = encodeURIComponent(`Hello! I'm interested in ordering:\n\nProduct: ${product}\nPrice: ${price}\n\nPlease provide more details.`);
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  });

  // Featured products slider (looping)
  const productsTrack = document.getElementById('productsTrack');
  const productsDots = document.getElementById('productsDots');
  const productsPrev = document.getElementById('productsPrev');
  const productsNext = document.getElementById('productsNext');

  if (productsTrack) {
    const productSlides = Array.from(productsTrack.querySelectorAll('.product'));
    let prodIdx = 0;
    let prodPerView = 1;
    let prodGap = 20;
    let prodWidth = 0;
    let maxIndex = 0;

    const computeLayout = () => {
      const style = getComputedStyle(productsTrack);
      const gapStr = style.gap || '20px';
      prodGap = parseFloat(gapStr) || 20;
      const w = productSlides[0]?.getBoundingClientRect().width || 0;
      prodWidth = w + prodGap;

      const viewport = productsTrack.parentElement?.getBoundingClientRect().width || 0;
      prodPerView = Math.max(1, Math.round(viewport / (w || 1)));
      prodPerView = Math.min(prodPerView, productSlides.length);
      maxIndex = Math.max(0, productSlides.length - prodPerView);
    };

    const setDots = () => {
      if (!productsDots) return;
      productsDots.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const b = document.createElement('button');
        b.addEventListener('click', () => goProd(i));
        productsDots.appendChild(b);
      }
    };

    const activateDots = () => {
      if (!productsDots) return;
      Array.from(productsDots.children).forEach((b, i) =>
        b.classList.toggle('active', i === prodIdx)
      );
    };

    const goProd = (i) => {
      // Ensure proper looping
      if (i < 0) {
        prodIdx = maxIndex;
      } else if (i > maxIndex) {
        prodIdx = 0;
      } else {
        prodIdx = i;
      }
      
      const offset = prodIdx * prodWidth;
      productsTrack.style.transform = `translateX(-${offset}px)`;
      activateDots();
    };

    const goPrev = () => {
      goProd(prodIdx - 1);
    };

    const goNext = () => {
      goProd(prodIdx + 1);
    };

    computeLayout();
    setDots();
    activateDots();
    goProd(0);

    if (productsPrev) {
      productsPrev.addEventListener('click', goPrev);
    }
    if (productsNext) {
      productsNext.addEventListener('click', goNext);
    }

    let prodTimer = setInterval(() => {
      goProd(prodIdx + 1);
    }, 4500);

    const handleResize = () => {
      computeLayout();
      setDots();
      activateDots();
      // Keep current position or reset if out of bounds
      if (prodIdx > maxIndex) {
        prodIdx = 0;
      }
      goProd(prodIdx);
    };

    window.addEventListener('resize', handleResize);

    productsTrack.addEventListener('pointerenter', () => {
      clearInterval(prodTimer);
    });
    productsTrack.addEventListener('pointerleave', () => {
      clearInterval(prodTimer);
      prodTimer = setInterval(() => {
        goProd(prodIdx + 1);
      }, 4500);
    });
  }

  // Bed Set slider (looping)
  const bedsetTrack = document.getElementById('bedsetTrack');
  const bedsetDots = document.getElementById('bedsetDots');
  const bedsetPrev = document.getElementById('bedsetPrev');
  const bedsetNext = document.getElementById('bedsetNext');

  if (bedsetTrack) {
    const bedsetSlides = Array.from(bedsetTrack.querySelectorAll('.product'));
    let bedsetIdx = 0;
    let bedsetPerView = 1;
    let bedsetGap = 20;
    let bedsetWidth = 0;
    let bedsetMaxIndex = 0;

    const computeBedsetLayout = () => {
      const style = getComputedStyle(bedsetTrack);
      const gapStr = style.gap || '20px';
      bedsetGap = parseFloat(gapStr) || 20;
      const w = bedsetSlides[0]?.getBoundingClientRect().width || 0;
      bedsetWidth = w + bedsetGap;

      const viewport = bedsetTrack.parentElement?.getBoundingClientRect().width || 0;
      bedsetPerView = Math.max(1, Math.round(viewport / (w || 1)));
      bedsetPerView = Math.min(bedsetPerView, bedsetSlides.length);
      bedsetMaxIndex = Math.max(0, bedsetSlides.length - bedsetPerView);
    };

    const setBedsetDots = () => {
      if (!bedsetDots) return;
      bedsetDots.innerHTML = '';
      for (let i = 0; i <= bedsetMaxIndex; i++) {
        const b = document.createElement('button');
        b.addEventListener('click', () => goBedset(i));
        bedsetDots.appendChild(b);
      }
    };

    const activateBedsetDots = () => {
      if (!bedsetDots) return;
      Array.from(bedsetDots.children).forEach((b, i) =>
        b.classList.toggle('active', i === bedsetIdx)
      );
    };

    const goBedset = (i) => {
      // Ensure proper looping
      if (i < 0) {
        bedsetIdx = bedsetMaxIndex;
      } else if (i > bedsetMaxIndex) {
        bedsetIdx = 0;
      } else {
        bedsetIdx = i;
      }
      
      const offset = bedsetIdx * bedsetWidth;
      bedsetTrack.style.transform = `translateX(-${offset}px)`;
      activateBedsetDots();
    };

    const goBedsetPrev = () => {
      goBedset(bedsetIdx - 1);
    };

    const goBedsetNext = () => {
      goBedset(bedsetIdx + 1);
    };

    computeBedsetLayout();
    setBedsetDots();
    activateBedsetDots();
    goBedset(0);

    if (bedsetPrev) {
      bedsetPrev.addEventListener('click', goBedsetPrev);
    }
    if (bedsetNext) {
      bedsetNext.addEventListener('click', goBedsetNext);
    }

    let bedsetTimer = setInterval(() => {
      goBedset(bedsetIdx + 1);
    }, 4500);

    const handleBedsetResize = () => {
      computeBedsetLayout();
      setBedsetDots();
      activateBedsetDots();
      // Keep current position or reset if out of bounds
      if (bedsetIdx > bedsetMaxIndex) {
        bedsetIdx = 0;
      }
      goBedset(bedsetIdx);
    };

    window.addEventListener('resize', handleBedsetResize);

    bedsetTrack.addEventListener('pointerenter', () => {
      clearInterval(bedsetTimer);
    });
    bedsetTrack.addEventListener('pointerleave', () => {
      clearInterval(bedsetTimer);
      bedsetTimer = setInterval(() => {
        goBedset(bedsetIdx + 1);
      }, 4500);
    });
  }

  // More Products button - Show all products
  const showAllProductsBtn = document.getElementById('showAllProducts');
  if (showAllProductsBtn) {
    showAllProductsBtn.addEventListener('click', function() {
      // Scroll to featured products section
      const featuredSection = document.getElementById('featured');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Dining Table slider (looping)
  const diningTrack = document.getElementById('diningTrack');
  const diningDots = document.getElementById('diningDots');
  const diningPrev = document.getElementById('diningPrev');
  const diningNext = document.getElementById('diningNext');

  if (diningTrack) {
    const diningSlides = Array.from(diningTrack.querySelectorAll('.product'));
    let diningIdx = 0;
    let diningPerView = 1;
    let diningGap = 20;
    let diningWidth = 0;
    let diningMaxIndex = 0;

    const computeDiningLayout = () => {
      const style = getComputedStyle(diningTrack);
      const gapStr = style.gap || '20px';
      diningGap = parseFloat(gapStr) || 20;
      const w = diningSlides[0]?.getBoundingClientRect().width || 0;
      diningWidth = w + diningGap;

      const viewport = diningTrack.parentElement?.getBoundingClientRect().width || 0;
      diningPerView = Math.max(1, Math.round(viewport / (w || 1)));
      diningPerView = Math.min(diningPerView, diningSlides.length);
      diningMaxIndex = Math.max(0, diningSlides.length - diningPerView);
    };

    const setDiningDots = () => {
      if (!diningDots) return;
      diningDots.innerHTML = '';
      for (let i = 0; i <= diningMaxIndex; i++) {
        const b = document.createElement('button');
        b.addEventListener('click', () => goDining(i));
        diningDots.appendChild(b);
      }
    };

    const activateDiningDots = () => {
      if (!diningDots) return;
      Array.from(diningDots.children).forEach((b, i) =>
        b.classList.toggle('active', i === diningIdx)
      );
    };

    const goDining = (i) => {
      // Ensure proper looping
      if (i < 0) {
        diningIdx = diningMaxIndex;
      } else if (i > diningMaxIndex) {
        diningIdx = 0;
      } else {
        diningIdx = i;
      }
      
      const offset = diningIdx * diningWidth;
      diningTrack.style.transform = `translateX(-${offset}px)`;
      activateDiningDots();
    };

    const goDiningPrev = () => {
      goDining(diningIdx - 1);
    };

    const goDiningNext = () => {
      goDining(diningIdx + 1);
    };

    computeDiningLayout();
    setDiningDots();
    activateDiningDots();
    goDining(0);

    if (diningPrev) {
      diningPrev.addEventListener('click', goDiningPrev);
    }
    if (diningNext) {
      diningNext.addEventListener('click', goDiningNext);
    }

    let diningTimer = setInterval(() => {
      goDining(diningIdx + 1);
    }, 4500);

    const handleDiningResize = () => {
      computeDiningLayout();
      setDiningDots();
      activateDiningDots();
      // Keep current position or reset if out of bounds
      if (diningIdx > diningMaxIndex) {
        diningIdx = 0;
      }
      goDining(diningIdx);
    };

    window.addEventListener('resize', handleDiningResize);

    diningTrack.addEventListener('pointerenter', () => {
      clearInterval(diningTimer);
    });
    diningTrack.addEventListener('pointerleave', () => {
      clearInterval(diningTimer);
      diningTimer = setInterval(() => {
        goDining(diningIdx + 1);
      }, 4500);
    });
  }

  // More Dining Products button - Show all products
  const showAllDiningProductsBtn = document.getElementById('showAllDiningProducts');
  if (showAllDiningProductsBtn) {
    showAllDiningProductsBtn.addEventListener('click', function() {
      // Scroll to featured products section
      const featuredSection = document.getElementById('featured');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Floating chat button functionality
  const floatingChatBtn = document.getElementById('floatingChatBtn');
  const floatingMenu = document.getElementById('floatingMenu');

  console.log('Floating chat btn:', floatingChatBtn);
  console.log('Floating menu:', floatingMenu);

  if (floatingChatBtn && floatingMenu) {
    floatingChatBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Chat button clicked, toggling menu');
      floatingMenu.classList.toggle('active');
      console.log('Menu active state:', floatingMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!floatingChatBtn.contains(e.target) && !floatingMenu.contains(e.target)) {
        floatingMenu.classList.remove('active');
      }
    });

    // Close menu when clicking a button
    floatingMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        floatingMenu.classList.remove('active');
      });
    });
  } else {
    console.error('Floating chat elements not found!');
  }
});

// Initialize floating menu AFTER partials are loaded
// This runs after DOMContentLoaded to ensure footer is loaded
setTimeout(function() {
  const floatingChatBtn = document.getElementById('floatingChatBtn');
  const floatingMenu = document.getElementById('floatingMenu');

  console.log('Reinitializing floating chat...');
  console.log('Floating chat btn:', floatingChatBtn);
  console.log('Floating menu:', floatingMenu);

  if (floatingChatBtn && floatingMenu) {
    floatingChatBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('Chat button clicked, toggling menu');
      floatingMenu.classList.toggle('active');
      console.log('Menu is now:', floatingMenu.classList.contains('active') ? 'OPEN' : 'CLOSED');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!floatingChatBtn.contains(e.target) && !floatingMenu.contains(e.target)) {
        floatingMenu.classList.remove('active');
      }
    });

    // Close menu when clicking a button
    floatingMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        floatingMenu.classList.remove('active');
      });
    });

    console.log('Floating menu initialized successfully!');
  } else {
    console.error('Floating chat elements still not found after timeout!');
  }
}, 500);

// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      const messageEl = document.getElementById('newsletterMessage');
      const button = document.querySelector('.newsletter-btn');
      const originalButtonHTML = button.innerHTML;
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNewsletterMessage('Please enter a valid email address', 'error', messageEl);
        return;
      }
      
      // Show loading state
      button.disabled = true;
      button.innerHTML = '<span style="animation: spin 1s linear infinite;">⏳</span>';
      
      try {
        // Send newsletter subscription
        const response = await fetch('/api/newsletter-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
        
        if (response.ok) {
          showNewsletterMessage('✅ Thank you! Check your email for 10% discount code.', 'success', messageEl);
          newsletterForm.reset();
          document.getElementById('newsletterEmail').focus();
        } else {
          const data = await response.json();
          showNewsletterMessage(data.message || '❌ Subscription failed. Please try again.', 'error', messageEl);
        }
      } catch (error) {
        console.error('Newsletter error:', error);
        showNewsletterMessage('❌ Connection error. Please try again.', 'error', messageEl);
      } finally {
        // Restore button
        button.disabled = false;
        button.innerHTML = originalButtonHTML;
      }
    });
  }
});

function showNewsletterMessage(message, type, element) {
  element.textContent = message;
  element.className = 'newsletter-message ' + type;
  element.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}
