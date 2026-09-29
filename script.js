/* Lightbox Modal Functionality */

// Get the modal
const modal = document.getElementById('lightbox-modal');
const closeBtn = document.querySelector('.close-btn');
const modalImg = document.getElementById('modal-img');
const zoomInBtn = document.querySelector('.zoom-in-btn');
const zoomOutBtn = document.querySelector('.zoom-out-btn');
const zoomControls = document.querySelector('.zoom-controls');

// Zoom tracking
let currentZoom = 1;
const minZoom = 1;
const maxZoom = 3;
const zoomStep = 0.2;

// Get all project images
const projectImages = document.querySelectorAll('.project-img');

// Open modal when image is clicked
projectImages.forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = 'flex';
    modal.classList.add('active');
    zoomControls.classList.add('active');
    modalImg.src = this.src;
    currentZoom = 1;
    modalImg.style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  modal.classList.remove('active');
  zoomControls.classList.remove('active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    zoomControls.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
    modal.classList.remove('active');
    zoomControls.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Zoom in functionality
if (zoomInBtn) {
  zoomInBtn.addEventListener('click', function() {
    if (currentZoom < maxZoom) {
      currentZoom += zoomStep;
      modalImg.style.transform = `scale(${currentZoom})`;
      updateZoomButtons();
    }
  });
}

// Zoom out functionality
if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', function() {
    if (currentZoom > minZoom) {
      currentZoom -= zoomStep;
      modalImg.style.transform = `scale(${currentZoom})`;
      updateZoomButtons();
    }
  });
}

// Mousewheel zoom functionality
modal.addEventListener('wheel', function(event) {
  if (modal.style.display === 'flex') {
    event.preventDefault();
    if (event.deltaY < 0) {
      // Scroll up - zoom in
      if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
      }
    } else {
      // Scroll down - zoom out
      if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
      }
    }
    modalImg.style.transform = `scale(${currentZoom})`;
    updateZoomButtons();
  }
});

// Update zoom button states
function updateZoomButtons() {
  if (zoomInBtn) zoomInBtn.disabled = currentZoom >= maxZoom;
  if (zoomOutBtn) zoomOutBtn.disabled = currentZoom <= minZoom;
}
