'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoImage from '@/assets/logo.png';
import { usePlan } from '@/context/PlanContext';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-dark-bg border-b border-border-color sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-bold tracking-wider text-white"
        >
          <div className="relative w-6 h-6">
            <Image
              src={logoImage}
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span>FITLOG</span>
        </Link>

        <nav className="hidden md:flex space-x-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-[#1e232a] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              pathname === '/my-plan'
                ? 'bg-[#1e232a] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3 text-xs font-semibold">
          <Link
            href="/my-plan"
            className="flex items-center space-x-1.5 text-black bg-accent px-3 py-1 rounded-full hover:opacity-90"
          >
            <span>Plan</span>
            <span className="bg-black text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center space-x-1.5 text-gray-300 border border-gray-600 px-3 py-1 rounded-full hover:border-gray-400"
          >
            <span>Saved</span>
            <span className="bg-gray-800 text-gray-300 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card-bg border-b border-border-color px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-[#1e232a] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/my-plan'
                  ? 'bg-[#1e232a] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex items-center space-x-3 pt-2 border-t border-border-color text-xs font-semibold">
            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-1.5 text-black bg-accent px-3.5 py-1.5 rounded-full hover:opacity-90"
            >
              <span>Plan</span>
              <span className="bg-black text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-1.5 text-gray-300 border border-gray-600 px-3.5 py-1.5 rounded-full hover:border-gray-400"
            >
              <span>Saved</span>
              <span className="bg-gray-800 text-gray-300 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}