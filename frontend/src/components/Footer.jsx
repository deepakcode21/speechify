const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-white">Speechify</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate tool for seamless text-to-speech and speech-to-text conversion. Empowering communication through cutting-edge technology.
            </p>
          </div>

          {/* Useful Links */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support and Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4 text-white">Support</h3>
            <div className="flex justify-center md:justify-end space-x-6 mb-4">
              <a
                href="mailto:support@speechify.com"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Email</span>
                <i className="fas fa-envelope text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Documentation</span>
                <i className="fas fa-book text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="sr-only">Feedback</span>
                <i className="fas fa-comment-alt text-xl"></i>
              </a>
            </div>
            <p className="text-gray-400 text-sm hover:text-white transition-colors duration-300">
              support@speechify.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3 pt-3 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Speechify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;