/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Separator } from '@/components/ui/separator'
import { useQueryClient } from '@tanstack/react-query'
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
  ValidationRule,
} from 'devextreme-react/data-grid'
import { DataGridTypes } from 'devextreme-react/cjs/data-grid'
import Button from 'devextreme-react/button'
import { RowUpdatingEvent } from 'devextreme/ui/data_grid'
import { useCallback, useEffect, useRef, useState } from 'react'

import { vwTicketGetAllSchema, TVwTicketGetAll } from '@/schemas'
import CustomStore from 'devextreme/data/custom_store'

import '@/app/theme/dx.fluent.custom-theme.css'
import {
  useTicketCategory,
  useTicketPriority,
  useTickets,
  useTicketStatus,
  useTicketType,
  useUsers,
} from '@/app/hooks/'
import { dateTimeEditorOptions } from '@/lib/dev-extreme-options'

export default function TicketsPage() {
  const queryClient = useQueryClient()
  const { data, refetch } = useTickets()
  const { data: usersList } = useUsers()
  const { data: ticketPriorityList } = useTicketPriority()
  const { data: ticketCategoryList } = useTicketCategory()
  const { data: ticketTypeList } = useTicketType()
  const { data: ticketStatusList } = useTicketStatus()

  const [ticketDataSource, setTicketDataSource] =
    useState<CustomStore<TVwTicketGetAll, string>>()

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)

  useEffect(() => {
    if (data) {
      setTicketDataSource(
        new CustomStore({
          key: 'id',
          load: () => data,
        }),
      )
    }
  }, [data])

  const handleAddTicketClick = useCallback(() => {
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Tickets</h2>
      <Separator />
      <DataGrid
        dataSource={ticketDataSource}
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
            <div className="">Gestão de tickets</div>
          </ItemDataGrid>
          <ItemDataGrid
            location="after"
            locateInMenu="auto"
            showText="always"
            widget="dxButton"
          >
            <Button
              icon="add"
              text="Adicionar Ticket"
              stylingMode="text"
              onClick={handleAddTicketClick}
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

        <Column
          dataField="id"
          caption="id"
          visible={false}
          allowEditing={false}
        />
        <Column dataField="ticket_number" caption="Número" />
        <Column dataField="user_id" caption="Criado por" allowEditing={false}>
          <Lookup dataSource={usersList} valueExpr="id" displayExpr="name" />
        </Column>
        <Column dataField="ticket_priority_id" caption="Prioridade">
          <Lookup
            dataSource={ticketPriorityList}
            valueExpr="id"
            displayExpr="value"
          />
          <ValidationRule type="required" message="Deve indicar prioridade" />
        </Column>
        <Column dataField="ticket_category_id" caption="Categoria">
          <Lookup
            dataSource={ticketCategoryList}
            valueExpr="id"
            displayExpr="value"
          />
          <ValidationRule type="required" message="Deve indicar categoria" />
        </Column>
        <Column dataField="ticket_type_id" caption="Tipo">
          <Lookup
            dataSource={ticketTypeList}
            valueExpr="id"
            displayExpr="value"
          />
          <ValidationRule type="required" message="Deve indicar tipo" />
        </Column>

        <Column dataField="subject" caption="Assunto" />
        <Column dataField="description" caption="Descrição" visible={false} />
        <Column dataField="lkp_ticket_status_id" caption="Estado">
          <Lookup
            dataSource={ticketStatusList}
            valueExpr="id"
            displayExpr="value"
          />
          <ValidationRule type="required" message="Deve indicar estado" />
        </Column>
        <Column dataField="assigned_to_id" caption="Técnico">
          <Lookup dataSource={usersList} valueExpr="id" displayExpr="name" />
        </Column>
        <Column
          dataField="assigned_at"
          caption="Atribuído em"
          dataType="date"
          format={'dd-MM-yyyy'}
          editorOptions={dateTimeEditorOptions}
        />
        <Column dataField="assigned_notes" caption="Notas" />
        <Column
          dataField="created_at"
          caption="Criado em"
          dataType="date"
          format={'dd-MM-yyyy'}
          editorOptions={dateTimeEditorOptions}
          allowEditing={false}
        />
        <Column
          dataField="updated_at"
          caption="Atualizado em"
          visible={false}
        />
        <Column
          dataField="updated_by"
          caption="Atualizado por"
          visible={false}
        />
      </DataGrid>
    </div>
  )
}
