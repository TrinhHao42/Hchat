import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/images/logo.jpg" alt="Logo" width={48} height={48} />
            <span className="text-xl font-bold">RazoDo</span>
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/about" className="hover:text-indigo-400">
              About
            </Link>
            <Link href="/privacy" className="hover:text-indigo-400">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-indigo-400">
              Terms
            </Link>
            <Link href="/support" className="hover:text-indigo-400">
              Support
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2025 RazoDo. All rights reserved. Made with ❤️ in Vietnam.
        </div>
      </div>
    </footer>
  );
}

export default Footer;