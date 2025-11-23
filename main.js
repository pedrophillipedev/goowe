// Goowe Website JavaScript

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Smooth scrolling for navigation links
document.querySelectorAll('[data-scroll]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const decimals = element.getAttribute('data-decimals') || 0;
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        
        let displayValue = current;
        if (decimals > 0) {
            displayValue = current.toFixed(decimals);
        } else {
            displayValue = Math.floor(current);
        }
        
        // Format number with thousands separator
        displayValue = displayValue.toLocaleString('pt-BR');
        
        element.textContent = prefix + displayValue + suffix;
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('animate');
            
            // Animate counters
            const counters = entry.target.querySelectorAll('[data-counter]');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-counter'));
                animateCounter(counter, target);
            });
            
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.kpi-card, .dashboard-card, .solution-card, .feature-item').forEach(el => {
    observer.observe(el);
});

// Header background on scroll (verde mais claro)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.style.background = '#ffffff';
    header.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
});

// Chart bars animation
document.querySelectorAll('.bar').forEach((bar, index) => {
    const height = bar.style.height;
    bar.style.height = '0';
    
    setTimeout(() => {
        bar.style.transition = 'height 1s ease-out';
        bar.style.height = height;
    }, index * 200);
});

// Radar animation enhancement
function createRadarPulse() {
    document.querySelectorAll('.radar-screen, .tower-screen').forEach(target => {
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.top = '50%';
        pulse.style.left = '50%';
        pulse.style.width = '10px';
        pulse.style.height = '10px';
        pulse.style.background = 'rgba(34, 197, 94, 0.8)';
        pulse.style.borderRadius = '50%';
        pulse.style.transform = 'translate(-50%, -50%)';
        pulse.style.animation = 'radar-ping 2s ease-out forwards';
        target.appendChild(pulse);
        setTimeout(() => {
            pulse.remove();
        }, 2000);
    });
}

// Add radar pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes radar-ping {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create radar pulses periodically
setInterval(createRadarPulse, 3000);

// Contact form handling
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.';
        
        // Reset form
        contactForm.reset();
        
        // Store in localStorage for demo
        localStorage.setItem('goowe_contact', JSON.stringify({
            ...data,
            timestamp: new Date().toISOString()
        }));
        
    } catch (error) {
        // Show error message
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente.';
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
});

// Product list hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(8px)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

// Add floating animation to KPI cards
document.querySelectorAll('.kpi-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Enhanced mobile menu
if (window.innerWidth <= 768) {
    navMenu.style.position = 'fixed';
    navMenu.style.top = '0';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.bottom = '0';
    navMenu.style.background = 'rgba(14, 36, 51, 0.98)';
    navMenu.style.backdropFilter = 'blur(20px)';
    navMenu.style.zIndex = '999';
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.justifyContent = 'center';
    navMenu.style.alignItems = 'center';
    navMenu.style.transform = 'translateX(100%)';
    navMenu.style.transition = 'transform 0.3s ease';
    
    navMenu.classList.add('mobile-menu');
}

// Performance optimization: Lazy load animations
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.willChange = 'transform, opacity';
                
                // Remove will-change after animation
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 1000);
            }
        });
    });
    
    document.querySelectorAll('.animate').forEach(el => {
        lazyObserver.observe(el);
    });
}

// Console welcome message
console.log(`
    🚀 goowe - Torre de Controle para sua Operação
    
    Desenvolvido com 💚 para gestores que precisam de clareza e agilidade.
    
    Features disponíveis:
    • Dashboard interativo com animações
    • KPIs em tempo real
    • Gráficos animados
    • Radar de controle
    • Formulário de contato
    • Design responsivo
    
    Pronto para decolar? 🛫
`);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    document.body.classList.add('loaded');
    
    // Create initial radar pulse
    setTimeout(createRadarPulse, 1000);
    
    // Tabs: Top 10 Produtos por Loja
    const tabs = document.querySelectorAll('.tabs .tab');
    const lists = {
        centro: document.getElementById('store-centro'),
        norte: document.getElementById('store-norte'),
        sul: document.getElementById('store-sul'),
    };
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const store = tab.getAttribute('data-store');
            Object.values(lists).forEach(el => el.classList.add('hidden'));
            lists[store]?.classList.remove('hidden');
        });
    });
});