import Image from "next/image";
import logoImage from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-border-color py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div className="flex items-center space-x-2 text-white font-bold">
          <div className="relative w-5 h-5">
            <Image
              src={logoImage}
              alt="FitLog Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span>FITLOG</span>
        </div>
        <div>© 2026 FitLog — Workout Library. Train hard, log honest.</div>
      </div>
    </footer>
  );
}
