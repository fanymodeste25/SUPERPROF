import Link from 'next/link'
import { Cookie, Shield, FileText, Settings } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Politique de Cookies - SUPERPROF',
  description: 'Découvrez comment SUPERPROF utilise les cookies pour améliorer votre expérience.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Politique de Cookies
            </h1>
            <p className="text-lg text-gray-600">
              Dernière mise à jour : 31 décembre 2024
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {/* What are cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Qu&apos;est-ce qu&apos;un cookie ?</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone
                lors de la visite d&apos;un site internet. Les cookies permettent au site de reconnaître
                votre appareil lors de vos visites ultérieures et de mémoriser certaines informations
                vous concernant.
              </p>
            </section>

            {/* Why we use cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Pourquoi utilisons-nous des cookies ?</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                SUPERPROF utilise des cookies pour plusieurs raisons :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Assurer le bon fonctionnement de notre plateforme</li>
                <li>Mémoriser vos préférences et paramètres</li>
                <li>Améliorer votre expérience de navigation</li>
                <li>Analyser l&apos;utilisation de notre site pour l&apos;améliorer</li>
                <li>Vous proposer du contenu et des publicités pertinentes</li>
              </ul>
            </section>

            {/* Types of cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types de cookies que nous utilisons</h2>

              <div className="space-y-6">
                {/* Necessary cookies */}
                <div className="border-l-4 border-green-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Cookies nécessaires
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés
                    dans nos systèmes car ils permettent des fonctionnalités de base.
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Exemples :</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                    <li>Cookies de session pour maintenir votre connexion</li>
                    <li>Cookies de sécurité pour protéger votre compte</li>
                    <li>Cookies de préférence de langue</li>
                  </ul>
                </div>

                {/* Analytics cookies */}
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Cookies analytiques
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Ces cookies nous permettent de compter les visites et les sources de trafic afin
                    d&apos;améliorer les performances de notre site. Ils nous aident à savoir quelles pages
                    sont les plus et les moins populaires et à comprendre comment les visiteurs naviguent.
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Exemples :</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                    <li>Google Analytics pour analyser le trafic</li>
                    <li>Statistiques de pages vues</li>
                    <li>Durée de visite et taux de rebond</li>
                  </ul>
                </div>

                {/* Marketing cookies */}
                <div className="border-l-4 border-purple-500 pl-6 py-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Cookies marketing
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Ces cookies peuvent être déposés par nos partenaires publicitaires. Ils peuvent être
                    utilisés pour créer un profil de vos intérêts et vous montrer des publicités pertinentes
                    sur d&apos;autres sites.
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Exemples :</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 ml-4 mt-1">
                    <li>Cookies de reciblage publicitaire</li>
                    <li>Cookies de réseaux sociaux (Facebook, LinkedIn)</li>
                    <li>Cookies de mesure de campagnes publicitaires</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Managing cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion de vos cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous avez le contrôle total sur les cookies que nous utilisons. Vous pouvez à tout moment :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
                <li>Accepter ou refuser les cookies via notre bandeau de consentement</li>
                <li>Modifier vos préférences de cookies à tout moment</li>
                <li>Supprimer les cookies déjà installés sur votre appareil</li>
                <li>Configurer votre navigateur pour bloquer les cookies</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong className="text-blue-900">Note importante :</strong> Si vous choisissez de bloquer
                  tous les cookies, certaines fonctionnalités de notre site pourraient ne pas fonctionner
                  correctement. Les cookies nécessaires resteront actifs pour assurer le bon fonctionnement
                  du site.
                </p>
              </div>
            </section>

            {/* Browser settings */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Configuration de votre navigateur
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous pouvez également gérer les cookies directement depuis votre navigateur :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Google Chrome</h3>
                  <p className="text-sm text-gray-600">
                    Paramètres → Confidentialité et sécurité → Cookies et autres données des sites
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Firefox</h3>
                  <p className="text-sm text-gray-600">
                    Options → Vie privée et sécurité → Cookies et données de sites
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Safari</h3>
                  <p className="text-sm text-gray-600">
                    Préférences → Confidentialité → Gérer les cookies et les données de sites web
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Microsoft Edge</h3>
                  <p className="text-sm text-gray-600">
                    Paramètres → Confidentialité, recherche et services → Cookies
                  </p>
                </div>
              </div>
            </section>

            {/* Duration */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Durée de conservation</h2>
              <p className="text-gray-700 leading-relaxed">
                La durée de conservation des cookies varie selon leur type :
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
                <li><strong>Cookies de session :</strong> Supprimés automatiquement à la fermeture du navigateur</li>
                <li><strong>Cookies analytiques :</strong> Conservés pendant 13 mois maximum</li>
                <li><strong>Cookies marketing :</strong> Conservés pendant 13 mois maximum</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nous contacter</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si vous avez des questions concernant notre utilisation des cookies, n&apos;hésitez pas
                à nous contacter :
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <p className="text-gray-700">
                  <strong>Email :</strong>{' '}
                  <a href="mailto:privacy@superprof.fr" className="text-blue-600 hover:text-blue-700 font-medium">
                    privacy@superprof.fr
                  </a>
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Adresse :</strong> SUPERPROF, 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
              </div>
            </section>
          </div>

          {/* Related links */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents connexes</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/legal"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Mentions légales
              </Link>
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Conditions générales d&apos;utilisation
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
