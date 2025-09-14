import { useState } from 'preact/hooks';
import Lightbox from './Lightbox.jsx';
import './ImageSwitcher.css'; // We'll create this next

const ImageSwitcher = ({ images = [], alt = "Switchable image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images.length) {
    return <div>No images provided</div>;
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-switcher-container">
      <img 
        src={images[currentIndex]} 
        alt={`${alt} ${currentIndex + 1}`}
        className="switcher-image"
        onClick={() => setLightboxOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      
      <button 
        className="switch-button switch-button-next"
        onClick={handleNextImage}
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Optional: Add previous button */}
      <button 
        className="switch-button switch-button-prev"
        onClick={handlePrevImage}
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Optional: Image indicators */}
      <div className="image-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentIndex]}
        imageAlt={`${alt} ${currentIndex + 1}`}
      />
    </div>
  );
};

export default ImageSwitcher;