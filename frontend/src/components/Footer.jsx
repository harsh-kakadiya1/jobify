import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-primary/5 to-accent/10 text-foreground mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Brand & Newsletter */}
        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-primary mb-2">Jobify</h2>
          <p className="text-sm text-muted-foreground mb-2">Your one-stop solution for finding the best job opportunities.</p>
          <form className="flex flex-col gap-2 mt-2">
            <label htmlFor="newsletter" className="text-xs font-semibold">Subscribe to our newsletter</label>
            <div className="flex gap-2">
              <input id="newsletter" type="email" placeholder="Your email" className="rounded-l-full px-4 py-2 border border-border bg-white focus:outline-none" />
              <button type="submit" className="rounded-r-full px-4 py-2 bg-primary text-white font-semibold hover:bg-primary/90 transition">Subscribe</button>
            </div>
          </form>
        </div>
        {/* Links */}
        <div className="col-span-1">
          <h3 className="font-bold mb-3 text-accent">About</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="font-bold mb-3 text-accent">Support</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>
        {/* Socials */}
        <div className="col-span-1 flex flex-col gap-4 items-start">
          <h3 className="font-bold mb-3 text-accent">Connect</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-primary">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.116 2.823 5.247a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-1.32-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Jobify. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
