import Link from 'next/link'
import { Search, User, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">
              SUPERPROF
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Trouver un prof
            </Link>
            <Link
              href="/become-teacher"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Devenir professeur
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Comment ça marche
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
            >
              <User className="w-5 h-5" />
              <span>Connexion</span>
            </Link>
            <Link
              href="/register"
              className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              S'inscrire
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
