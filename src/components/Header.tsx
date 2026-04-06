import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);
  
  const toggle = () => {
    const next = !dark;
    setDark(next);
    
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  
  return (
    
    <header className="fixed top-0 left-0 right-0 z-50 px-32 py-6 backdrop-blur-sm">
      <nav className="flex items-center justify-between">
				<a href="/" className="text-2xl no-underline font-sans-en">
					KZ Creation Notes
				</a>
				<div className="flex items-center gap-6">
					<a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
						Posts
					</a>
					<a href="/about" className="text-sm font-medium hover:opacity-70 transition-opacity">
						About
					</a>
					<button
						type="button"
						onClick={toggle}
						className="text-sm hover:opacity-70 transition-opacity cursor-pointer"
						aria-label="Toggle theme"
					>
              {dark ? <Moon /> : <Sun />}
					</button>
				</div>
			</nav>
		</header>
  )
}