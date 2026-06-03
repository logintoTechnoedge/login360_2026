import { FaGraduationCap, FaPhone, FaWhatsapp } from 'react-icons/fa';

const ContactBanner = ({page , openPopup}) => {
    return(
        <section className="cta-banner" id="final-cta">
            <span className="section-tag">Action</span>
            <div className="container">
            <h2>Your IT Career Starts Here. Don't Wait Any Longer.</h2>
            <p>
                Every day you delay is another day without a job. Take the first step — it's completely FREE.
                Book your demo class now.
            </p>
            <div className="btn-group">
                <a className="btn btn-accent btn-lg" onClick={() => openPopup({ heading: `Book Free Demo Class`, btnText: "Book now", formType: `${page} Footer Book Demo` })}>
                    <FaGraduationCap size={16} /> Book Free Demo Class
                </a>
                <a href="tel:+918056477261" className="btn btn-ghost btn-lg bg-blue">
                    <FaPhone size={15} /> Call Us Now
                </a>
                <a href="https://wa.me/918056477261" className="btn btn-success btn-lg">
                    <FaWhatsapp size={17} /> WhatsApp Us
                </a>
            </div>
            {/* <p style={{ marginTop: 28, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
                📍 Velachery | Coimbatore | Kochi | Online Across India
            </p> */}
            </div>
        </section>
    )
}

export default ContactBanner;