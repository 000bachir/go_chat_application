import * as React from 'react';

// Import icons from lucide-react
// We'll use available icons and potentially inline SVGs for others
import { Facebook, Linkedin, Mail, X } from 'lucide-react';
import Link from 'next/link';

// Define the Footer component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-auto">
      {/* Footer content container */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright information */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          {/* Replace with your company/website name and year */}
          <p>&copy; {new Date().getFullYear()} PingChat. All rights reserved.</p>
        </div>

        <div className="flex space-x-6">

          <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition-colors duration-300">
            <Facebook size={24} /> {/* lucide-react Facebook icon */}
          </Link>

          <Link href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-500 transition-colors duration-300">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12.04 2.01c-5.47 0-9.91 4.43-9.91 9.91 0 1.75.5 3.45 1.46 4.95l-1.5 5.48 5.6-1.46c1.45.79 3.08 1.21 4.35 1.21 5.47 0 9.91-4.43 9.91-9.91-.01-5.47-4.44-9.91-9.91-9.91zm4.92 14.94c-.28.15-.92.47-1.32.62-.4.15-.85.23-1.31.08-.46-.15-1.05-.39-2-.98-.83-.49-1.38-1.24-1.54-1.49-.16-.25-.02-.38.14-.54.14-.15.33-.39.49-.59.16-.19.21-.33.33-.49.12-.16.08-.31-.04-.43-.12-.12-.28-.15-.43-.35-.15-.19-.59-1.41-.81-1.92-.21-.5-.43-.42-.59-.43-.15-.01-.33-.01-.5-.01-.16 0-.4.06-.61.31-.22.25-.84.83-.84 2.02 0 1.19.86 2.34.98 2.5.12.16 1.68 2.57 4.06 3.56 2.38.99 2.85.86 3.35.8.5-.06 1.32-.54 1.51-.83.19-.28.19-.52.14-.62-.05-.1-.15-.15-.31-.23z"/>
            </svg>
          </Link>
          <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="hover:text-gray-400 transition-colors duration-300">
             <X size={24} /> {/* lucide-react X icon */}
          </Link>

 
          <Link href="mailto:your.email@example.com" aria-label="Gmail" className="hover:text-red-500 transition-colors duration-300">
            <Mail size={24} /> {/* lucide-react Mail icon */}
          </Link>

        
          <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors duration-300">
            <Linkedin size={24} /> {/* lucide-react Linkedin icon */}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
