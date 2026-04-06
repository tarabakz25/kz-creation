"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-futura tracking-wider text-lg transition-opacity duration-200 ${
            pathname === link.href
              ? "text-white opacity-100"
              : "text-white/40 hover:text-white/80"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
