// Force light mode
function forceLightMode() {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#FAF8F5');
    document.documentElement.style.colorScheme = 'light';
}

// Apply light mode on load and when system changes
document.addEventListener('DOMContentLoaded', () => {
    forceLightMode();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', forceLightMode);
});

// Mobile Menu
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const navLinks = document.querySelectorAll('.nav-links a');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    
    // Toggle aria-expanded for accessibility
    const isExpanded = mobileMenu.classList.contains('active');
    mobileMenuIcon.setAttribute('aria-expanded', isExpanded);
}

// Add event listeners for mobile menu
mobileMenuIcon?.addEventListener('click', toggleMobileMenu);
mobileMenuClose?.addEventListener('click', toggleMobileMenu);
mobileMenuOverlay?.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter on load
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = typewriterElement.getAttribute('data-text');
        if (text) {
            typeWriter(typewriterElement, text);
        }
    }
});

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const endValue = parseInt(statNumber.getAttribute('data-value'));
                animateValue(statNumber, 0, endValue, 2000);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear the timeout if it exists
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Add scroll class to header
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Handle header hide/show on scroll
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Set a timeout to remove scroll classes after scrolling stops
    scrollTimeout = setTimeout(() => {
        header.classList.remove('scroll-up', 'scroll-down');
    }, 1000);
});

// Initialize Swiper for Benefits Section
if (typeof Swiper !== 'undefined') {
    new Swiper('.benefits-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}

// AOS Animation
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Battery Level Animation (if exists)
const batteryLevel = document.querySelector('.battery-level-indicator');
if (batteryLevel) {
    const level = parseInt(batteryLevel.getAttribute('data-level'));
    const colors = {
        high: '#4CAF50',
        medium: '#FFC107',
        low: '#F44336'
    };
    
    let color = colors.high;
    if (level <= 20) color = colors.low;
    else if (level <= 50) color = colors.medium;
    
    batteryLevel.style.width = `${level}%`;
    batteryLevel.style.backgroundColor = color;
}

// Form Validation (if exists)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Add your form submission logic here
            console.log('Form submitted successfully');
            this.reset();
        }
    });
    
    // Remove error class on input
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Lazy Loading Images
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported, no need for additional code
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Buy Button Click Handler
const buyButtons = document.querySelectorAll('.btn-buy');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Chuyển hướng đến trang thanh toán...');
        // Add your checkout page URL here
        // window.location.href = 'checkout.html';
    });
});

// Scroll to Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.className = 'scroll-to-top';
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0066cc;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: background-color 0.3s ease;
    }
    
    .scroll-to-top:hover {
        background: #004d99;
    }
`;
document.head.appendChild(style);

// Animate benefit items on scroll
const benefitItems = document.querySelectorAll('.benefit-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

benefitItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Battery level indicator (for demonstration)
const batteryLevel1 = document.createElement('div');
batteryLevel1.className = 'battery-level';
batteryLevel1.innerHTML = `
    <div class="battery-icon">
        <div class="battery-level-indicator"></div>
    </div>
    <span class="battery-text">100%</span>
`;
document.querySelector('.product-info-text').appendChild(batteryLevel);

// Add styles for battery level indicator
const batteryStyle = document.createElement('style');
batteryStyle.textContent = `
    .battery-level {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
    }
    
    .battery-icon {
        width: 40px;
        height: 20px;
        border: 2px solid #333;
        border-radius: 3px;
        padding: 2px;
        position: relative;
    }
    
    .battery-icon:after {
        content: '';
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 8px;
        background: #333;
        border-radius: 0 2px 2px 0;
    }
    
    .battery-level-indicator {
        height: 100%;
        width: 100%;
        background: #4CAF50;
        border-radius: 1px;
    }
    
    .battery-text {
        font-weight: 600;
        color: #333;
    }
`;
document.head.appendChild(batteryStyle);

// Product details toggle
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    /* --- Xử lý chức năng chuyển đổi giữa Overview và Details --- */

    const overviewContent = document.getElementById('overview-content');
    const detailsContent = document.getElementById('details-content');
    // Lấy tất cả các tiêu đề có thể click để chuyển đổi
    const clickableTitles = document.querySelectorAll('.clickable-title');

    // Hàm để hiển thị một nội dung và ẩn nội dung còn lại
    function showContent(contentToShow) {
        if (contentToShow === 'overview-content') {
            overviewContent.style.display = 'block'; // Hiện overview
            detailsContent.style.display = 'none';   // Ẩn details
        } else if (contentToShow === 'details-content') {
            overviewContent.style.display = 'none';  // Ẩn overview
            detailsContent.style.display = 'block';  // Hiện details
        }
        // Sau khi chuyển đổi, làm mới AOS để các animation mới được kích hoạt nếu cần
        AOS.refreshHard();
    }

    // Gắn sự kiện click cho các tiêu đề có class 'clickable-title'
    clickableTitles.forEach(title => {
        title.addEventListener('click', function() {
            const targetContentId = this.dataset.target; // Lấy giá trị từ data-target
            showContent(targetContentId);
        });
    });

    // Mặc định hiển thị overview khi tải trang (đảm bảo CSS ban đầu đã ẩn details)
    showContent('overview-content');


    /* --- Xử lý ẩn/hiện Header khi cuộn trang --- */

    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
            header.classList.add('hidden');
        } else if (window.scrollY < lastScrollY) {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    /* --- Xử lý Mobile Menu --- */

    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuIcon && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
        mobileMenuIcon.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
});

// Product Slider
document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const cards = document.querySelectorAll('.product-card');
    
    if (!productGrid || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const cardsPerView = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = cards.length - cardsPerView;

    function updateSlider() {
        const offset = currentIndex * (cardWidth + gap);
        productGrid.style.transform = `translateX(-${offset}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    // Button navigation
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Initialize slider
    updateSlider();
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Elements
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const nav = document.querySelector('nav');

    // Toggle Mobile Menu
    function toggleMobileMenu() {
        nav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    // Event Listeners
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close Mobile Menu on Window Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Close Mobile Menu on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (Giữ nguyên các script đã có của bạn, ví dụ: AOS.init, showContent function, header scroll, mobile menu) ...

    /* --- Xử lý Accordion cho Footer Sections (chỉ trên Mobile) --- */
    const footerSections = document.querySelectorAll('.site-footer__section');
    const breakpoint = 992;

    function setupFooterAccordion() {
        footerSections.forEach(section => {
            const heading = section.querySelector('.site-footer__heading');
            let toggleButton = section.querySelector('.site-footer__section-toggle');
            const contentWrapper = section.querySelector('.site-footer__section-content');

            if (!heading || !contentWrapper) return;

            if (window.innerWidth <= breakpoint) {
                if (!toggleButton) {
                    toggleButton = document.createElement('button');
                    toggleButton.classList.add('site-footer__section-toggle');
                    toggleButton.innerHTML = `<i class="fas fa-chevron-down"></i>`;
                    heading.parentNode.insertBefore(toggleButton, heading);
                    
                    toggleButton.addEventListener('click', function() {
                        contentWrapper.classList.toggle('active');
                        toggleButton.classList.toggle('active');

                        if (contentWrapper.classList.contains('active')) {
                            contentWrapper.style.height = contentWrapper.scrollHeight + 'px';
                            contentWrapper.style.opacity = '1';
                            contentWrapper.style.overflow = 'visible';
                        } else {
                            contentWrapper.style.height = '0';
                            contentWrapper.style.opacity = '0';
                            contentWrapper.style.overflow = 'hidden';
                        }
                    });
                }
                toggleButton.style.display = 'flex';
                heading.style.display = 'block';

                contentWrapper.classList.remove('active');
                toggleButton.classList.remove('active');
                contentWrapper.style.height = '0';
                contentWrapper.style.opacity = '0';
                contentWrapper.style.overflow = 'hidden';

            } else {
                if (toggleButton) {
                    toggleButton.style.display = 'none';
                    toggleButton.classList.remove('active');
                }
                heading.style.display = 'block';

                contentWrapper.classList.add('active');
                contentWrapper.style.height = 'auto';
                contentWrapper.style.opacity = '1';
                contentWrapper.style.overflow = 'visible';
            }
        });
    }

    setupFooterAccordion();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupFooterAccordion();
            AOS.refreshHard();
        }, 250);
    });
});

