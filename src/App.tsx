import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import ThreeBackground from '$lib/components/three/Index';
import Footer from '$lib/components/layouts/Footer';
import Loading from '$lib/components/layouts/Loading';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NotesPage from './pages/Notes';
import NoteSlugPage from './pages/NoteSlug';
import ContactPage from './pages/Contact';
import LabPage from './pages/Lab';

function AppInner() {
  const location = useLocation();
  const isNotes = location.pathname.startsWith('/notes');

  useEffect(() => {
    const d = document;
    const config = { kitId: 'vza3sdw', scriptTimeout: 3000, async: true };
    const h = d.documentElement;
    const t = setTimeout(() => {
      h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
    }, config.scriptTimeout);

    const tk = d.createElement('script') as HTMLScriptElement & { readyState?: string };
    let f = false;
    const s = d.getElementsByTagName('script')[0];

    h.className += ' wf-loading';
    tk.src = `https://use.typekit.net/${config.kitId}.js`;
    tk.async = true;

    const handleLoad = function (this: typeof tk) {
      const a = this.readyState;
      if (f || (a && a !== 'complete' && a !== 'loaded')) return;
      f = true;
      clearTimeout(t);
      try {
        (window as Window & { Typekit?: { load: (cfg: unknown) => void } }).Typekit?.load(config);
      } catch { /* no-op */ }
    };

    tk.addEventListener('load', () => handleLoad.call(tk));
    (tk as typeof tk & { onreadystatechange?: () => void }).onreadystatechange = () => handleLoad.call(tk);
    s.parentNode?.insertBefore(tk, s);
  }, []);

  return (
    <>
      <Loading />
      {!isNotes && <ThreeBackground />}
      <div
        className="bg fixed inset-0 w-full h-screen bg-[#131313] pointer-events-none -z-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(128,128,128,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.1) 1px, transparent 1px)',
          backgroundSize: '6rem 6rem',
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:slug" element={<NoteSlugPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/lab" element={<LabPage />} />
        </Routes>
      </AnimatePresence>
      <div className="fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
