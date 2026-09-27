import type { Metadata } from 'next';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';
import ToastContainerWrapper from '@/components/ToastContainerWrapper';

export const metadata: Metadata = {
  title: 'FitLog — Dark Gym Companion',
  description: 'Pick a lift, lock it into today\'s plan, and watch the week\'s work add up.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-gray-100 min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <ToastContainerWrapper />
        </PlanProvider>
      </body>
    </html>
  );
}