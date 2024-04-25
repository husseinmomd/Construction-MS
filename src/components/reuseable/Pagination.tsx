import React from "react";
import { FunctionComponent } from "react";
import { IPagedQuery, PagedResponse } from "../../core";
import { Helmet } from "react-helmet";

interface PaginationProps {
  setPagedQuery: React.Dispatch<React.SetStateAction<IPagedQuery<any>>>;
  pagedQuery: IPagedQuery<any>;
  pagedResponse: PagedResponse<any>;
}

function RenderHelmet() {
  return (
    <Helmet>
      <link
        href="/assets/css/elements/custom-pagination.css"
        rel="stylesheet"
        type="text/css"
      />
    </Helmet>
  );
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  setPagedQuery,
  pagedResponse,
}) => {
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(pagedResponse.total / pagedResponse.pageSize);
    const currentPage = pagedResponse.page;

    if (totalPages <= 4) {
      // Display all page numbers if there are 4 or fewer pages
      return Array(totalPages)
        .fill(undefined)
        .map((_, i) => renderPageNumber(i + 1));
    } else {
      // Display first 3 pages, then ellipsis, then last page
      return [
        renderPageNumber(1),
        renderPageNumber(2),
        renderPageNumber(3),
        <li
          key="ellipsis"
          className={
            currentPage < 4 || currentPage === totalPages
              ? "px-2"
              : "active px-2"
          }
          style={{
            cursor:
              currentPage < 4 || currentPage === totalPages ? "" : "pointer",
          }}
        >
          <span>
            {currentPage < 4 || currentPage === totalPages
              ? ">>>"
              : currentPage}
          </span>
        </li>,
        renderPageNumber(totalPages),
      ];
    }
  };

  const renderPageNumber = (pageNumber: number) => (
    <li
      key={pageNumber}
      style={{ cursor: "pointer" }}
      className={pagedResponse.page === pageNumber ? "active" : ""}
      onClick={() => setPagedQuery((prev) => ({ ...prev, page: pageNumber }))}
    >
      <a>{pageNumber}</a>
    </li>
  );

  return (
    <>
      <RenderHelmet />
      <div className="paginating-container pagination-solid">
        <ul className="pagination">
          {pagedResponse.page != 1 && (
            <li
              style={{ cursor: "pointer" }}
              className="prev"
              onClick={() =>
                setPagedQuery((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              <a>Prev</a>
            </li>
          )}

          {renderPageNumbers()}
          {pagedResponse.hasNext && (
            <li
              style={{ cursor: "pointer" }}
              className="next"
              onClick={() =>
                setPagedQuery((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              <a>Next</a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
