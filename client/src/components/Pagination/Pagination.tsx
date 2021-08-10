import classes from './Pagination.module.scss';
import { cn } from '../../utilities/joinClasses';
import { usePagination } from '../../hooks/usePagination';

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}
const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange: number[] | undefined = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <ul className={classes.PaginationContainer}>
      {paginationRange &&
        paginationRange.map((pageNumber: number, index: number) => {
          // If the pageItem is a DOT=-1, render the DOTS unicode character
          if (pageNumber === -1) {
            return (
              <li
                key={index}
                className={cn(classes.PaginationItem, classes.Dots)}
              >
                ....
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              className={cn(
                classes.PaginationItem,
                pageNumber === currentPage ? classes.Selected : ''
              )}
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
    </ul>
  );
};

export default Pagination;
