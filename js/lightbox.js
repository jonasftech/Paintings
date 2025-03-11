// Get references to the necessary elements
const overlay = document.getElementById('lightbox-overlay');
const closeBtn = document.getElementById('close-button');
const lightboxImage = document.getElementById('lightbox-image');
const galleryImages = document.querySelectorAll('#gallery img');

let currentIndex = 0;

// Open the overlay and set the lightbox image source
function openLightbox(imageSrc, index) {
    overlay.style.display = 'block';
    lightboxImage.src = imageSrc;
    currentIndex = index;
    document.querySelector('header').classList.add('hidden');
}

// Close the overlay
function closeLightbox() {
    overlay.style.display = 'none';
    lightboxImage.src = '';
    document.querySelector('header').style.transition = 'none';
    document.querySelector('header').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('header').style.transition = 'top 0.3s';
    }, 0);
}


// Attach click event listeners to gallery images
galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        if (window.innerWidth >= 1000) {
            // Only open the lightbox on desktop (screen width >= 1000px)
            openLightbox(image.src, index);
        }
    });
});

// Attach click event listener to close button
closeBtn.addEventListener('click', closeLightbox);

// Attach click event listener to overlay (background) to close lightbox
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closeLightbox();
    }
});

// Function to show the previous image
function showPreviousImage() {
    if (currentIndex > 0) {
        currentIndex--;
        // Skip images in the "img/overlays/" folder while navigating
        while (currentIndex >= 0 && galleryImages[currentIndex].src.includes("img/overlays/")) {
            currentIndex--;
        }
        if (currentIndex >= 0) {
            lightboxImage.src = galleryImages[currentIndex].src;
        }
    }
}

// Function to show the next image
function showNextImage() {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        // Skip images in the "img/overlays/" folder while navigating
        while (currentIndex < galleryImages.length && galleryImages[currentIndex].src.includes("img/overlays/")) {
            currentIndex++;
        }
        if (currentIndex < galleryImages.length) {
            lightboxImage.src = galleryImages[currentIndex].src;
        }
    }
}

// Attach keydown event listener for left and right arrow keys and Escape key
document.addEventListener('keydown', (event) => {
    if (overlay.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});
