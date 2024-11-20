'use client'
import { useUsers } from '@/app/hooks/useUser'
import { Separator } from '@/components/ui/separator'
import {
  DataGrid,
  FilterRow,
  Form,
  Grouping,
  HeaderFilter,
  Scrolling,
  Toolbar,
  Item as ItemDataGrid,
} from 'devextreme-react/data-grid'
import Button from 'devextreme-react/button'

import { VwUserGetAll } from '@/schemas/index'

import '@/app/theme/dx.fluent.custom-theme.css'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function UsersPage() {
  const { data, isPending, isFetching, refetch } = useUsers(10)
  const [userDataSource, setUserDataSource] = useState<VwUserGetAll[]>([])

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)

  useEffect(() => {
    if (data) {
      setUserDataSource(data)
    }
  }, [data])

  const handleAddUserClick = useCallback(() => {}, [])

  const handleRefreshClick = useCallback(async () => {
    refetch()
    gridRef.current?.instance.refresh()
  }, [refetch])

  return (
    // remove scrool x
    <div suppressHydrationWarning className="dx-viewport p-5 overflow-x-hidden">
      <h2 className="text-3xl font-bold tracking-tight text-white">Users</h2>
      <Separator />
      <DataGrid
        dataSource={userDataSource}
        showBorders={false}
        height={700}
        ref={gridRef}
        columnAutoWidth={true}
        wordWrapEnabled={true}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <Scrolling mode="virtual" />
        <Grouping autoExpandAll={true} allowCollapsing={true} />
        <Toolbar>
          <ItemDataGrid location="before">
            <div className="">Adicione, remova ou altere utilizadores</div>
          </ItemDataGrid>
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="always"
            widget="dxButton"
          >
            <Button
              icon="add"
              text="Adicionar Utilizador"
              stylingMode="text"
              onClick={handleAddUserClick}
            />
          </ItemDataGrid>
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxButton"
          >
            <Button
              icon="refresh"
              text="Refresh"
              stylingMode="text"
              onClick={handleRefreshClick}
            />
          </ItemDataGrid>
        </Toolbar>
      </DataGrid>
    </div>
  )
}
