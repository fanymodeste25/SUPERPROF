import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SUPERPROF</h3>
            <p className="text-sm">
              La plateforme n°1 de cours particuliers en France.
              Trouvez le professeur idéal parmi des milliers d'experts.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pour les élèves</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="hover:text-white transition">
                  Trouver un professeur
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="hover:text-white transition">
                  Toutes les matières
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Teachers */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pour les professeurs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/become-teacher" className="hover:text-white transition">
                  Devenir professeur
                </Link>
              </li>
              <li>
                <Link href="/teacher-resources" className="hover:text-white transition">
                  Ressources
                </Link>
              </li>
              <li>
                <Link href="/teacher-faq" className="hover:text-white transition">
                  FAQ Professeurs
                </Link>
              </li>
              <li>
                <Link href="/teacher-success" className="hover:text-white transition">
                  Témoignages
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2024 SUPERPROF. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/legal" className="hover:text-white transition">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
