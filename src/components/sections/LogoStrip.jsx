import './LogoStrip.css';

const logos = [
  {
    src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091913/Gemini_Generated_Image_qlkfz8qlkfz8qlkf_qxcdiv.png',
    alt: 'VMRF'
  },
  {
    // ⚠️ REPLACE THIS URL with your actual AICTE logo on Cloudinary
    src: 'https://res.cloudinary.com/damisreoh/image/upload/v1777091751/AICTE_umarzo.webp',
    alt: 'AICTE'
  },
  {
    // ⚠️ REPLACE THIS URL with your actual NAAC logo on Cloudinary
    src: 'https://res.cloudinary.com/damisreoh/image/upload/v1777091950/NAAC_zlgthg.png',
    alt: 'NAAC'
  },
  {
    // ⚠️ REPLACE THIS URL with your actual 25 Years logo on Cloudinary
    src: 'https://res.cloudinary.com/damisreoh/image/upload/v1777091881/25-_NEW_final_tfkexe.png',
    alt: '25 Years'
  }
];

export default function LogoStrip() {
  return (
    <div className="logo-strip" aria-label="Accreditations and affiliations">
      <div className="logo-strip-inner">
        {logos.map((logo, index) => (
          <div className="logo-strip-item" key={index}>
            <img
              src={logo.src}
              alt={logo.alt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}