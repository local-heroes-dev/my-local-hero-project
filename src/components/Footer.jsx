// src/components/Footer.jsx
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Local Heroes</h2>
          <p className="text-gray-400 text-sm">
            Celebrating everyday people making extraordinary differences in their communities. Join us in recognizing the heroes around us.
          </p>
          <div className="flex gap-3 mt-4 text-xl text-white">
            <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
            <FaXTwitter className="hover:text-orange-500 cursor-pointer" />
            <FaInstagram className="hover:text-orange-500 cursor-pointer" />
            <FaYoutube className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Browse Heroes</li>
            <li>Nominate a Hero</li>
            <li>How it Works</li>
            <li>Success Stories</li>
            <li>Community Guidelines</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Report Content</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>📧 hello@localheroes.com</li>
            <li>📞 1-800-HEROES</li>
            <li>📍 123 Community Street, Hero City, HC 12345</li>
          </ul>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-orange-600 w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm px-4">
        © 2024 Local Heroes. All rights reserved. Made with ❤️ for communities everywhere.
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="block mx-auto mt-2 text-orange-400 hover:underline"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
