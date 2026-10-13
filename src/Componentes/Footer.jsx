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

  const explore = [
    { to: '/', label: 'Home' },
    { to: '/browsebookspage', label: 'Browse Books' },
    { to: '/mylibrary', label: 'My Library' },
    { to: '/recomendations', label: 'Recommendations' },
    { to: '/tutorials', label: 'Tutorials' },
  ];

  const support = [
    'Help Center',
    'Community Guidelines',
    'Terms of Service',
    'Privacy Policy',
    'Contact Us',
  ];

  const socials = [
    {
      href: 'https://www.facebook.com/hakimcolorofficial',
      icon: <FaFacebook size={15} />,
    },
    { href: 'https://x.com/hakimcolor', icon: <FaTwitter size={15} /> },
    {
      href: 'https://www.instagram.com/hakim.color/',
      icon: <FaInstagram size={15} />,
    },
    {
      href: 'https://hakimcolorportfolio.vercel.app/',
      icon: <FaGlobe size={15} />,
    },
  ];

  return (
    <footer style={{ background: '#242424', color: '#F8F5EF' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b"
          style={{ borderColor: 'rgba(248,245,239,0.1)' }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(201,162,39,0.15)',
                  border: '1px solid rgba(201,162,39,0.3)',
                }}
              >
                <FaBook size={16} style={{ color: '#C9A227' }} />
              </div>
              <span
                className="font-black text-lg"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#F8F5EF',
                }}
              >
                BookWorm
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(248,245,239,0.45)' }}
            >
              Your ultimate destination for discovering, reading, and sharing
              amazing books. Join our community of passionate readers today.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: 'rgba(248,245,239,0.08)',
                    border: '1px solid rgba(248,245,239,0.12)',
                    color: 'rgba(248,245,239,0.5)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = '#C9A227')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(248,245,239,0.5)')
                  }
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="font-bold text-sm mb-5 tracking-widest uppercase"
              style={{ color: '#C9A227' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {explore.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="text-sm transition-all hover:pl-1 block"
                    style={{ color: 'rgba(248,245,239,0.45)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#F8F5EF')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(248,245,239,0.45)')
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="font-bold text-sm mb-5 tracking-widest uppercase"
              style={{ color: '#C9A227' }}
            >
              Support
            </h3>
            <ul className="space-y-3">
              {support.map((l, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm transition-all hover:pl-1 block"
                    style={{ color: 'rgba(248,245,239,0.45)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#F8F5EF')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(248,245,239,0.45)')
                    }
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="font-bold text-sm mb-5 tracking-widest uppercase"
              style={{ color: '#C9A227' }}
            >
              Stay Updated
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'rgba(248,245,239,0.45)' }}
            >
              Get the latest book recommendations and news in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(248,245,239,0.06)',
                  border: '1px solid rgba(248,245,239,0.12)',
                  color: '#F8F5EF',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#C9A227')}
                onBlur={(e) =>
                  (e.target.style.borderColor = 'rgba(248,245,239,0.12)')
                }
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                style={{ background: '#6B2737', color: '#F8F5EF' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#4d1c28')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = '#6B2737')
                }
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(248,245,239,0.3)' }}>
            © {year} BookWorm. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Accessibility', 'Sitemap', 'Cookies'].map((l, i) => (
              <a
                key={i}
                href="#"
                className="text-xs transition-colors"
                style={{ color: 'rgba(248,245,239,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A227')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(248,245,239,0.3)')
                }
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
