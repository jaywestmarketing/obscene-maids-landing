import React, { useState, useEffect } from 'react';
import { Check, Shield, CreditCard, MapPin, Star, Users, Lock, Zap, Clock, Award } from 'lucide-react';

export default function ObsceneMaidsLanding() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [income, setIncome] = useState('');
  const [frequency, setFrequency] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(947);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'customer',
          city,
          income,
          frequency,
          utmSource: new URLSearchParams(window.location.search).get('utm_source'),
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setWaitlistCount(data.waitlistPosition || waitlistCount + 1);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Fixed Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <Star className="icon" />
            </div>
            <h1 className="logo-text">OBSCENE MAIDS</h1>
          </div>
          <a href="#waitlist" className="cta-button-small">
            Join Waitlist
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-effects">
          <div className="bg-circle gold"></div>
          <div className="bg-circle crimson"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-accent-bar"></div>
          
          <h2 className="hero-title">
            <span className="text-gold">YOUR TIME</span>
            <br />
            <span className="text-white">IS VALUABLE</span>
          </h2>
          
          <p className="hero-subtitle">
            Las Vegas' most <span className="text-gold">exclusive</span> cleaning service
          </p>
          
          <p className="hero-description">
            Premium cleaning service for discerning clients who value discretion, professionalism, and quality
          </p>
          
          <div className="social-proof">
            <div className="proof-item">
              <Users className="proof-icon" />
              <span>
                <span className="text-gold">{waitlistCount.toLocaleString()}</span> on waitlist
              </span>
            </div>
            <div className="proof-dot"></div>
            <div className="proof-item">
              <Shield className="proof-icon" />
              <span>
                <span className="text-gold">$2M</span> insured
              </span>
            </div>
            <div className="proof-dot"></div>
            <div className="proof-item">
              <Award className="proof-icon" />
              <span>
                <span className="text-gold">Licensed</span> & Legal
              </span>
            </div>
          </div>
          
          <a href="#waitlist" className="cta-button">
            Join Exclusive Waitlist
          </a>
          
          <p className="launch-info">
            Launching February 2025 • First 100 clients get 20% off
          </p>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-icon">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">The Math Is Simple</h3>
            <p className="section-subtitle">
              If you earn $250K+, your time is worth <span className="text-gold">$125/hour</span>
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <div className="value-number">10</div>
              <div className="value-text">Hours per month spent on household tasks</div>
            </div>
            
            <div className="value-card">
              <div className="value-number crimson">$1,250</div>
              <div className="value-text">Lost productivity value every month</div>
            </div>
            
            <div className="value-card">
              <div className="value-number">$130</div>
              <div className="value-text">Per hour for our premium service</div>
            </div>
          </div>

          <div className="value-conclusion">
            <p>Reclaim your time. <span className="text-gold">Focus on what matters.</span></p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">
              Why <span className="text-gold">Obscene Maids</span>
            </h3>
            <p className="section-subtitle">Professional. Discrete. Unforgettable.</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: Shield,
                title: 'Background Checked',
                description: 'Every contractor undergoes thorough national background checks before approval'
              },
              {
                icon: Lock,
                title: 'Complete Privacy',
                description: 'Strict NDAs, no-camera policy, and encrypted data. Your discretion is guaranteed'
              },
              {
                icon: CreditCard,
                title: 'Secure Payments',
                description: 'Book and pay online through our encrypted platform. No cash, no awkwardness'
              },
              {
                icon: MapPin,
                title: 'GPS Safety',
                description: 'Real-time tracking and 24/7 support during every service for your peace of mind'
              },
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                description: 'Book same-day or plan ahead. Cancel anytime with 24-hour notice'
              },
              {
                icon: Star,
                title: '$2M Coverage',
                description: 'Fully licensed and insured with comprehensive liability protection'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">
              Transparent <span className="text-gold">Pricing</span>
            </h3>
            <p className="section-subtitle">No hidden fees. No surprises. Just exceptional service.</p>
          </div>

          <div className="pricing-grid">
            {[
              {
                name: 'Hourly',
                price: '$130',
                unit: 'per hour',
                description: 'Perfect for one-time bookings',
                popular: false
              },
              {
                name: 'Weekly',
                price: '$260',
                unit: 'per week',
                description: '2 hours • Save 8%',
                popular: true
              },
              {
                name: 'Monthly',
                price: '$208',
                unit: 'per month',
                description: '8 hours total • Save 20%',
                popular: false
              },
              {
                name: 'Premium',
                price: '$300',
                unit: 'per hour',
                description: 'Exclusive contractors',
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">MOST POPULAR</div>
                )}
                <div className="pricing-content">
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">{plan.price}</div>
                  <div className="plan-unit">{plan.unit}</div>
                  <div className="plan-description">{plan.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-note">
            All plans include background-checked contractors, full insurance, and 24/7 support
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="waitlist-section">
        <div className="waitlist-container">
          {!submitted ? (
            <>
              <div className="waitlist-header">
                <div className="header-accent-bar"></div>
                <h3 className="waitlist-title">
                  Join the <span className="text-gold">Waitlist</span>
                </h3>
                <p className="waitlist-subtitle">Be among the first to experience Obscene Maids</p>
                <p className="waitlist-offer">First 100 clients get 20% off • Launching February 2025</p>
              </div>

              <form onSubmit={handleSubmit} className="waitlist-form">
                <input
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />

                <input
                  type="text"
                  placeholder="City / Neighborhood *"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="form-input"
                />

                <select
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="form-input"
                >
                  <option value="">Household income (optional)</option>
                  <option value="250k-500k">$250K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m+">$1M+</option>
                </select>

                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="form-input"
                >
                  <option value="">How often would you use this?</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="occasional">Special occasions</option>
                </select>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit"
                >
                  {isSubmitting ? 'Joining...' : 'Join Exclusive Waitlist'}
                </button>

                <p className="form-privacy">
                  We respect your privacy. Unsubscribe anytime. Your data is encrypted and never shared.
                </p>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon-wrapper">
                <Check className="success-icon" />
              </div>
              <h3 className="success-title">Welcome to the List</h3>
              <p className="success-subtitle">You're officially on the waitlist!</p>
              <div className="success-card">
                <div className="position-label">Your Position</div>
                <div className="position-number">#{waitlistCount}</div>
                <p className="position-note">We'll email you when booking opens (February 15, 2025)</p>
              </div>
              <div className="referral-section">
                <p className="referral-question">Want to skip the line?</p>
                <button className="referral-button">Share Your Referral Link</button>
                <p className="referral-note">Both you and your friend move up the waitlist when they join</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof / Trust Section */}
      <section className="trust-section">
        <div className="container">
          <div className="section-header">
            <h3 className="trust-title">
              Built for <span className="text-gold">Vegas Executives</span>
            </h3>
          </div>

          <div className="trust-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Legal & Licensed</div>
              <p className="stat-note">Fully compliant with Nevada regulations</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
              <p className="stat-note">Real humans, immediate assistance</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt;60s</div>
              <div className="stat-label">Booking Time</div>
              <p className="stat-note">Book online in under a minute</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <h3 className="section-title">
              Questions & <span className="text-gold">Answers</span>
            </h3>
          </div>

          <div className="faq-list">
            {[
              {
                q: 'Is this legal?',
                a: 'Yes. Obscene Maids is a fully licensed and insured business operating in compliance with Nevada regulations. This is a professional cleaning service - legal and strictly cleaning-focused.'
              },
              {
                q: 'How does booking work?',
                a: 'Book online in under 60 seconds. Choose your preferred time, pay securely with credit card, and receive confirmation instantly. No phone calls required.'
              },
              {
                q: 'Are contractors background-checked?',
                a: 'Yes. Every contractor undergoes comprehensive national background checks, including criminal records and sex offender registry verification before approval.'
              },
              {
                q: 'What about privacy?',
                a: 'Your privacy is guaranteed. All contractors sign NDAs. We enforce a strict no-camera policy (violation = lifetime ban). All data is encrypted and never shared.'
              },
              {
                q: 'Can I cancel?',
                a: 'Yes. Cancel anytime with 24-hour notice at no charge. Cancellations under 24 hours incur a $50 fee.'
              },
              {
                q: 'What if I\'m not satisfied?',
                a: 'We offer a money-back guarantee on your first booking. If you\'re not completely satisfied, we\'ll refund you in full.'
              }
            ].map((faq, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{faq.q}</summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="faq-contact">
            <p>More questions?</p>
            <a href="mailto:info@obscenemaids.com" className="contact-link">
              info@obscenemaids.com
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <div className="final-cta-accent-bar"></div>
          <h3 className="final-cta-title">
            Your Time Starts <span className="text-gold">Now</span>
          </h3>
          <p className="final-cta-subtitle">
            Join {waitlistCount.toLocaleString()} others on the waitlist for Vegas' most exclusive cleaning service
          </p>
          <a href="#waitlist" className="cta-button">
            Join Waitlist Now
          </a>
          <p className="final-cta-note">
            Launching February 2025 • Limited to first 100 clients
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Star className="icon-small" />
            </div>
            <span className="footer-logo-text">OBSCENE MAIDS</span>
          </div>
          
          <div className="footer-info">
            <p>© 2025 RealE Technology Solutions LLC. All rights reserved.</p>
            <p>Licensed & Insured Business</p>
          </div>
          
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="/contractors">Work With Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
