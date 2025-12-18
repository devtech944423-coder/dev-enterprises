import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Dev Tech Enterprises</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your trusted partner for semiconductors, sensors, cables & wires, switches, and lab equipment.
            </p>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#3b82f6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                devtech944423@gmail.com
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-[#3b82f6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8410750000
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-[#3b82f6] transition-colors">
                Home
              </Link>
              <Link href="/products" className="block text-gray-600 hover:text-[#3b82f6] transition-colors">
                Products
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-[#3b82f6] transition-colors">
                About
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-[#3b82f6] transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Dev Tech Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
