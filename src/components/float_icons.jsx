import { FaWhatsapp } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';

export const PhoneFloat = () => {
  return (
    <a
      className="phone-float"
      href="tel:+918056477261"
      aria-label="Call Login360"
    >
      <FaPhone size={24} color="#fff" />
    </a>
  );
};

const WhatsappFloat = () => {
    return(
        <a
        className="whatsapp-float"
        href="https://wa.me/918056477261?text=Hi%20Login360%2C%20I%20want%20to%20know%20about%20the%20Course%20details"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} color="#fff" />
      </a>
    )
}

export default WhatsappFloat;