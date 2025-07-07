import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-blue-600">Jobify</span> <span className="text-pink-500 font-normal text-base">· Find Your Fit</span>
          </h2>
          <p className="text-sm mt-2 max-w-xs">
            Your one-stop solution for finding the best job opportunities.
          </p>
          <form className="mt-4 flex gap-2">
            <input type="email" placeholder="Subscribe to our newsletter" className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 font-semibold shadow">Subscribe</button>
          </form>
        </div>

        {/* Center Section */}
        <div className="flex gap-6">
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#903b3b]">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end">
          <p className="text-sm">&copy; {new Date().getFullYear()} Jobify. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-500 hover:text-[#903b3b]">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-[#903b3b]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-[#903b3b]">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
