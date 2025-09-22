// Mobile menu toggle functionality
function toggleMenu() {
    const menu = document.getElementById('mainMenu');
    menu.classList.toggle('active');
}

// Close menu when clicking outside of it (mobile only)
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mainMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // Check if we're in mobile view
    if (window.innerWidth <= 768) {
        // If click is outside menu and menu button, close the menu
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menu.classList.remove('active');
        }
    }
});

// Handle window resize - close mobile menu if switching to desktop view
window.addEventListener('resize', function() {
    const menu = document.getElementById('mainMenu');
    
    if (window.innerWidth > 768) {
        menu.classList.remove('active');
    }
});

// Add click handlers to menu buttons (optional - for future functionality)
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    
    menuButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            console.log('Clicked on: ' + buttonText);
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                const menu = document.getElementById('mainMenu');
                menu.classList.remove('active');
            }
            
            // Here you can add navigation logic for each button
            // For now, just log which button was clicked
        });
    });
});