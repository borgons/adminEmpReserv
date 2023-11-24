import React from 'react'


function EmployeePaginate({ empsPerPage, totalEmps, paginate, currentPage, setCurrentPage , nPages }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEmps / empsPerPage); i++){
    pageNumbers.push(i)
  }

  

  const goToNextPage = () => {
    if(currentPage !== nPages)
      return setCurrentPage(currentPage + 1)
  }

  const goToPrevPage = () => {
    if(currentPage !== 1)
      return setCurrentPage(currentPage - 1)
  }

  const prevCurrentPage = currentPage == 1 ? 'd-none page-link' : 'd-block page-link'
  const nextCurrentPage = currentPage === nPages ? 'd-none page-link' : 'd-block page-link'

  return(
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button type="button" className={prevCurrentPage} 
                onClick={goToPrevPage}
              >
                Previous
            </button>
          </li>

          {pageNumbers.map((number) => (
            <li
              key={number}
              className='page-item'>
              <a 
                onClick={() => paginate(number)}
                href="#"
                className="page-link">
                {number}
              </a>
            </li>
          ))}
          
          <li className="page-item">
          <button type="button" className={nextCurrentPage} 
            onClick={goToNextPage}
          >
              Next
          </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default EmployeePaginate