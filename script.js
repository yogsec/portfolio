// script.js - Abhinav Singwal Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (href !== currentPage) {
            link.classList.remove('active');
        }
    });
    
    // 2. Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target !== '#' && target !== '') {
                const element = document.querySelector(target);
                if (element) {
                    e.preventDefault();
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 3. Project repo links - dynamic handling (for preview clicks)
    const repoLinks = document.querySelectorAll('.repo-link');
    const githubUsername = 'yogsec';
    
    const projectRepos = {
        'wordpress-fix': 'https://github.com/yogsec/wordpress-fix',
        'BugBoard': 'https://yogsec.github.io/BugBoard',
        'cors': 'https://github.com/yogsec/cors'
    };
    
    repoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const repoKey = this.getAttribute('data-repo');
            if (repoKey && projectRepos[repoKey]) {
                e.preventDefault();
                window.open(projectRepos[repoKey], '_blank');
            } else if (this.href && this.href !== '#') {
                // already has valid href
                return;
            } else {
                e.preventDefault();
                console.log('Repository link will be configured when projects page is ready');
            }
        });
    });
    
    // 4. Add typing effect to hero badge (optional subtle animation)
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge && window.innerWidth > 768) {
        const originalText = heroBadge.innerText;
        const badgeTexts = ['VAPT | API Security', 'Bug Bounty Hunter', 'OWASP Top 10'];
        let index = 0;
        
        setInterval(() => {
            if (document.hasFocus() && heroBadge) {
                index = (index + 1) % badgeTexts.length;
                heroBadge.style.opacity = '0';
                setTimeout(() => {
                    if (heroBadge) heroBadge.innerText = badgeTexts[index];
                    heroBadge.style.opacity = '1';
                }, 150);
            }
        }, 3000);
    }
    
    // 5. Add a console greeting (for recruiters who inspect)
    console.log('%c Abhinav Singwal | VAPT Portfolio ', 'background: #1e293b; color: #3b82f6; font-size: 16px; padding: 8px 16px; border-radius: 8px;');
    console.log('%c Bug Hunter | API Pentester | 35+ PortSwigger labs', 'color: #475569; font-size: 12px;');
    
    // 6. Dynamic year in footer if needed
    const footerYear = document.querySelector('.footer small');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (footerYear.innerHTML.includes('2025')) {
            footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
        }
    }
    
    // 7. Add intersection observer for fade-in animations (simple)
    const fadeElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // 8. Handle blog card clicks (preview for writeups)
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, idx) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            // Simulate navigation to writeups page with query param
            window.location.href = 'writeups.html?preview=' + idx;
        });
    });
    
    // 9. Add tooltip for badges (Bootstrap 5 requires manual init)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // 10. Save visitor interaction for analytics (just local demo)
    const visitedBefore = localStorage.getItem('portfolio_visited');
    if (!visitedBefore) {
        localStorage.setItem('portfolio_visited', 'true');
        console.log('Welcome to Abhinav\'s security portfolio!');
    }
});