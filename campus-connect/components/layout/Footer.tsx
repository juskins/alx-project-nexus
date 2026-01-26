import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:px-24 md:flex-row justify-between items-start md:items-center">
          <div className="flex gap-12 mb-6 md:mb-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Discover</h4>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;