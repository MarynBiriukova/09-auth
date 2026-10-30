//import type { DebouncedState } from 'use-debounce'
import css from './SearchBox.module.css'

interface SearchBoxProps {
  value: string
  onSearch: (text: string) => void   //DebouncedState<>
}

const SearchBox = ({ onSearch, value }: SearchBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }
    return <input
        className={css.input}
        type='text'
        onChange={handleChange}
        placeholder="Search notes"
        value={value}
    />
}

export default SearchBox

