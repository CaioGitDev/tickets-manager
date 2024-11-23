/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  Column,
  Lookup,
  Editing,
  Popup,
} from 'devextreme-react/data-grid'
import { DataGridTypes } from 'devextreme-react/cjs/data-grid'
import Button from 'devextreme-react/button'

import { User, VwUserGetAll } from '@/schemas/index'

import '@/app/theme/dx.fluent.custom-theme.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRole } from '@/app/hooks/useRole'
import { useService } from '@/app/hooks/useService'
import UserDatagridBadges from './_components/user-datagrid-badges'

import config from 'devextreme/core/config'
import CustomStore from 'devextreme/data/custom_store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RowUpdatingEvent } from 'devextreme/ui/data_grid'
config({
  editorStylingMode: 'underlined',
})

const dateTimeEditorOptions = {
  placeholder: 'dd-MM-yyyy',
  showClearButton: true,
  useMaskBehavior: true,
  displayFormat: 'dd-MM-yyyy',
  openOnFieldClick: true,
  type: 'date',
  applyValueMode: 'useButtons',
}

export default function UsersPage() {
  const queryClient = useQueryClient()
  const [popupVisible, setPopupVisible] = useState(false)
  const { data, isPending, isFetching, refetch } = useUsers(10)
  const { data: roleList } = useRole()
  const { data: serviceList } = useService()

  const [userDataSource, setUserDataSource] =
    useState<CustomStore<VwUserGetAll, string>>()

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)

  const insertUser = useMutation({
    mutationFn: async (newUser: User) => {
      const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  useEffect(() => {
    if (data) {
      setUserDataSource(
        new CustomStore({
          key: 'id',
          load: () => data,
          insert: async (values) => {
            const result = await insertUser.mutateAsync({
              ...values,
              active: Boolean(values.active),
            })
            return result
          },
          update: async (key, values) => {
            const response = await fetch(`/api/user?id=${key}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            })
            const data = await response.json()
            return data
          },
        }),
      )
    }
  }, [data])

  const handleAddUserClick = useCallback(() => {
    gridRef.current?.instance.addRow()
    gridRef.current?.instance.deselectAll()
  }, [gridRef])

  const handleRefreshClick = useCallback(async () => {
    refetch()
    gridRef.current?.instance.refresh()
  }, [refetch])

  return (
    <div
      suppressHydrationWarning
      className="dx-viewport p-5 overflow-x-hidden "
    >
      <h2 className="text-3xl font-bold tracking-tight text-white">
        Utilizadores
      </h2>
      <Separator />
      <DataGrid
        dataSource={userDataSource}
        showBorders={true}
        height={700}
        ref={gridRef}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        onRowUpdating={(e: RowUpdatingEvent) => {
          e.newData = Object.assign(e.oldData, e.newData)
        }}
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
        <Editing
          mode="popup"
          useIcons={true}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={false}
        >
          <Popup
            title="Utilizador"
            showTitle={true}
            width="90vw"
            height="80vh"
            dragEnabled={false}
          />
          <Form showValidationSummary={true} ref={formRef}></Form>
        </Editing>
        <Column
          dataField="id"
          caption="id"
          visible={false}
          allowEditing={false}
        />
        <Column
          dataField="name"
          caption="Nome"
          visible={true}
          validationRules={[
            {
              type: 'required',
              message: 'O nome é obrigatório',
            },
          ]}
        />
        <Column
          dataField="email"
          caption="Email"
          visible={true}
          validationRules={[
            {
              type: 'required',
              message: 'O email é obrigatório',
            },
          ]}
        />
        <Column
          dataField="role_id"
          caption="Cargo"
          visible={true}
          validationRules={[
            {
              type: 'required',
              message: 'O cargo é obrigatório',
            },
          ]}
        >
          <Lookup dataSource={roleList} valueExpr="id" displayExpr="name" />
        </Column>
        <Column
          dataField="service_id"
          caption="Serviço"
          visible={true}
          validationRules={[
            {
              type: 'required',
              message: 'O serviço é obrigatório',
            },
          ]}
        >
          <Lookup dataSource={serviceList} valueExpr="id" displayExpr="name" />
        </Column>
        <Column
          dataField="active"
          dataType="boolean"
          caption="Ativo"
          visible={true}
          cellTemplate={(
            container: HTMLElement,
            { row }: DataGridTypes.ColumnCellTemplateData,
          ) => {
            const { active } = row.data
            return UserDatagridBadges(active)
          }}
        />
        <Column
          dataField="created_at"
          caption="Criado em"
          visible={true}
          dataType="date"
          format={'dd-MM-yyyy'}
          editorOptions={dateTimeEditorOptions}
          allowEditing={false}
        />
      </DataGrid>
    </div>
  )
}
