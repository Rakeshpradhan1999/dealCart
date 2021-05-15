import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && (
      <nav aria-label="Paginatation" className="mt-4">
        <ul className="pagination justify-content-center ">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous"></a>
          </li>
          <span aria-hidden="true">&laquo;</span>
          {[...Array(pages).keys()].map((i) => (
            <li
              key={i + 1}
              className={`page-item ${i + 1 === page && "active"} `}
            >
              <Link
                className="page-link"
                to={
                  keyword ? `/search/${keyword}/page${i + 1}` : `/page/${i + 1}`
                }
              >
                {i + 1}
              </Link>
            </li>
          ))}
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Paginate;
