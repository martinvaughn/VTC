// Vaughn | LinkedIn Growth Lab - Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initThemeToggle();
    
    // Initialize animations
    initAnimations();
    
    // Set up scroll effects
    initScrollEffects();
    
    // Initialize cursor follower
    initCursorFollower();
    
    // Set up form validation
    initFormValidation();
    
    // Initialize graph animation
    animateGraph();
});

/**
 * Initialize dark/light mode theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    // Add toggle event listener
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Play subtle click sound
        playToggleSound();
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Add subtle animation effect
        themeToggle.classList.add('animate');
        setTimeout(() => {
            themeToggle.classList.remove('animate');
        }, 300);
    });
    
    // Add hover effect for cursor follower
    themeToggle.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) {
            cursor.style.transform = `translate(${themeToggle.getBoundingClientRect().x + themeToggle.offsetWidth/2}px, ${themeToggle.getBoundingClientRect().y + themeToggle.offsetHeight/2}px) scale(1.5)`;
            cursor.style.background = document.body.classList.contains('dark-mode') ? 
                'rgba(52, 199, 89, 0.2)' : 'rgba(233, 233, 234, 0.3)';
        }
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.cursor-follower');
        if (cursor) {
            cursor.style.background = 'rgba(93, 0, 255, 0.15)';
        }
    });
}

/**
 * Play a subtle toggle sound
 */
function playToggleSound() {
    // Create an audio context
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        
        // Create oscillator
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Set parameters
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(
            document.body.classList.contains('dark-mode') ? 800 : 600, 
            audioCtx.currentTime
        );
        
        // Set volume
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        
        // Connect and play
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
    } catch(e) {
        // Silent fail if audio isn't supported
        console.log('Audio not supported');
    }
}

/**
 * Initialize animations that occur on page load
 */
function initAnimations() {
    // Fade in hero elements sequentially with a staggered effect
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        }, 200 * (index + 1));
    });
    
    // Animate blobs
    const blobs = document.querySelectorAll('.gradient-blob');
    blobs.forEach(blob => {
        blob.style.transition = 'transform 15s ease-in-out';
        
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            blob.style.transform = `translate(${randomX}%, ${randomY}%) scale(${0.95 + Math.random() * 0.1})`;
        }, 5000);
    });
    
    // Add slight hover effect to cards
    const cards = document.querySelectorAll('.problem-card, .step-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
    });
}

/**
 * Initialize cursor follower effect
 */
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    
    cursor.style.display = 'block';
    
    let cursorVisible = false;
    let cursorEnlarged = false;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', e => {
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
        
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${cursorEnlarged ? 1.2 : 1})`;
    });
    
    // Mouse leave body
    document.addEventListener('mouseleave', e => {
        cursor.style.opacity = '0';
        cursorVisible = false;
    });
    
    // Mouse click
    document.addEventListener('mousedown', e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.8)`;
    });
    
    document.addEventListener('mouseup', e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
    
    // Link hover
    const links = document.querySelectorAll('a, button, .testimonial-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${link.getBoundingClientRect().x}px, ${link.getBoundingClientRect().y}px) scale(1.5)`;
            cursor.style.background = 'rgba(93, 0, 255, 0.2)';
            cursorEnlarged = true;
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.background = 'rgba(93, 0, 255, 0.15)';
            cursorEnlarged = false;
        });
    });
}

/**
 * Initialize scroll-based effects
 */
function initScrollEffects() {
    // Add animation classes to elements that should animate on scroll
    const elementsToAnimate = [
        { selector: '.section-eyebrow', animation: 'fade-in' },
        { selector: 'h2', animation: 'fade-in' },
        { selector: '.problem-card', animation: 'fade-in' },
        { selector: '.step-card', animation: 'fade-in' },
        { selector: '.stat-item', animation: 'fade-in' },
        { selector: '.benefit-item', animation: 'slide-in-left' },
        { selector: '.testimonial-card', animation: 'fade-in' },
        { selector: '.mockup-frame', animation: 'fade-in' },
        { selector: '.decorative-element', animation: 'fade-in' }
    ];
    
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            element.classList.add(item.animation);
        });
    });
    
    // Observe elements and trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For graph bars, add a special animation delay
                if (entry.target.classList.contains('graph-bar')) {
                    const bars = document.querySelectorAll('.graph-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.opacity = '1';
                        }, index * 100);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .graph-bar').forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Animate the graph bars
 */
function animateGraph() {
    const graphBars = document.querySelectorAll('.graph-bar');
    
    graphBars.forEach(bar => {
        // Store the target height in a data attribute
        const height = bar.style.height;
        bar.dataset.targetHeight = height;
        bar.style.height = '0%';
        bar.style.opacity = '0';
    });
    
    // The actual animation is handled by the intersection observer in initScrollEffects()
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Check if all fields are valid
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                highlightInvalidField(input);
            } else {
                removeInvalidHighlight(input);
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                const formContainer = form.closest('.contact-form-container');
                formContainer.innerHTML = `
                    <div class="success-message">
                        <h3>Thanks for reaching out!</h3>
                        <p>I'll be in touch shortly to schedule your free LinkedIn strategy session.</p>
                        <div class="checkmark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
                                <circle cx="12" cy="12" r="11" fill="none" stroke="var(--primary)" stroke-width="2"/>
                                <path d="M7 13l3 3 7-7" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                `;
            }, 1500);
        }
    });
    
    // Real-time validation
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                removeInvalidHighlight(input);
            }
        });
    });
    
    // Add visual feedback on focus
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Highlight an invalid form field
 */
function highlightInvalidField(field) {
    field.classList.add('invalid');
    
    // Create error message if it doesn't exist
    if (!field.parentElement.querySelector('.error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'This field is required';
        field.parentElement.appendChild(errorMessage);
        
        // Animate error message
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            errorMessage.style.opacity = '1';
            errorMessage.style.transform = 'translateY(0)';
            errorMessage.style.transition = 'opacity 0.3s, transform 0.3s';
        }, 10);
    }
}

/**
 * Remove invalid highlight from a form field
 */
function removeInvalidHighlight(field) {
    field.classList.remove('invalid');
    
    // Remove error message if it exists
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            errorMessage.remove();
        }, 300);
    }
}

// Add styles for validation and errors
const style = document.createElement('style');
style.textContent = `
    .form-group.focused label {
        color: var(--primary);
    }
    
    input.invalid, select.invalid {
        border-color: #FF3366 !important;
        background-color: rgba(255, 51, 102, 0.05);
    }
    
    .error-message {
        color: #FF3366;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
    
    .success-message {
        text-align: center;
        padding: 3rem 1rem;
    }
    
    .success-message h3 {
        color: var(--primary);
        margin-bottom: 1rem;
    }
    
    .checkmark {
        margin-top: 2rem;
        animation: scale-in 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    
    @keyframes scale-in {
        0% { transform: scale(0); }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add styles for theme toggle animation
const themeToggleStyle = document.createElement('style');
themeToggleStyle.textContent = `
    .theme-toggle.animate {
        animation: scale-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    @keyframes scale-bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(themeToggleStyle); 