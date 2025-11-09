// ========================================
// NAVIGATION
// ========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// HERO SLIDER
// ========================================
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
let currentSlide = 0;
let slideInterval;

// Show slide function
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for slider
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
});

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        stopSlideShow();
        startSlideShow();
    });
});

// Start the slideshow
startSlideShow();

// ========================================
// TOUCH SUPPORT FOR SLIDER (MOBILE)
// ========================================
let touchStartX = 0;
let touchEndX = 0;

const heroSlider = document.querySelector('.hero-slider');

heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
        stopSlideShow();
        startSlideShow();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        prevSlide();
        stopSlideShow();
        startSlideShow();
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');
const whatsappBtn = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.classList.remove('show');
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// BOOKING FORM VALIDATION
// ========================================
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const personas = document.getElementById('personas').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const habitacion = document.getElementById('habitacion').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('La fecha de check-in no puede ser anterior a hoy');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        alert('La fecha de check-out debe ser posterior a la fecha de check-in');
        return;
    }
    
    // Calculate nights
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Show confirmation message
    const confirmMessage = `
¡Gracias por tu reserva, ${nombre}!

Resumen de tu reserva:
- Habitación: ${habitacion}
- Check-in: ${checkin}
- Check-out: ${checkout}
- Noches: ${nights}
- Personas: ${personas}
- Email: ${email}
- Teléfono: ${telefono}

Nos pondremos en contacto contigo pronto para confirmar tu reserva.
    `;
    
    alert(confirmMessage);
    
    // Reset form
    bookingForm.reset();
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);

// Update minimum date for check-out when check-in changes
document.getElementById('checkin').addEventListener('change', (e) => {
    const checkinDate = e.target.value;
    document.getElementById('checkout').setAttribute('min', checkinDate);
});

// ========================================
// CONTACT FORM
// ========================================
const contactForms = document.querySelectorAll('.contact-form');

contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        form.reset();
    });
});

// ========================================
// GALLERY LIGHTBOX (Simple version)
// ========================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const imgSrc = img.getAttribute('src');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.5);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});

// ========================================
// ANIMATIONS ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate
const animateElements = document.querySelectorAll('.room-card, .service-card, .review-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// PRELOAD IMAGES
// ========================================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// ========================================
// PRICE CALCULATOR (Optional Enhancement)
// ========================================
function calculatePrice(roomType, nights) {
    const prices = {
        'simple': 8500,
        'doble': 12500,
        'suite': 18900
    };
    
    return prices[roomType] * nights;
}

// Update price display when dates or room type change
const habitacionSelect = document.getElementById('habitacion');
const checkinInput = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

function updatePriceEstimate() {
    if (habitacionSelect.value && checkinInput.value && checkoutInput.value) {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const price = calculatePrice(habitacionSelect.value, nights);
            console.log(`Precio estimado: $${price.toLocaleString('es-AR')} por ${nights} noche(s)`);
        }
    }
}

if (habitacionSelect) {
    habitacionSelect.addEventListener('change', updatePriceEstimate);
}
if (checkinInput) {
    checkinInput.addEventListener('change', updatePriceEstimate);
}
if (checkoutInput) {
    checkoutInput.addEventListener('change', updatePriceEstimate);
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c¡Bienvenido al Hotel La Embajada!', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cSitio web desarrollado con ❤️', 'color: #D4AF37; font-size: 14px;');

// ========================================
// DYNAMIC QR CODE GENERATION
// ========================================
window.addEventListener('load', () => {
    const qrImage = document.getElementById('qrCodeImage');
    if (qrImage) {
        // Obtener la URL actual del sitio
        const currentURL = window.location.href;
        // Generar QR con la URL actual
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentURL)}`;
    }
});
