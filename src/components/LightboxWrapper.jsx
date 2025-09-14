import { useState } from 'preact/hooks';
import Lightbox from './Lightbox.jsx';
import './LightboxWrapper.css';

const LightboxWrapper = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={image.src} className="image-item">
            <img 
              src={image.src} 
              alt={image.alt}
              onClick={() => openLightbox(index)}
              className="grid-image"
            />
            {image.caption && (
              <p className="image-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={images[currentImageIndex]?.src}
        imageAlt={images[currentImageIndex]?.alt}
      />
    </>
  );
};

export default LightboxWrapper;