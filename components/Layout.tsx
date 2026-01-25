// components/Layout.tsx
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
  wide?: boolean; 
};

export default function Layout({ children, wide = false }: LayoutProps) {
  const router = useRouter();

  const navLink = (href: string, label: string) => {
    const isActive = router.pathname === href;
    return (
      <Link 
        href={href} 
        className={`transition-colors duration-200 ${
          isActive 
            ? 'text-neutral-900 font-bold' 
            : 'text-neutral-500 hover:text-neutral-900 font-medium' 
        }`}
      >
        {label}
      </Link>
    );
  };

  // Only apply the wide class to the Main content
  const mainWidthClass = wide ? "max-w-7xl" : "max-w-2xl";

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200">
      
      {/* 1. NAV: Always max-w-2xl (Centered & Narrow) */}
      <nav className="max-w-2xl mx-auto py-12 px-6 flex items-center gap-8 text-sm">
        {navLink('/', 'home')}
        {navLink('/about', 'me!')}
        {navLink('/experience', 'experience')}
        {navLink('/travel', 'travel')}
        {navLink('/resume', 'resume')}
        {navLink('/contact', 'contact')}
      </nav>
      
      {/* 2. MAIN: Can be wide if props say so */}
      <main className={`${mainWidthClass} mx-auto px-6 pb-12 transition-all duration-300`}>
        {children}
      </main>

      {/* 3. FOOTER: Always max-w-2xl */}
      <footer className="max-w-2xl mx-auto py-8 px-6 border-t border-neutral-100 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Built with Next.js & TypeScript
      </footer>
    </div>
  );
}