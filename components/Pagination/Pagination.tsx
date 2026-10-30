import ReactPaginate from 'react-paginate';
import type { ReactPaginateProps } from "react-paginate";
import styles from './Pagination.module.css'
import type { ComponentType } from "react";
//type ModuleWithDefault<T> = { default: T };

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}
/****************************************************** */
//const ReactPaginate = (
//  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
//).default;


function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination