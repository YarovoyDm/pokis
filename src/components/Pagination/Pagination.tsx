import React, { useCallback } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import cn from 'classnames';
import { useLocalStorage } from 'hooks/useLocalStorage';

import styles from './Pagination.module.scss';

type PaginationType = {
    page: number,
    setPage: (page: number) => void,
    pagesQuantity: number,
};

const Pagination:React.FC<PaginationType> = ({ page, setPage, pagesQuantity }) => {
    const { setItemInLocalStorage } = useLocalStorage('page');

    const pageChange = useCallback((page: number): void => {
        setPage(page);
    }, [setPage]);

    const handleChangePage = (
        event: any,
        newPage: number,
      ): void => {
        if( newPage >= 0 && newPage <= (pagesQuantity - 1)){
            setItemInLocalStorage(newPage);
            pageChange(newPage);
        };
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={cn(styles.button, { [styles.disabled]: page <= 0 })}
                onClick={(e) => handleChangePage(e, page - 1)}
            >
                <ArrowBackIosNewIcon className={styles.arrowIcon}/>
            </div>
            <div className={styles.pageCount}>
                <div className={styles.pageTitle}>Page </div>
                <div className={styles.pageNumber}>{page + 1}</div>
            </div>
            <div
                className={cn(styles.button, { [styles.disabled]: page >= pagesQuantity -1 })}
                onClick={(e) => handleChangePage(e, page + 1)}
            >
                <ArrowForwardIosIcon className={styles.arrowIcon}/>
            </div>
        </div>
    );
};

export default Pagination;