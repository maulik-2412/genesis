


import { useState, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import PropTypes from 'prop-types';
import menu from '../assets/burger-bar.png';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import teleHealth from "../assets/telehealth.png";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sectionsRef = useRef([]);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useClickAway(menuRef, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }
    setIsMenuOpen(false);
  });

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    sectionsRef.current = sectionElements;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (id) => (activeSection === id ? 'text-cetacean-blue' : '');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload(); // Refresh the page to reflect the changes
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <nav className="homeNavbar bg-de-york sticky top-0 z-10 block w-full px-4 py-2 rounded-none h-max backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center text-picton-blue mr-4 cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed antialiased">
          <img src={teleHealth} alt="telehealth logo" className="object-cover h-12 w-auto mr-2 animate-bounce" />
          <span className="text-salem font-bold text-2xl font-serif">Telehealth</span>
        </Link>
        <div className="hidden items-center lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <li className={`block p-1 grow font-sans text-md antialiased font-medium leading-8 ${isActive('aboutus')}`}>
              <Link to="/finddoctor" className="flex items-center find-doctor-link">Find Doctor</Link>
            </li>
            <li className={`block p-1 font-sans text-md antialiased font-medium leading-8 ${isActive('howwework')}`}>
              <Link to="/consult" className="flex items-center symptom-checker-link">Consult</Link>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <Link to="/profile">
                <button className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-wheat bg-salem uppercase align-middle transition-all rounded-lg select-none lg:inline-block">
                  <span>Profile</span>
                </button>
              </Link>
              <button onClick={handleLogout} className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-wheat bg-red-600 uppercase align-middle transition-all rounded-lg select-none lg:inline-block">
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <button id="log" className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-wheat bg-sazerac uppercase align-middle transition-all rounded-lg select-none hover:bg-monza lg:inline-block">
                  <span>Log In</span>
                </button>
              </Link>
              <Link to="/signin">
                <button id="sign" className="hidden select-none px-4 py-2 rounded-lg bg-bittersweet py-2 px-4 text-wheat bg-sazerac align-middle font-sans text-xs font-bold uppercase text-sazerac shadow-md shadow-gray-900/10 transition-all hover:bg-monza lg:inline-block">
                  <span>Sign in</span>
                </button>
              </Link>
            </div>
          )}
          <button ref={buttonRef} className={`relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded text-center align-middle text-xs font-medium transition-all ${isMenuOpen ? 'border-2' : ''} disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden`} type="button" onClick={toggleMenu}>
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-6 h-6">
              <img src={menu} className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>
      
      <div ref={menuRef} className='lg:hidden'>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mobileNavbar lg:hidden w-full rounded">
                <ul className="flex flex-col gap-2 mt-2 mb-4 ml-2">
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 1 / 10,
                    }}
                    className={`block p-1 font-sans text-sm antialiased font-normal leading-normal ${isActive('aboutus')}`}
                  >
                    <Link to="/findDoctor" onClick={() => handleLinkClick()}  className="flex items-center">Find Doctor</Link>
                  </motion.li>
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + 2 / 10,
                    }}
                    className={`block p-1 font-sans text-sm antialiased font-normal leading-normal ${isActive('howwework')}`}
                  >
                    <Link to="/consult" onClick={() => handleLinkClick()}  className="flex items-center">Consult</Link>
                  </motion.li>
                  <motion.li
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1 + 2 / 10,
                  }}>
                  <div className="flex justify-center gap-2">
                    <Link to="/login">
              <button  className="inline py-1 px-3 my-2 text-center align-middle bg-salem text-lg rounded  transition-all shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <span>Log In</span>
              </button>
              </Link>
              <Link to="/signin">
              <button className="inline py-1 px-3 my-2 text-center align-middle bg-salem text-lg rounded transition-all shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <span>Sign in</span>
              </button>
              </Link>
            </div>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
};

