import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './mobile.css';
import { validateFormSubmission, validateURL } from './security/validation';

function App() {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('nav-scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoSrc = () => {
    try {
      return validateURL('https://videos.pexels.com/video-files/2121158/2121158-hd_1920_1080_24fps.mp4');
    } catch (error) {
      console.error('Invalid video URL:', error);
      return '';
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    const { isValid, errors, sanitizedData } = validateFormSubmission(formData);
    
    if (!isValid) {
      alert(errors.join('\n'));
      return;
    }

    // Process sanitized form data
    try {
      // Add your form submission logic here
      console.log('Form submitted:', sanitizedData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Chronicle of Cloth | Luxury Indian Textiles & Heritage Weaves</title>
        <meta name="description" content="Discover exquisite handcrafted Indian textiles at Chronicle of Cloth. Explore our collection of heritage weaves, including Kanchipuram silks, Banarasi weaves, and traditional textiles." />
        <meta name="keywords" content="Indian textiles, luxury sarees, Kanchipuram silk, Banarasi weaves, traditional Indian clothing, handloom sarees" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="parallax-background"></div>
      
      <nav className="main-nav" ref={navRef}>
        <div className="nav-content">
          <a href="#" className="logo-link" onClick={(e) => { 
            e.preventDefault(); 
            window.history.pushState("", document.title, window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="animated-logo">CoC</div>
          </a>
          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <ul className={`nav-links-left ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#collections" className="nav-link">Collection</a></li>
          </ul>
          <ul className={`nav-links-right ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <video className="background-video animate-fade-in" autoPlay muted loop playsInline>
          <source src={handleVideoSrc()} type="video/mp4" />
        </video>
        <div className="hero-content animate-fade-in-up">
          <h1 className="hero-title">
            <span className="hero-title-part animate-glow">Chronicle</span>
            <span className="hero-title-part animate-glow">of</span>
            <span className="hero-title-part animate-glow">Cloth</span>
          </h1>
          <p className="tagline animate-fade-in">Woven Legends</p>
          <div className="luxury-divider animate-fade-in"></div>
          <p className="location animate-fade-in">Est. 2015 • Bengaluru, India</p>
          <div className="scroll-indicator animate-float">
            <span className="scroll-arrow animate-scroll"></span>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-content">
          <h2 className="section-title">Our Legacy</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-description">Since 2015, Chronicle of Cloth has been at the forefront of preserving India's rich textile heritage. Based in the vibrant city of Bengaluru, we blend centuries-old craftsmanship with contemporary design sensibilities.</p>
            </div>
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">🧵</span>
                <h3>Artisanal Craft</h3>
                <p>Hand-woven excellence</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <h3>Sustainable</h3>
                <p>Eco-conscious processes</p>
              </div>
              <div className="feature">
                <span className="feature-icon">💫</span>
                <h3>Heritage</h3>
                <p>Traditional techniques</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🤝</span>
                <h3>Fair Trade</h3>
                <p>Artisan empowerment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section" id="collections">
        <div className="section-content">
          <h2 className="section-title">Sacred Textiles</h2>
          <div className="collection-grid">
            <div className="collection-card">
              <div className="collection-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/12814967/pexels-photo-12814967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="collection-overlay">
                  <h3>Kanchipuram Heritage</h3>
                  <p>Hand-woven silk saree with traditional temple borders</p>
                  <span className="collection-price">₹24,999</span>
                </div>
              </div>
            </div>
            <div className="collection-card">
              <div className="collection-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/10679171/pexels-photo-10679171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="collection-overlay">
                  <h3>Banarasi Dreams</h3>
                  <p>Pure silk with intricate zari work</p>
                  <span className="collection-price">₹18,499</span>
                </div>
              </div>
            </div>
            <div className="collection-card">
              <div className="collection-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/5755160/pexels-photo-5755160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="collection-overlay">
                  <h3>Ajrakh Collection</h3>
                  <p>Hand-block printed cotton with natural dyes</p>
                  <span className="collection-price">₹9,999</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="testimonials">
        <div className="section-content">
          <h2 className="section-title">Client Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">★★★★★</div>
                <p>"The Kanchipuram Heritage saree exceeded all my expectations. The attention to detail and quality of craftsmanship is remarkable."</p>
                <div className="testimonial-author">- Priya Sharma</div>
                <div className="testimonial-location">Delhi</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">★★★★★</div>
                <p>"Chronicle of Cloth's commitment to preserving traditional techniques while creating modern designs is truly commendable."</p>
                <div className="testimonial-author">- Rajesh Iyer</div>
                <div className="testimonial-location">Mumbai</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-stars">★★★★★</div>
                <p>"Each piece tells a story of heritage and craftsmanship. The Banarasi Dreams collection is absolutely stunning."</p>
                <div className="testimonial-author">- Anita Reddy</div>
                <div className="testimonial-location">Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section" id="contact">
        <div className="section-content">
          <h2 className="section-title">Weave Your Story With Us</h2>
          <div className="contact-grid">
            <div className="contact-form-container">
              <h3 className="contact-subtitle">Get in Touch</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
            <div className="contact-image-container">
              <img 
                src="https://images.pexels.com/photos/2166456/pexels-photo-2166456.jpeg" 
                alt="Traditional Indian textile weaving" 
                className="contact-image"
              />
            </div>
            <div className="contact-info">
              <div className="info-item">
                <h3>Visit Our Studio</h3>
                <p>123 Silk Road, Indiranagar<br />Bengaluru, Karnataka 560038</p>
              </div>
              <div className="info-item">
                <h3>Business Hours</h3>
                <p>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: By Appointment</p>
              </div>
              <div className="info-item">
                <h3>Get in Touch</h3>
                <p>Email: info@chronicleofcloth.com<br />Phone: +91 80 2345 6789</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span>↑</span>
      </div>
    </>
  );
}

export default App;