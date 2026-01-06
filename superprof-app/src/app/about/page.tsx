import Link from 'next/link'
import { Users, Target, Heart, Award, Sparkles, TrendingUp, Globe, Shield } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'À propos - SUPERPROF',
  description: 'Découvrez l\'histoire de SUPERPROF, la plateforme n°1 de cours particuliers en France.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Notre Histoire</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                À propos de SUPERPROF
              </h1>
              <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto font-light">
                La plateforme qui connecte des milliers d&apos;élèves avec les meilleurs professeurs depuis 2013
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Notre Mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Chez SUPERPROF, nous croyons que chacun mérite d&apos;avoir accès à un enseignement de qualité.
                Notre mission est de rendre l&apos;apprentissage accessible à tous en connectant les élèves avec
                les professeurs parfaitement adaptés à leurs besoins.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Que vous souhaitiez apprendre une nouvelle langue, maîtriser un instrument de musique,
                améliorer vos compétences académiques ou découvrir un nouveau hobby, nous sommes là pour
                vous aider à atteindre vos objectifs.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Nos Valeurs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Les principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: 'Passion',
                  description: 'Nous aimons ce que nous faisons et mettons du cœur dans chaque interaction',
                  color: 'red',
                },
                {
                  icon: Shield,
                  title: 'Confiance',
                  description: 'La sécurité et la transparence sont au cœur de notre plateforme',
                  color: 'green',
                },
                {
                  icon: Users,
                  title: 'Communauté',
                  description: 'Nous créons des liens durables entre élèves et professeurs',
                  color: 'blue',
                },
                {
                  icon: TrendingUp,
                  title: 'Excellence',
                  description: 'Nous visons toujours l&apos;amélioration continue de nos services',
                  color: 'purple',
                },
              ].map((value, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                SUPERPROF en chiffres
              </h2>
              <p className="text-xl text-blue-100">
                Notre impact sur l&apos;éducation en France
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { number: '2,847', label: 'Professeurs actifs', icon: Users },
                { number: '45,678', label: 'Cours réalisés', icon: TrendingUp },
                { number: '250+', label: 'Matières enseignées', icon: Award },
                { number: '98%', label: 'Taux de satisfaction', icon: Sparkles },
              ].map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-blue-100 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Notre Histoire
                </h2>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">2013 - Les débuts</h3>
                  <p className="text-gray-700 leading-relaxed">
                    SUPERPROF est né d&apos;une idée simple : faciliter la rencontre entre ceux qui veulent apprendre
                    et ceux qui veulent enseigner. Avec seulement quelques dizaines de professeurs, nous avons lancé
                    notre plateforme avec l&apos;ambition de révolutionner les cours particuliers.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-600">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">2016 - Expansion nationale</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Grâce à la confiance de nos utilisateurs, nous avons rapidement grandi pour couvrir toute la France.
                    Plus de 1000 professeurs nous ont rejoint, offrant des cours dans plus de 100 matières différentes.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">2020 - L&apos;ère numérique</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Face aux nouveaux défis, nous avons développé notre plateforme de cours en ligne, permettant à
                    nos professeurs et élèves de continuer à apprendre ensemble, où qu&apos;ils soient.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-pink-600">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">Aujourd&apos;hui</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Avec plus de 2,800 professeurs actifs et des dizaines de milliers d&apos;élèves satisfaits,
                    SUPERPROF est devenu la référence en matière de cours particuliers en France. Notre communauté
                    continue de grandir chaque jour, unie par la passion de l&apos;apprentissage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Notre Équipe
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Une équipe passionnée dédiée à votre réussite
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Notre équipe est composée d&apos;éducateurs, de développeurs, de designers et de passionnés
                d&apos;éducation qui travaillent ensemble pour créer la meilleure expérience possible pour
                nos utilisateurs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous sommes constamment à l&apos;écoute de votre feedback pour améliorer notre plateforme
                et vous offrir les meilleurs outils pour apprendre et enseigner.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-50">
              Que vous soyez élève ou professeur, rejoignez des milliers de personnes
              qui partagent la passion de l&apos;apprentissage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Trouver un professeur
              </Link>
              <Link
                href="/become-teacher"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/20"
              >
                Devenir professeur
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
