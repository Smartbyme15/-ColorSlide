// Image Gallery Data Object
const GalleryData = {
    images: [
        {
            id: 1,
            src: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Mountain Landscape",
            description: "Breathtaking mountain vista with golden sunset lighting",
            category: "nature"
        },
        {
            id: 2,
            src: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Ocean Waves",
            description: "Serene ocean waves meeting the sandy shore",
            category: "nature"
        },
        {
            id: 3,
            src: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Forest Path",
            description: "Mystical forest pathway surrounded by ancient trees",
            category: "nature"
        },
        {
            id: 4,
            src: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "City Skyline",
            description: "Modern city skyline illuminated at twilight",
            category: "urban"
        },
        {
            id: 5,
            src: "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Desert Dunes",
            description: "Golden sand dunes stretching to the horizon",
            category: "nature"
        },
        {
            id: 6,
            src: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Flower Garden",
            description: "Vibrant flower garden in full bloom",
            category: "nature"
        },
        {
            id: 7,
            src: "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Autumn Leaves",
            description: "Colorful autumn foliage in the countryside",
            category: "nature"
        },
        {
            id: 8,
            src: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
            title: "Starry Night",
            description: "Magnificent starry sky over peaceful landscape",
            category: "nature"
        }
    ]
};

// Image Slider Controller Object
const ImageSlider = {
    currentIndex: 0,
    isAutoPlaying: false,
    autoPlayInterval: null,
    autoPlayDelay: 4000,
    
    // Initialize the slider
    init() {
        this.renderSlides();
        this.renderThumbnails();
        this.renderIndicators();
        this.setupEventListeners();
        this.updateSlideCounter();
        this.showSlide(0);
    },
    
    // Render all slides
    renderSlides() {
        const slider = document.getElementById('imageSlider');
        slider.innerHTML = GalleryData.images.map((image, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="slide-info">
                    <h3 class="slide-title">${image.title}</h3>
                    <p class="slide-description">${image.description}</p>
                </div>
            </div>
        `).join('');
    },
    
    // Render thumbnail navigation
    renderThumbnails() {
        const container = document.getElementById('thumbnailContainer');
        container.innerHTML = GalleryData.images.map((image, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${image.src}" alt="${image.title}">
            </div>
        `).join('');
    },
    
    // Render slide indicators
    renderIndicators() {
        const container = document.getElementById('slideIndicators');
        container.innerHTML = GalleryData.images.map((_, index) => `
            <div class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
        
        // Update total slides count
        document.getElementById('totalSlides').textContent = GalleryData.images.length;
    },
    
    // Show specific slide
    showSlide(index) {
        // Validate index
        if (index < 0) index = GalleryData.images.length - 1;
        if (index >= GalleryData.images.length) index = 0;
        
        this.currentIndex = index;
        
        // Update slides
        document.querySelectorAll('.slide').forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update counter
        this.updateSlideCounter();
        
        // Trigger slide change animation
        this.animateSlideChange();
    },
    
    // Navigate to next slide
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    },
    
    // Navigate to previous slide
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    },
    
    // Update slide counter
    updateSlideCounter() {
        document.getElementById('currentSlide').textContent = this.currentIndex + 1;
    },
    
    // Animate slide change
    animateSlideChange() {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            activeSlide.style.animation = 'none';
            setTimeout(() => {
                activeSlide.style.animation = 'fadeInUp 0.6s ease-out';
            }, 10);
        }
    },
    
    // Toggle auto play
    toggleAutoPlay() {
        const button = document.getElementById('playPauseBtn');
        const icon = button.querySelector('i');
        const text = button.querySelector('span');
        
        if (this.isAutoPlaying) {
            this.stopAutoPlay();
            icon.className = 'fas fa-play';
            text.textContent = 'Auto Play';
            button.classList.remove('active');
        } else {
            this.startAutoPlay();
            icon.className = 'fas fa-pause';
            text.textContent = 'Pause';
            button.classList.add('active');
        }
    },
    
    // Start auto play
    startAutoPlay() {
        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    },
    
    // Stop auto play
    stopAutoPlay() {
        this.isAutoPlaying = false;
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },
    
    // Shuffle images
    shuffleImages() {
        // Create shuffled array
        const shuffled = [...GalleryData.images].sort(() => Math.random() - 0.5);
        GalleryData.images = shuffled;
        
        // Re-render everything
        this.renderSlides();
        this.renderThumbnails();
        this.renderIndicators();
        this.showSlide(0);
        
        // Show notification
        NotificationSystem.show('Gallery shuffled! 🎲', 'success');
    },
    
    // Toggle fullscreen
    toggleFullscreen() {
        const slider = document.querySelector('.slider-container');
        
        if (!document.fullscreenElement) {
            slider.requestFullscreen().then(() => {
                slider.classList.add('fullscreen-mode');
                const button = document.getElementById('fullscreenBtn');
                button.querySelector('i').className = 'fas fa-compress';
                button.querySelector('span').textContent = 'Exit Fullscreen';
            }).catch(err => {
                console.log('Fullscreen not supported:', err);
                NotificationSystem.show('Fullscreen not supported on this device', 'error');
            });
        } else {
            document.exitFullscreen().then(() => {
                slider.classList.remove('fullscreen-mode');
                const button = document.getElementById('fullscreenBtn');
                button.querySelector('i').className = 'fas fa-expand';
                button.querySelector('span').textContent = 'Fullscreen';
            });
        }
    },
    
    // Setup all event listeners
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        
        // Control buttons
        document.getElementById('playPauseBtn').addEventListener('click', () => this.toggleAutoPlay());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shuffleImages());
        
        // Thumbnail clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.thumbnail')) {
                const index = parseInt(e.target.closest('.thumbnail').dataset.index);
                this.showSlide(index);
            }
        });
        
        // Indicator clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.dataset.index);
                this.showSlide(index);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        const slider = document.getElementById('imageSlider');
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Mouse drag support
        let isDragging = false;
        
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            slider.style.cursor = 'grabbing';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        slider.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            endX = e.clientX;
            slider.style.cursor = 'grab';
            this.handleSwipe();
        });
        
        slider.addEventListener('mouseleave', () => {
            isDragging = false;
            slider.style.cursor = 'grab';
        });
        
        // Pause auto play on hover
        slider.addEventListener('mouseenter', () => {
            if (this.isAutoPlaying) {
                this.stopAutoPlay();
            }
        });
        
        slider.addEventListener('mouseleave', () => {
            if (document.getElementById('playPauseBtn').classList.contains('active')) {
                this.startAutoPlay();
            }
        });
    },
    
    // Handle swipe gestures
    handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
};

// Notification System Object
const NotificationSystem = {
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: this.getBackgroundColor(type),
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '300px',
            animation: 'slideInRight 0.3s ease-out',
            fontFamily: 'Poppins, sans-serif'
        });
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    },
    
    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },
    
    getBackgroundColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #7FB77E, #27AE60)',
            error: 'linear-gradient(135deg, #E74C3C, #C0392B)',
            warning: 'linear-gradient(135deg, #F39C12, #E67E22)',
            info: 'linear-gradient(135deg, #FFB3C1, #E91E63)'
        };
        return colors[type] || colors.info;
    }
};

// Animation Controller Object
const AnimationController = {
    // Animate elements on scroll
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe about section
        const aboutSection = document.querySelector('.about-content');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    },
    
    // Add staggered animation to elements
    staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * delay);
        });
    }
};

// Utility Functions Object
const Utils = {
    // Smooth scroll to element
    smoothScrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Generate random color
    getRandomColor() {
        const colors = ['#FFB3C1', '#FDEBD2', '#7FB77E', '#9B59B6', '#3498DB', '#E67E22', '#E74C3C', '#F1C40F'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// Main Application Controller
const App = {
    init() {
        // Initialize all components
        ImageSlider.init();
        AnimationController.observeElements();
        this.setupGlobalEventListeners();
        this.addLoadingEffects();
        
        // Show welcome notification
        setTimeout(() => {
            NotificationSystem.show('Welcome to ColorSlide Gallery! 🎨', 'success');
        }, 1000);
        
        // Add staggered animations
        setTimeout(() => {
            AnimationController.staggerAnimation('.feature-card', 200);
        }, 500);
    },
    
    setupGlobalEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                Utils.smoothScrollTo(targetId);
            });
        });
        
        // Header scroll effect
        const header = document.querySelector('.header');
        const handleScroll = Utils.debounce(() => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 248, 231, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(255, 179, 193, 0.1)';
            } else {
                header.style.background = 'rgba(255, 248, 231, 0.95)';
                header.style.boxShadow = 'none';
            }
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
        
        // Keyboard shortcuts info
        document.addEventListener('keydown', (e) => {
            if (e.key === '?' || e.key === 'h') {
                this.showKeyboardShortcuts();
            }
        });
    },
    
    addLoadingEffects() {
        // Add loading animation to images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                img.style.animation = 'fadeInUp 0.6s ease-out';
            });
        });
    },
    
    showKeyboardShortcuts() {
        const shortcuts = `
            <div style="text-align: left; line-height: 1.8;">
                <h4 style="margin-bottom: 15px; color: #FFB3C1;">⌨️ Keyboard Shortcuts</h4>
                <p><strong>←/→</strong> Navigate slides</p>
                <p><strong>Space</strong> Toggle auto play</p>
                <p><strong>F</strong> Toggle fullscreen</p>
                <p><strong>?/H</strong> Show this help</p>
            </div>
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            animation: fadeInUp 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 400px; position: relative;">
                ${shortcuts}
                <button onclick="this.closest('.modal').remove()" 
                        style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
        `;
        
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
};

// Color Theme Controller Object
const ColorThemeController = {
    themes: [
        {
            name: 'Pink Paradise',
            primary: '#FFB3C1',
            secondary: '#FDEBD2',
            accent: '#7FB77E'
        },
        {
            name: 'Ocean Breeze',
            primary: '#3498DB',
            secondary: '#AED6F1',
            accent: '#1ABC9C'
        },
        {
            name: 'Sunset Glow',
            primary: '#E67E22',
            secondary: '#F8C471',
            accent: '#E74C3C'
        },
        {
            name: 'Purple Dream',
            primary: '#9B59B6',
            secondary: '#D7BDE2',
            accent: '#8E44AD'
        },
        {
            name: 'Forest Green',
            primary: '#27AE60',
            secondary: '#A9DFBF',
            accent: '#229954'
        }
    ],
    
    currentTheme: 0,
    
    // Apply theme colors
    applyTheme(themeIndex) {
        const theme = this.themes[themeIndex];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-pink', theme.primary);
        root.style.setProperty('--peach-cream', theme.secondary);
        root.style.setProperty('--mint-green', theme.accent);
        
        this.currentTheme = themeIndex;
        NotificationSystem.show(`Theme changed to ${theme.name}! 🎨`, 'success');
    },
    
    // Cycle through themes
    nextTheme() {
        const nextIndex = (this.currentTheme + 1) % this.themes.length;
        this.applyTheme(nextIndex);
    }
};

// Performance Monitor Object
const PerformanceMonitor = {
    startTime: performance.now(),
    
    logLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`🚀 Gallery loaded in ${loadTime.toFixed(2)}ms`);
        });
    },
    
    // Monitor slider performance
    monitorSliderPerformance() {
        let slideChangeCount = 0;
        const originalShowSlide = ImageSlider.showSlide;
        
        ImageSlider.showSlide = function(index) {
            const start = performance.now();
            originalShowSlide.call(this, index);
            const end = performance.now();
            
            slideChangeCount++;
            console.log(`Slide change #${slideChangeCount} took ${(end - start).toFixed(2)}ms`);
        };
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    PerformanceMonitor.logLoadTime();
    PerformanceMonitor.monitorSliderPerformance();
    
    // Add theme cycling button (hidden feature)
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' || e.key === 'T') {
            ColorThemeController.nextTheme();
        }
    });
    
    console.log('🎨 ColorSlide Gallery initialized successfully!');
    console.log('💡 Press "T" to cycle through color themes');
    console.log('💡 Press "?" for keyboard shortcuts');
});

// Export objects for potential external use
window.ImageSlider = ImageSlider;
window.GalleryData = GalleryData;
window.ColorThemeController = ColorThemeController;