import Link from 'next/link'
import { Search, BookOpen, Users, Star, Shield, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Trouvez le professeur idéal pour réussir
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-blue-100">
                Plus de 2,800 professeurs experts dans toutes les matières.
                Cours à domicile, en ligne ou chez le professeur.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-2xl p-2 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Quelle matière ? (ex: Mathématiques, Piano...)"
                      className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Où ? (ex: Paris, Lyon...)"
                      className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Rechercher
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-6 text-sm text-blue-100">
                <span className="mr-2">Recherches populaires:</span>
                <Link href="/search?q=mathematiques" className="underline hover:text-white mr-3">
                  Mathématiques
                </Link>
                <Link href="/search?q=anglais" className="underline hover:text-white mr-3">
                  Anglais
                </Link>
                <Link href="/search?q=guitare" className="underline hover:text-white mr-3">
                  Guitare
                </Link>
                <Link href="/search?q=yoga" className="underline hover:text-white">
                  Yoga
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
                <div className="text-gray-600">Professeurs actifs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">45,678</div>
                <div className="text-gray-600">Cours réalisés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Note moyenne</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Trouvez le professeur parfait en 3 étapes simples
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Recherchez</h3>
                <p className="text-gray-600">
                  Parcourez des milliers de profils de professeurs qualifiés dans votre région
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Contactez</h3>
                <p className="text-gray-600">
                  Envoyez un message gratuitement et discutez de vos besoins avec le professeur
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Réservez</h3>
                <p className="text-gray-600">
                  Planifiez votre premier cours et commencez à progresser dès aujourd'hui
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/search"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Catégories populaires
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Soutien Scolaire', icon: '📚', count: 856 },
                { name: 'Musique', icon: '🎵', count: 423 },
                { name: 'Sport', icon: '🏃', count: 312 },
                { name: 'Arts', icon: '🎨', count: 189 },
                { name: 'Informatique', icon: '💻', count: 267 },
                { name: 'Langues', icon: '🗣️', count: 634 },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/search?category=${category.name}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition group"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count} profs</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Pourquoi choisir SUPERPROF ?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professeurs vérifiés</h3>
                <p className="text-gray-600">
                  Tous nos professeurs sont vérifiés. Diplômes et identité contrôlés.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Avis authentiques</h3>
                <p className="text-gray-600">
                  Consultez les avis vérifiés d'anciens élèves avant de réserver.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexibilité totale</h3>
                <p className="text-gray-600">
                  Choisissez vos horaires, le mode de cours et annulez facilement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Become Teacher CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vous êtes professeur ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Gagnez jusqu'à 3000€/mois en partageant vos connaissances.
              Inscrivez-vous gratuitement et commencez à donner des cours dès aujourd'hui.
            </p>
            <Link
              href="/become-teacher"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              Devenir professeur
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Ils nous font confiance
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Marie D.',
                  role: 'Élève en Terminale',
                  text: 'Grâce à Sophie, j\'ai eu 18/20 en maths au bac ! Elle explique super bien et s\'adapte à mon rythme.',
                  rating: 5,
                },
                {
                  name: 'Thomas L.',
                  role: 'Professionnel',
                  text: 'J\'apprends le piano avec Jean depuis 6 mois. C\'est un excellent pédagogue et les cours en ligne sont très pratiques.',
                  rating: 5,
                },
                {
                  name: 'Julie M.',
                  role: 'Professeure de Yoga',
                  text: 'SUPERPROF m\'a permis de lancer mon activité de prof de yoga. J\'ai déjà 25 élèves réguliers !',
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
