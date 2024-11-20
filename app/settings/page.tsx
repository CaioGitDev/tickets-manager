'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const router = useRouter()

  // Dados para os cartões
  const settingsOptions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove users.',
      route: '/settings/users',
    },
    {
      title: 'Manage Roles',
      description: 'Define roles and responsibilities.',
      route: '/settings/roles',
    },
    {
      title: 'Manage Services',
      description: 'Configure system services.',
      route: '/settings/services',
    },
    {
      title: 'Manage Permissions',
      description: 'Set access controls and permissions.',
      route: '/settings/permissions',
    },
  ]

  return (
    // create settings page with cards
    // manager users
    // nanager roles
    // manager services
    // manager permissions

    // add title to the page and description

    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
      <Separator />
      <div className="container mx-auto mt-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsOptions.map((option, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(option.route)}
          >
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{option.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
