import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Table = ({ transactions, partialSum, totalSum }) => {
    const itemsPerPage = 1; // Aqui o valor foi definido como 1 apenas porque haviam poucos dados.
    const totalPages = transactions.length <= itemsPerPage ? 1 : Math.ceil(transactions.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleFirstPage = () => {
        setCurrentPage(0);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages - 1);
    };

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th colSpan={4}>
                        <span>Saldo total: R${totalSum}</span> <span>Saldo no período: R${partialSum}</span>
                    </th>
                </tr>
                <tr>
                    <th>Data da transferência</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Nome do operador transacionado</th>
                </tr>
            </thead>
            <tbody>
                {transactions
                    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                    .map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>R${transaction.value}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.transactionOperatorName}</td>
                        </tr>
                    ))}
            </tbody>
            {totalPages > 1 && (
                <tfoot>
                    <tr>
                        <td colSpan={4} className="pagination-container">
                            <div className="pagination">
                                <button className='pagination-button' onClick={handleFirstPage} disabled={currentPage === 0}>
                                    &lt;&lt;
                                </button>
                                <ReactPaginate
                                    previousLabel="<"
                                    nextLabel=">"
                                    breakLabel="..."
                                    breakClassName="break-me"
                                    pageCount={totalPages}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName="pagination-inner"
                                    activeClassName="active"
                                />
                                <button className='pagination-button' onClick={handleLastPage} disabled={currentPage === totalPages - 1}>
                                    &gt;&gt;
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
};

export default Table;
