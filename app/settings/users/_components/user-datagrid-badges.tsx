export default function UserDatagridBadges(active: boolean): HTMLDivElement {
  const badge = document.createElement('div')
  badge.className = `w-fit m-auto text-xs font-medium me-2 px-2.5 py-0.5 rounded ${
    active
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }`
  badge.innerText = active ? 'Ativo' : 'Inativo'
  return badge
}
