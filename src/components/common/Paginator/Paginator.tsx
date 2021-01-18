import React, {useState} from 'react';
import s from './Paginator.module.css';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onChangePage: (page: number) => void
}

let Paginator: React.FC<PropsType> = ({totalCount, pageSize, currentPage, onChangePage}) => {

    const [partPages, setPartPages] = useState(1)
    let pages = [];
    let pageCount = Math.ceil(totalCount / pageSize);

    for (let p = 1; p <= pageCount; p++) {
        pages.push(p)
    }

    return (
            <div>
                {(partPages > 1) && <button onClick={ () => { setPartPages (partPages - 1) } }>Prev {pageSize}</button>}
                {pages
                    .filter( p => (p >= (partPages - 1) * pageSize) && (p < (partPages) * pageSize) )
                    .map((page) => {
                    return <button className={page === currentPage ? s.selected : ''}
                                   onClick={ (e) => { onChangePage(page) } } key={page}>
                        {page}</button>
                })}
                {(partPages < (pageCount - 2)) && <button onClick={ () => {
                    setPartPages (partPages + 1) } }>Next {pageSize}</button>}
            </div>
    )
}

export default Paginator;