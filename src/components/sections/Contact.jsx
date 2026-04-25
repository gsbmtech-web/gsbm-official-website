import { memo } from 'react';
import { Ac1 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import './Contact.css';

const Contact = () => {
  return (
    <section className="sec-sky" id="contact">
      <div className="W">
        <SectionHeader
          kicker="Contact Us"
          title="We're Here to Help"
          subtitle="Reach our admissions team for any query about the MBA program, eligibility, fees, campus visits, or anything else."
          kickerClass="kred"
        />

        <div className="contact-cards-grid">
          <div className="contact-card">
            <p className="contact-card-icon" aria-hidden="true">📞</p>
            <p className="contact-card-label">Manager Admissions</p>
            <a href="tel:+919841283764" className="contact-card-value">+91 98412 83764</a>
          </div>
          <div className="contact-card">
            <p className="contact-card-icon" aria-hidden="true">📞</p>
            <p className="contact-card-label">Counselor Tel</p>
            <div className="contact-card-value">
              <a href="tel:9791476444">+91 9791476444</a>, <a href="tel:9791658444">+91 9791658444</a>
            </div>
          </div>
          <div className="contact-card">
            <p className="contact-card-icon" aria-hidden="true">📧</p>
            <p className="contact-card-label">Email</p>
            <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="contact-card-value">
              manageradmissionsgsbm@vinayakamissions.com
            </a>
          </div>
          <div className="contact-card">
            <p className="contact-card-icon" aria-hidden="true">📍</p>
            <p className="contact-card-label">Address</p>
            <p className="contact-card-value">
              Vinayaka Nagar, Rajiv Gandhi Salai (Old Mahabalipuram Road), Chennai - 603 104
            </p>
          </div>
          <div className="contact-card">
            <p className="contact-card-icon" aria-hidden="true">💬</p>
            <p className="contact-card-label">WhatsApp</p>
            <a href="https://wa.me/919841283764" className="contact-card-value">+91 98412 83764</a>
          </div>
        </div>

        <Ac1 title="Campus Location & Map">
          <div className="contact-map-container">
            <p className="body-text contact-map-text">
              GSBM is located at the Old Mahabalipuram Road (OMR), Chennai.
              Easily accessible by road with regular bus and cab connectivity.
            </p>
            <iframe
              title="GSBM Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.18!2d80.1951!3d12.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259c3c97b6a6b%3A0x80c7f7b9d5a2e2c1!2sAarupadai%20Veedu%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1"
              className="contact-map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Ac1>
      </div>
    </section>
  );
};

export default memo(Contact);