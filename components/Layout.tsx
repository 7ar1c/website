// components/Layout.tsx
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  // Helper to determine if a link is active
  const navLink = (href: string, label: string) => {
    const isActive = router.pathname === href;
    
    return (
      <Link 
        href={href} 
        className={`transition-colors duration-200 ${
          isActive 
            ? 'text-neutral-900 font-bold' // Active style
            : 'text-neutral-500 hover:text-neutral-900 font-medium' // Inactive style
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200">
      
      {/* Navigation */}
      <nav className="max-w-2xl mx-auto py-12 px-6 flex items-center gap-8 text-sm">
        {navLink('/', 'home')}
        {navLink('/about', 'me!')}
        {navLink('/experience', 'experience')}
        {navLink('/travel', 'travel')}
        {navLink('/resume', 'resume')}
      </nav>
      
      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto py-8 px-6 border-t border-neutral-100 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Built with Next.js & TypeScript
      </footer>
    </div>
  );
}