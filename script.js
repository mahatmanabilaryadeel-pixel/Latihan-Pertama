// ============================================
// BUILDPRO CONSTRUCTION - SCRIPT.JS
// Semua fungsi JavaScript untuk website
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. LOADING SCREEN =====
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);

    // ===== 2. STICKY NAVBAR =====
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== 3. BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== 4. COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        
        const triggerPoint = window.scrollY + window.innerHeight;
        const statsSection = document.getElementById('stats');
        
        if (statsSection && triggerPoint > statsSection.offsetTop + 100) {
            counterAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 80);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 20);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 500);

    // ===== 5. TESTIMONI SLIDER OTOMATIS =====
    const track = document.querySelector('.testimonial-track');
    if (track) {
        let currentIndex = 0;
        const items = track.querySelectorAll('.testimonial-item');
        const totalItems = items.length;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 4000);
    }

    // ===== 6. SCROLL ANIMATION (Intersection Observer) =====
    const animateElements = document.querySelectorAll('.service-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate', 'visible');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // ===== 7. SMOOTH SCROLL UNTUK NAV LINK =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ===== 8. FORM VALIDASI (untuk contact.html) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            let isValid = true;

            // Validasi nama
            if (name.value.trim() === '') {
                showError(name, 'Nama harus diisi');
                isValid = false;
            } else {
                clearError(name);
            }

            // Validasi email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Email tidak valid');
                isValid = false;
            } else {
                clearError(email);
            }

            // Validasi telepon
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone.value.trim())) {
                showError(phone, 'Nomor telepon hanya boleh angka');
                isValid = false;
            } else {
                clearError(phone);
            }

            // Validasi pesan
            if (message.value.trim() === '') {
                showError(message, 'Pesan harus diisi');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                showNotification('Pesan berhasil dikirim! Terima kasih 🎉', 'success');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.mb-3');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message text-danger small mt-1';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('is-invalid');
    }

    function clearError(input) {
        const formGroup = input.closest('.mb-3');
        const error = formGroup.querySelector('.error-message');
        if (error) error.remove();
        input.classList.remove('is-invalid');
    }

    function showNotification(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5`;
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.prepend(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }

    // ===== 9. FITUR FILTER PROYEK (untuk projects.html) =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            projectItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== 10. GALLERY LIGHTBOX (untuk gallery.html) =====
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: none; justify-content: center;
        align-items: center; z-index: 9999; cursor: pointer;
    `;
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            const clone = this.cloneNode();
            clone.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 12px;';
            lightbox.innerHTML = '';
            lightbox.appendChild(clone);
        });
    });

    lightbox.addEventListener('click', function() {
        this.style.display = 'none';
    });

    // ===== 11. DARK MODE TOGGLE (Opsional) =====
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

}); // end DOMContentLoaded

console.log('🚀 BuildPro Construction - Website loaded successfully!');