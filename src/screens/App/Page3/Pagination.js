import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={'mx-auto'}>
            <ul className="pagination d-flex flex-wrap justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;