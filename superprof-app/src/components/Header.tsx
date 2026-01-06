import Link from 'next/link'
import { Search, User, Menu, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SUPERPROF
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Trouver un prof
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/become-teacher"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Devenir professeur
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Comment ça marche
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
            >
              À propos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <User className="w-5 h-5" />
              <span>Connexion</span>
            </Link>
            <Link
              href="/register"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              S'inscrire
            </Link>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
