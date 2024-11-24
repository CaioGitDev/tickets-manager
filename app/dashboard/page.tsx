'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LuCheck, LuFileSpreadsheet } from 'react-icons/lu'
import { BiTimer } from 'react-icons/bi'
import { Overview } from './_components/overview'
import { useDashboardOverview } from '@/app/hooks/useDashboardOverview'
import { useDashboardTicketTriage } from '@/app/hooks/useDashboardTicketTriage'

export default function Dashboard() {
  const { data: dashboardOverview } = useDashboardOverview()
  const { data: dashboardTicketTriage } = useDashboardTicketTriage()

  const totalTickets = dashboardOverview
    ?.filter((item) => item.category === 'Yearly Count')
    .map((item) => item.value)

  const totalTicketsResolved = dashboardOverview
    ?.filter(
      (item) => item.category === 'Status Count' && item.key === 'CLOSED',
    )
    .map((item) => item.value)

  const totalTicketsOpen = dashboardOverview
    ?.filter(
      (item) => item.category === 'Status Count' && item.key === 'IN_PROGRESS',
    )
    .map((item) => item.value)

  const overViewData = dashboardOverview
    ?.filter((item) => item.category === 'Assignments')
    .map((item) => {
      return {
        key: item.key,
        value: item.value,
      }
    })

  return (
    <div
      suppressHydrationWarning
      className="dx-viewport p-5 overflow-x-hidden "
    >
      <h2 className="text-3xl font-bold tracking-tight text-white">
        Dashboard
      </h2>
      <Separator />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visal Geral</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analise
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reportes
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notificações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets</CardTitle>
                  <LuFileSpreadsheet className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTickets}</div>
                  <p className="text-xs text-muted-foreground">
                    total de tickets criados neste ano
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resolvidos
                  </CardTitle>
                  <LuCheck className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalTicketsResolved}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    total de tickets resolvidos
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tempo médio de Resposta
                  </CardTitle>
                  <BiTimer className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4 dias</div>
                  <p className="text-xs text-muted-foreground">
                    mais rápido que a média do ano passado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Em Aberto
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTicketsOpen}</div>
                  <p className="text-xs text-muted-foreground">
                    +10 nos ultimos 2 dias
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Atribuidos por técnico</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview data={overViewData ?? []} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Aguardar triagem</CardTitle>
                  <CardDescription>
                    Ultimos {dashboardTicketTriage?.length} tickets criados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardTicketTriage?.map((item) => (
                    <div className="space-y-8 p-2" key={item.ticket_number}>
                      <div className="flex items-center">
                        <div className="text-sm font-medium leading-none align-top">
                          {item.ticket_number}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.created_by}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.subject}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
