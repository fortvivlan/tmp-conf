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

// Submenu toggle functionality
function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    const button = submenu.previousElementSibling;
    
    if (submenu.classList.contains('active')) {
        submenu.classList.remove('active');
        button.classList.remove('active');
    } else {
        // Close all other submenus first
        const allSubmenus = document.querySelectorAll('.submenu');
        const allExpandableButtons = document.querySelectorAll('.expandable');
        
        allSubmenus.forEach(function(menu) {
            menu.classList.remove('active');
        });
        
        allExpandableButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // Open the clicked submenu
        submenu.classList.add('active');
        button.classList.add('active');
    }
}

// Add click handlers to menu buttons (optional - for future functionality)
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-btn:not(.expandable)');
    
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

// Photo Gallery Modal Functionality
let currentImageIndex = 0;
let currentGalleryImages = [];

function openModal(imageSrc, galleryImages, imageIndex) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    
    currentGalleryImages = galleryImages;
    currentImageIndex = imageIndex;
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    
    // Disable body scrolling
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    if (currentGalleryImages.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        const modalImg = document.getElementById('modalImage');
        modalImg.src = currentGalleryImages[currentImageIndex];
    }
}

function showNextImage() {
    if (currentGalleryImages.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        const modalImg = document.getElementById('modalImage');
        modalImg.src = currentGalleryImages[currentImageIndex];
    }
}

// Initialize photo gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    if (photoItems.length > 0) {
        // Create modal HTML if it doesn't exist
        if (!document.getElementById('photoModal')) {
            const modalHTML = `
                <div id="photoModal" class="modal">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <button class="modal-nav modal-prev" onclick="showPrevImage()">❮</button>
                    <div class="modal-content">
                        <img id="modalImage" src="" alt="Conference Photo">
                    </div>
                    <button class="modal-nav modal-next" onclick="showNextImage()">❯</button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        // Collect all images in the gallery
        const galleryImages = Array.from(photoItems).map(item => 
            item.querySelector('img').src
        );
        
        // Add click handlers to photo items
        photoItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                openModal(imgSrc, galleryImages, index);
            });
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowLeft') {
        showPrevImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    }
});

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
});