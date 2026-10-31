//import { getNoteTags } from '@/lib/api'
import Link from 'next/link'
import css from './SidebarNotes.module.css'

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


const SidebarNotes = async () => {
  //const res = await getNoteTags()
  //const tags = res.slice(0, 3)
  return (
    <ul className={css.menuList}>
  {/* список тегів */}
  <li className={css.menuItem}>
    <Link href={`/notes/filter/all`} className={css.menuLink}>
      All notes
    </Link>
          </li>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
    
              </li>
             ))} 
</ul>

  )
}

export default SidebarNotes