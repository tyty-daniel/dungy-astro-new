import { useState } from 'preact/hooks';
import Lightbox from './Lightbox.jsx';

const LightboxImage = ({ src, alt, className = "" }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <img 
        src={src} 
        alt={alt}
        className={className}
        onClick={() => setLightboxOpen(true)}
        style={{ cursor: 'pointer' }}
      />

      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={src}
        imageAlt={alt}
      />
    </>
  );
};

export default LightboxImage;