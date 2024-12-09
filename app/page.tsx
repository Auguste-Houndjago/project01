import Github from "@/components/auth/login"
import ProfileInfo from "@/components/auth/ProfileModal"
import UserProfileTest from "@/components/auth/UserProfileTest"
import { Button } from "@/components/ui/button"

import { Trophy, Users, Calendar, Activity } from "lucide-react"
import Link from "next/link"



export default function Home() {

  const features = [
    {
      icon: Trophy,
      title: "Gestion des Équipes",
      description: "Gérez vos équipes, leurs effectifs et leurs performances",
      href: "/teams",
    },
    {
      icon: Users,
      title: "Gestion des Joueurs",
      description: "Suivez les statistiques et le développement des joueurs",
      href: "/players",
    },
    {
      icon: Calendar,
      title: "Calendrier des Matchs",
      description: "Planifiez et suivez tous les matchs de la saison",
      href: "/matches",
    },
    {
      icon: Activity,
      title: "Statistiques",
      description: "Analysez les performances individuelles et collectives",
      href: "/statistics",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Football Club Management
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Plateforme complète de gestion de club de football
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl w-full">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <div className="relative group overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors">
              <div className="flex flex-col items-center text-center space-y-4">
                <feature.icon className="h-12 w-12 transition-transform group-hover:scale-110" />
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>


  
      </div>
      <Github/>
      <ProfileInfo/>
    </div>
  )
}