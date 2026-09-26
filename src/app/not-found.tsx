import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-black text-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2 uppercase">Page Not Found</h2>
      <p className="text-gray-400 text-sm mb-6">
        Looks like you took a wrong turn during your workout session.
      </p>
      <Link href="/" className="bg-accent text-black font-bold text-xs px-6 py-3 rounded-lg uppercase">
        Return Home
      </Link>
    </div>
  );
}