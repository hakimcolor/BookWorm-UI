import { Link } from 'react-router-dom';
import {
  FaBook,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-[#FDF6EC]/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaBook className="text-accent" size={20} />
              <span className="font-heading text-xl font-bold text-[#FDF6EC]">
                BookWorm
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6">
              Your ultimate destination for discovering, reading, and sharing
              amazing books. Join our community of book lovers today.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: 'https://www.facebook.com/hakimcolorofficial',
                  icon: <FaFacebook />,
                  hover: 'hover:text-accent',
                },
                {
                  href: 'https://x.com/hakimcolor',
                  icon: <FaTwitter />,
                  hover: 'hover:text-accent',
                },
                {
                  href: 'https://www.instagram.com/hakim.color/',
                  icon: <FaInstagram />,
                  hover: 'hover:text-accent',
                },
                {
                  href: 'https://hakimcolorportfolio.vercel.app/',
                  icon: <FaGlobe />,
                  hover: 'hover:text-accent',
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xl transition-colors ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-[#FDF6EC] font-bold text-lg mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/browsebookspage', label: 'Browse Books' },
                { to: '/mylibrary', label: 'My Library' },
                { to: '/recomendations', label: 'Recommendations' },
                { to: '/tutorials', label: 'Tutorials' },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="font-body text-sm hover:text-accent hover:pl-2 transition-all block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-[#FDF6EC] font-bold text-lg mb-5">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {[
                'Help Center',
                'Community Guidelines',
                'Terms of Service',
                'Privacy Policy',
                'Contact Us',
              ].map((l, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="font-body text-sm hover:text-accent hover:pl-2 transition-all block"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-[#FDF6EC] font-bold text-lg mb-5">
              Stay Updated
            </h3>
            <p className="font-body text-sm mb-4 leading-relaxed">
              Get the latest book recommendations and updates in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="font-body w-full px-4 py-2.5 rounded-lg bg-[#FDF6EC]/10 border border-[#FDF6EC]/20 text-[#FDF6EC] placeholder-[#FDF6EC]/40 focus:outline-none focus:border-accent transition-all text-sm"
              />
              <button
                type="submit"
                className="font-body w-full px-4 py-2.5 bg-primary hover:bg-secondary text-[#FDF6EC] font-semibold rounded-lg transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#FDF6EC]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-[#FDF6EC]/40">
            © {year} BookWorm. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Accessibility', 'Sitemap', 'Cookies'].map((l, i) => (
              <a
                key={i}
                href="#"
                className="font-body text-xs text-[#FDF6EC]/40 hover:text-accent transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
