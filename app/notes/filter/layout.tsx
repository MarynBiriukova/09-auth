import css from './LayoutNotes.module.css'

interface FilterLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}
const FilterLayout = ({ children, sidebar }: FilterLayoutProps) => {
  return (
    <section className={css.container}>
  <aside className={css.sidebar}>{sidebar}</aside>
  <div className={css.notesWrapper}>{children}</div>
</section>
  )
}

export default FilterLayout