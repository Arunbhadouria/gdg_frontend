import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">

        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Google Developer Group. On Campus . MITS-DU Gwalior . All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex space-x-6">
          <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="/events" className="hover:text-blue-400 transition-colors">Events</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-lg">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaInstagram />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
