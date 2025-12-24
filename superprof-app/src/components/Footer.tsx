import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              SUPERPROF
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plateforme n°1 de cours particuliers en France.
              Trouvez le professeur idéal parmi des milliers d'experts.
            </p>
            <div className="flex space-x-3 pt-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Pour les élèves</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/search', label: 'Trouver un professeur' },
                { href: '/subjects', label: 'Toutes les matières' },
                { href: '/how-it-works', label: 'Comment ça marche' },
                { href: '/pricing', label: 'Tarifs' },
                { href: '/faq', label: 'FAQ' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Teachers */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Pour les professeurs</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/become-teacher', label: 'Devenir professeur' },
                { href: '/teacher-resources', label: 'Ressources' },
                { href: '/teacher-faq', label: 'FAQ Professeurs' },
                { href: '/teacher-success', label: 'Témoignages' },
                { href: '/teacher-login', label: 'Connexion professeur' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Entreprise</h4>
            <ul className="space-y-3 text-sm mb-6">
              {[
                { href: '/about', label: 'À propos' },
                { href: '/blog', label: 'Blog' },
                { href: '/careers', label: 'Carrières' },
                { href: '/contact', label: 'Contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:contact@superprof.fr" className="hover:text-white transition">
                  contact@superprof.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>01 23 45 67 89</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              &copy; 2024 SUPERPROF. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/legal" className="text-gray-400 hover:text-white transition">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">
                CGU
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
