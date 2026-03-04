import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, X, ArrowRight, Star, Plus, Minus, 
  Play, ChevronLeft, ChevronRight, 
  Mail, MapPin, Phone 
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const XBrandIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M2 2h4.7l5.1 6.9L17 2h5l-7.5 8.5L22 22h-4.7l-5.4-7.2L7 22H2l7.7-8.7L2 2Z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C9 0 6.22 1.17 4.05 3.32A11.86 11.86 0 0 0 0 12c0 2.09.55 4.15 1.64 5.97L0 24l6.17-1.63A11.9 11.9 0 0 0 12 24c3.2 0 5.97-1.13 8.52-3.48A11.86 11.86 0 0 0 24 12c0-3.2-1.13-5.97-3.48-8.52ZM12 21.6c-1.8 0-3.47-.48-4.98-1.44l-.36-.2-3.68.97.99-3.6-.24-.36A9.64 9.64 0 0 1 2.4 12c0-2.6.93-4.8 2.73-6.6A9.2 9.2 0 0 1 12 2.4c2.6 0 4.8.93 6.6 2.73A9.2 9.2 0 0 1 21.6 12c0 2.6-.93 4.8-2.73 6.6A9.2 9.2 0 0 1 12 21.6Zm5.35-6.68c-.29-.15-1.7-.85-1.97-.95-.26-.1-.44-.15-.63.15-.19.29-.74.94-.9 1.13-.17.2-.33.22-.62.08-.29-.15-1.23-.45-2.35-1.45-.87-.77-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.15-.17.2-.3.29-.48.1-.19.05-.36-.03-.51-.08-.15-.64-1.53-.88-2.1-.23-.57-.47-.5-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.12 4.96 4.39.7.3 1.23.48 1.65.62.7.21 1.32.19 1.82.12.55-.09 1.7-.7 1.94-1.38.24-.68.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z" />
  </svg>
);

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const translations = {
  es: {
    nav: ['Inicio', 'Servicios', 'Proyectos', 'Contacto'],
    quote: 'Solicitar Presupuesto',
    heroWords: {
      line1: ['Construcción,', 'Mantenimiento', 'y reparaciones'],
      line2: ['Trabajo confiable', 'para hogares y negocios'],
    },
    heroSubtitle:
      'En Sertec Plus ayudamos a mantener y mejorar espacios con soluciones prácticas de construcción, mantenimiento y reparación. Somos un equipo pequeño con experiencia, enfocado en hacer bien el trabajo y cumplir con lo prometido.',
    stats: { projects: 'Proyectos realizados', clients: 'Clientes atendidos' },
    ctaServices: 'Ver servicios',
    badge: '• SOLICITAR PRESUPUESTO • SOLICITAR PRESUPUESTO',
    whyTitle: '¿POR QUÉ TRABAJAR CON NOSOTROS?',
    whyCards: [
      {
        num: '01',
        title: 'Precios claros',
        desc: 'Ofrecemos presupuestos transparentes y ajustados al trabajo necesario. Sin costos inesperados.',
      },
      {
        num: '02',
        title: 'Comunicación directa',
        desc: 'Mantenemos contacto durante todo el proyecto para que siempre sepas cómo avanza el trabajo.',
      },
      {
        num: '03',
        title: 'Soluciones prácticas',
        desc: 'Buscamos la mejor forma de resolver cada trabajo según tus necesidades y presupuesto.',
      },
      {
        num: '04',
        title: 'Trabajo bien hecho',
        desc: 'Cuidamos los detalles y utilizamos materiales confiables para lograr resultados duraderos.',
      },
    ],
    servicesTitle: 'NUESTROS SERVICIOS',
    services: [
      { img: '/service-check.jpg', title: 'Revisión del proyecto', desc: 'Evaluamos el trabajo y te orientamos sobre la mejor solución.' },
      { img: '/service-act.jpg', title: 'Atención rápida', desc: 'Respondemos lo antes posible para ayudarte con tu proyecto o reparación.' },
      { img: '/service-booking.jpg', title: 'Agenda tu servicio', desc: 'Coordinamos una visita para revisar el trabajo y darte un presupuesto.' },
    ],
    projectsTitle: 'ALGUNOS DE NUESTROS TRABAJOS',
    projectsButton: 'Ver todos',
    projects: [
      { img: '/project-1.jpg', title: 'Residencia remodelada', location: 'Farmington, PA' },
      { img: '/project-2.jpg', title: 'Renovación de oficinas', location: 'Bogotá, CO' },
      { img: '/project-3.jpg', title: 'Adecuación comercial', location: 'Manaus, AM' },
    ],
    testimonialsTitle: 'LO QUE DICEN NUESTROS CLIENTES',
    testimonials: [
      {
        company: 'LEXMARK',
        text: 'Excelente servicio. Cumplieron con los tiempos y el resultado quedó muy bien. Un equipo responsable y fácil de trabajar.',
        name: 'María González',
        role: 'Lexmark',
        rating: 5,
      },
      {
        company: 'BERENDSEN',
        text: 'Muy profesionales y atentos durante todo el proceso. Recomiendo su trabajo para proyectos de construcción o mantenimiento.',
        name: 'Carlos Rodríguez',
        role: 'Berendsen',
        rating: 5,
      },
    ],
    faqTitle: 'PREGUNTAS FRECUENTES',
    faq: [
      {
        question: '¿Cómo solicito un presupuesto?',
        answer:
          'Puedes completar el formulario de contacto, llamarnos o enviarnos un correo. Revisaremos tu solicitud y te responderemos lo antes posible.',
      },
      {
        question: '¿Cuánto tiempo toma un proyecto típico?',
        answer:
          'Depende del alcance. Te compartimos un cronograma con fechas estimadas al preparar el presupuesto.',
      },
      {
        question: '¿Ofrecen garantía en los trabajos?',
        answer:
          'Sí. Respaldamos nuestro trabajo y te explicamos las garantías antes de comenzar cada proyecto.',
      },
      {
        question: '¿En qué zonas trabajan?',
        answer:
          'Principalmente en Farmington, PA; Bogotá, CO; Manaus, AM (Brasil) y Leticia, AM.',
      },
    ],
    videoOverlay: 'Video Demo - Click para reproducir',
    contactHeadingLine1: 'HABLEMOS DE',
    contactHeadingLine2: 'TU PROYECTO',
    contactHeadingLine3: '',
    contactSub:
      'Si necesitas ayuda con construcción, mantenimiento o reparaciones, puedes escribirnos y revisaremos tu caso.',
    form: {
      name: 'Nombre',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      message: 'Cuéntanos sobre tu proyecto',
      submit: 'Enviar mensaje',
      successTitle: '¡Mensaje enviado!',
      successText: 'Nos pondremos en contacto contigo pronto.',
    },
    footer: {
      tagline: 'Construcción, mantenimiento y reparaciones para hogares y empresas.',
      platform: 'Plataforma',
      services: 'Servicios',
      contact: 'Contacto',
      terms: 'Términos',
      privacy: 'Privacidad',
      itemsPlatform: ['Servicios', 'Proyectos', 'Nosotros', 'Solicitar presupuesto'],
      itemsServices: ['Construcción', 'Mantenimiento', 'Reparaciones', 'Remodelación'],
      city: 'Farmington, PA',
      rights: '© Sertec Plus · Todos los derechos reservados.',
    },
  },
  en: {
    nav: ['Home', 'Services', 'Projects', 'Contact'],
    quote: 'Request a Quote',
    heroWords: {
      line1: ['Construction,', 'Maintenance', '& Repairs'],
      line2: ['Reliable work', 'for homes and businesses'],
    },
    heroSubtitle:
      'At Sertec Plus we maintain and improve spaces with practical construction, maintenance, and repair solutions. A small experienced team focused on doing the job right and keeping our promises.',
    stats: { projects: 'Projects delivered', clients: 'Clients served' },
    ctaServices: 'View services',
    badge: '• REQUEST A QUOTE • REQUEST A QUOTE',
    whyTitle: 'WHY WORK WITH US?',
    whyCards: [
      {
        num: '01',
        title: 'Clear pricing',
        desc: 'Transparent estimates tailored to the work required. No surprise costs.',
      },
      {
        num: '02',
        title: 'Direct communication',
        desc: 'We stay in touch throughout the project so you always know the status.',
      },
      {
        num: '03',
        title: 'Practical solutions',
        desc: 'We find the best way to solve each job based on your needs and budget.',
      },
      {
        num: '04',
        title: 'Work done right',
        desc: 'We care about the details and use reliable materials for durable results.',
      },
    ],
    servicesTitle: 'OUR SERVICES',
    services: [
      { img: '/service-check.jpg', title: 'Project review', desc: 'We assess the job and guide you to the best solution.' },
      { img: '/service-act.jpg', title: 'Fast response', desc: 'We respond quickly to help with your project or repair.' },
      { img: '/service-booking.jpg', title: 'Schedule your service', desc: 'We set a visit to review the job and give you a quote.' },
    ],
    projectsTitle: 'SOME OF OUR WORK',
    projectsButton: 'View all',
    projects: [
      { img: '/project-1.jpg', title: 'Remodeled residence', location: 'Farmington, PA' },
      { img: '/project-2.jpg', title: 'Office renovation', location: 'Bogotá, CO' },
      { img: '/project-3.jpg', title: 'Commercial fit-out', location: 'Manaus, AM' },
    ],
    testimonialsTitle: 'WHAT OUR CLIENTS SAY',
    testimonials: [
      {
        company: 'LEXMARK',
        text: 'Excellent service. They met the deadlines and the result was great. Responsible team and easy to work with.',
        name: 'María González',
        role: 'Lexmark',
        rating: 5,
      },
      {
        company: 'BERENDSEN',
        text: 'Very professional and attentive throughout the process. I recommend their work for construction or maintenance projects.',
        name: 'Carlos Rodríguez',
        role: 'Berendsen',
        rating: 5,
      },
    ],
    faqTitle: 'FREQUENTLY ASKED QUESTIONS',
    faq: [
      {
        question: 'How can I request a quote?',
        answer:
          'Fill out the contact form, call us, or send an email. We review your request and respond as soon as possible.',
      },
      {
        question: 'How long does a typical project take?',
        answer:
          'It depends on scope. We share an estimated schedule when we prepare your quote.',
      },
      {
        question: 'Do you offer warranties?',
        answer:
          'Yes. We stand behind our work and explain the warranties before starting each project.',
      },
      {
        question: 'Do you work nationwide?',
        answer:
          'We work mainly in Farmington, PA; Bogotá, CO; Manaus, AM (Brazil); and Leticia, AM.',
      },
    ],
    videoOverlay: 'Video Demo - Click to play',
    contactHeadingLine1: "LET'S TALK ABOUT",
    contactHeadingLine2: 'YOUR PROJECT',
    contactHeadingLine3: '',
    contactSub: 'If you need help with construction, maintenance, or repairs, write to us and we will review your case.',
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Tell us about your project',
      submit: 'Send message',
      successTitle: 'Message Sent!',
      successText: 'We will contact you soon.',
    },
    footer: {
      tagline: 'Construction, maintenance, and repairs for homes and businesses.',
      platform: 'Platform',
      services: 'Services',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy',
      itemsPlatform: ['Services', 'Projects', 'About Us', 'Request a quote'],
      itemsServices: ['Construction', 'Maintenance', 'Repairs', 'Remodeling'],
      city: 'Farmington, PA',
      rights: '© Sertec Plus · All rights reserved.',
    },
  },
} as const;

function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const t = translations[lang];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Counter animation
  const animateCounter = (element: HTMLElement, target: number, duration: number = 2) => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value).toString();
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl.fromTo('.hero-title span', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
    )
    .fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    )
    .fromTo('.hero-image',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2 },
      '-=1'
    )
    .fromTo('.hero-badge',
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    );

    // Stats counter animation
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach((el, i) => {
      const target = i === 0 ? 123 : 92;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => animateCounter(el as HTMLElement, target),
        once: true
      });
    });

    // Why Choose Us animations
    gsap.fromTo('.why-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    // Services circles animation
    gsap.fromTo('.service-circle',
      { scale: 0 },
      {
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    // Projects animation
    gsap.fromTo('.project-card',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    // Video section expansion
    gsap.fromTo('.video-container',
      { width: '80%' },
      {
        width: '100%',
        scrollTrigger: {
          trigger: videoRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1
        }
      }
    );

    // Testimonials animation
    gsap.fromTo('.testimonial-card',
      { y: 100, opacity: 0, rotation: (i) => i === 0 ? -5 : 5 },
      {
        y: 0,
        opacity: 1,
        rotation: (i) => i === 0 ? -2 : 2,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    // FAQ animation
    gsap.fromTo('.faq-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 70%',
          once: true
        }
      }
    );

    // Contact/Footer animation
    gsap.fromTo('.contact-text',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('https://formspree.io/f/xaqdrgwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData),
      });
      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submit failed', error);
    }
  };

  const faqData = t.faq;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
        }`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={publicAsset('logo.png')} alt="Sertec Plus" className="h-28 w-auto" />
              <span className={`font-bold text-xl font-['Montserrat'] ${isScrolled ? 'text-[#1a1a1a]' : 'text-white'}`}>
                SERTEC PLUS
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {t.nav.map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'services', 'projects', 'contact'][i])}
                  className={`relative text-sm font-medium transition-colors hover:text-[#f5b800] ${
                    isScrolled ? 'text-[#1a1a1a]' : 'text-white'
                }`}
              >
                {item}
              </button>
              ))}
            </div>
            
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setLang('es')}
                className={`w-9 h-9 rounded-full border ${lang === 'es' ? 'bg-[#f5b800] border-[#f5b800] text-[#1a1a1a]' : 'border-white/40 text-white'} flex items-center justify-center text-sm font-semibold transition-colors`}
                aria-label="Cambiar a Español"
              >
                🇪🇸
              </button>
              <button
                onClick={() => setLang('en')}
                className={`w-9 h-9 rounded-full border ${lang === 'en' ? 'bg-[#f5b800] border-[#f5b800] text-[#1a1a1a]' : 'border-white/40 text-white'} flex items-center justify-center text-sm font-semibold transition-colors`}
                aria-label="Switch to English"
              >
                🇺🇸
              </button>
            </div>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:block bg-[#f5b800] text-[#1a1a1a] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#e0a800] transition-colors"
            >
              {t.quote}
            </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-[#1a1a1a]' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-6 px-6">
            {t.nav.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(['hero', 'services', 'projects', 'contact'][i])}
                className="block w-full text-left py-3 text-[#1a1a1a] font-medium border-b border-gray-100"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 bg-[#f5b800] text-[#1a1a1a] px-6 py-3 rounded-full font-semibold"
            >
              {t.quote}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen bg-[#1a1a1a] overflow-hidden noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="hero-title mt-5 pt-0 text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight mb-0">
                <span className="inline-block overflow-hidden">
                  <span className="inline-block">{t.heroWords.line1[0]}</span>
                </span>{' '}
                <span className="inline-block overflow-hidden">
                  <span className="inline-block">{t.heroWords.line1[1]}</span>
                </span>{' '}
                <span className="inline-block overflow-hidden">
                  <span className="inline-block">{t.heroWords.line1[2]}</span>
                </span>
                <br />
                <span className="inline-block overflow-hidden">
                  <span className="inline-block text-[#f5b800] text-2xl md:text-3xl">{t.heroWords.line2[0]}</span>
                </span>{' '}
                <span className="inline-block overflow-hidden">
                  <span className="inline-block text-[#f5b800] text-2xl md:text-3xl">{t.heroWords.line2[1]}</span>
                </span>
              </h1>
              <p className="hero-subtitle text-gray-300 text-lg mb-6 max-w-lg">
                {t.heroSubtitle}
              </p>
              
              {/* Stats */}
              <div ref={statsRef} className="flex gap-12 mb-8">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="stat-number text-4xl font-bold text-[#f5b800] counter-animate">0</span>
                    <span className="text-2xl font-bold text-[#f5b800]">+</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{t.stats.projects}</p>
                </div>
                <div className="w-px bg-gray-700"></div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="stat-number text-4xl font-bold text-[#f5b800] counter-animate">0</span>
                    <span className="text-2xl font-bold text-[#f5b800]">+</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{t.stats.clients}</p>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-[#f5b800] text-[#1a1a1a] px-8 py-4 rounded-full font-semibold hover:bg-[#e0a800] transition-colors flex items-center gap-2"
              >
                {t.ctaServices} <ArrowRight size={18} />
              </button>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="hero-image relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img 
                  src={publicAsset('hero-workers.jpg')} 
                  alt="Construction workers" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Rotating Badge */}
              <div className="hero-badge absolute -bottom-6 -right-6 w-32 h-32">
                <div className="relative w-full h-full">
                  <svg className="animate-spin-slow w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                    </defs>
                    <text fill="#f5b800" fontSize="8.5" fontFamily="Montserrat" fontWeight="600">
                      <textPath href="#circle">
                        {t.badge}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#f5b800] rounded-full flex items-center justify-center">
                      <ArrowRight className="text-[#1a1a1a]" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-3 h-3 bg-[#1a1a1a]"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#1a1a1a]">
              {t.whyTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-0 border border-gray-200">
            {t.whyCards.map((item, i) => (
              <div 
                key={i} 
                className={`why-card p-8 hover:bg-gray-50 transition-colors group ${
                  i % 2 === 0 ? 'border-r border-gray-200' : ''
                } ${i < 2 ? 'border-b border-gray-200' : ''}`}
              >
                <span className="text-gray-300 text-sm font-medium group-hover:text-[#f5b800] transition-colors">
                  {item.num}
                </span>
                <h3 className="text-xl font-bold font-['Montserrat'] text-[#1a1a1a] mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-24 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-3 h-3 bg-[#1a1a1a]"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#1a1a1a]">
              {t.servicesTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
                {t.services.map((service, i) => (
                  <div 
                    key={i}
                    className="service-circle group relative aspect-square rounded-full overflow-hidden cursor-pointer animate-pulse-soft"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <img 
                      src={publicAsset(service.img)} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold font-['Montserrat'] text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#1a1a1a]"></div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#1a1a1a]">
                {t.projectsTitle}
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#1a1a1a] font-medium hover:text-[#f5b800] transition-colors">
              {t.projectsButton} <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
                {t.projects.map((project, i) => (
                  <div 
                    key={i}
                    className="project-card group relative overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={publicAsset(project.img)} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:grayscale-[30%]"
                      />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold font-['Montserrat'] text-lg">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoRef} className="py-24 bg-[#f5f5f5]">
        <div className="flex justify-center">
          <div 
            className="video-container relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setVideoOpen(true)}
          >
            <video
              src={publicAsset('video.mp4')}
              poster={publicAsset('video-thumbnail.jpg')}
              className="w-full aspect-video object-cover"
              muted
              autoPlay
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#f5b800] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-[#1a1a1a] ml-1" size={32} fill="#1a1a1a" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#1a1a1a]"></div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#1a1a1a]">
                {t.testimonialsTitle}
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#f5b800] hover:border-[#f5b800] transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#f5b800] flex items-center justify-center hover:bg-[#e0a800] transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {t.testimonials.map((testimonial, i) => (
              <div 
                key={i}
                className={`testimonial-card bg-white p-8 rounded-2xl shadow-lg ${
                  i === 0 ? '-rotate-2' : 'rotate-2'
                }`}
              >
                <h4 className="text-xl font-bold font-['Montserrat'] text-[#1a1a1a] mb-4">
                  {testimonial.company}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f5b800] to-[#e0a800] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={16} className="text-[#f5b800]" fill="#f5b800" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 bg-[#f5b800]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-[#1a1a1a]"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-[#1a1a1a]">
              {t.faqTitle}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <div key={i} className="faq-item border-b border-[#1a1a1a]/20">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-[#1a1a1a] group-hover:translate-x-2 transition-transform">
                    {faq.question}
                  </span>
                  <span className="text-[#1a1a1a]">
                    {faqOpen === i ? <Minus size={24} /> : <Plus size={24} />}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    faqOpen === i ? 'max-h-48 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#1a1a1a]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" ref={contactRef} className="bg-[#1a1a1a] text-white">
        {/* CTA Area */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="contact-text text-4xl md:text-5xl font-bold font-['Montserrat'] leading-tight mb-6">
                  {t.contactHeadingLine1}<br />
                  <span className="text-[#f5b800]">{t.contactHeadingLine2}</span><br />
                  {t.contactHeadingLine3}
                </h2>
                <p className="text-gray-400 text-lg">
                  {t.contactSub}
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#f5b800] rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="text-[#1a1a1a]" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{t.form.successTitle}</h3>
                    <p className="text-gray-400">{t.form.successText}</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Input
                        name="name"
                        type="text"
                        placeholder={t.form.name}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder={t.form.email}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder={t.form.phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder={t.form.message}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-[#f5b800] text-[#1a1a1a] hover:bg-[#e0a800] font-semibold py-6"
                    >
                      {t.form.submit} <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-white/10 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <img src={publicAsset('logo.png')} alt="Sertec Plus" className="h-20 w-auto" />
                  <span className="font-bold text-xl font-['Montserrat']">SERTEC PLUS</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-sm">
                  {t.footer.tagline}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b800] hover:text-[#1a1a1a] transition-colors"
                    aria-label="Sertec Plus on X"
                  >
                    <XBrandIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/17244665950"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f5b800] hover:text-[#1a1a1a] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">{t.footer.platform}</h4>
                <ul className="space-y-2 text-gray-400">
                  {t.footer.itemsPlatform.map((label) => (
                    <li key={label}><a href="#" className="hover:text-[#f5b800] transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">{t.footer.services}</h4>
                <ul className="space-y-2 text-gray-400">
                  {t.footer.itemsServices.map((label) => (
                    <li key={label}><a href="#" className="hover:text-[#f5b800] transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span>Juan Carlos Simancas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#f5b800]" />
                    <span>{t.footer.city}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} className="text-[#f5b800]" />
                    <a
                      href="tel:+17244665950"
                      className="hover:text-[#f5b800] transition-colors"
                    >
                      +1 (724) 466 5950
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={16} className="text-[#f5b800]" />
                    <a
                      href="mailto:info@sertec.com"
                      className="hover:text-[#f5b800] transition-colors"
                    >
                      info@sertec.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                {t.footer.rights}
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-[#f5b800] transition-colors">Términos</a>
                <a href="#" className="hover:text-[#f5b800] transition-colors">{t.footer.privacy}</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Video Dialog */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <div className="aspect-video bg-black flex items-center justify-center relative">
            <video
              src={publicAsset('video.mp4')}
              poster={publicAsset('video-thumbnail.jpg')}
              className="w-full h-full object-cover"
              controls
              playsInline
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <p className="text-white text-lg drop-shadow">{t.videoOverlay}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
