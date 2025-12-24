import Link from 'next/link'
import { Search, BookOpen, Users, Star, Shield, Clock, Sparkles, TrendingUp, Award } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 md:py-36 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Plus de 45,678 cours donnés</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Trouvez le professeur idéal pour réussir
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-blue-50 max-w-3xl mx-auto font-light">
                Plus de 2,800 professeurs experts dans toutes les matières.
                <br className="hidden md:block" />
                Cours à domicile, en ligne ou chez le professeur.
              </p>

              {/* Search Bar - Enhanced */}
              <div className="bg-white rounded-2xl shadow-2xl p-3 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Quelle matière ? (ex: Mathématiques, Piano...)"
                      className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-gray-100 transition"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Où ? (ex: Paris, Lyon...)"
                      className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-gray-100 transition"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <Search className="w-5 h-5" />
                    <span className="hidden md:inline">Rechercher</span>
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
        <section className="py-16 -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: '2,847', label: 'Professeurs actifs', icon: Users, color: 'blue' },
                { number: '45,678', label: 'Cours réalisés', icon: TrendingUp, color: 'indigo' },
                { number: '4.9/5', label: 'Note moyenne', icon: Star, color: 'yellow' },
                { number: '98%', label: 'Satisfaction', icon: Award, color: 'green' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100 hover:shadow-2xl">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className={`text-4xl font-extrabold bg-gradient-to-br from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trouvez le professeur parfait en 3 étapes simples
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Search,
                  title: '1. Recherchez',
                  description: 'Parcourez des milliers de profils de professeurs qualifiés dans votre région',
                  color: 'blue',
                },
                {
                  icon: Users,
                  title: '2. Contactez',
                  description: 'Envoyez un message gratuitement et discutez de vos besoins avec le professeur',
                  color: 'indigo',
                },
                {
                  icon: BookOpen,
                  title: '3. Réservez',
                  description: 'Planifiez votre premier cours et commencez à progresser dès aujourd\'hui',
                  color: 'purple',
                },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:shadow-2xl h-full">
                    <div className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Commencer maintenant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
