import { useContext, useEffect, useState } from "react";
import './claimeddeals.scss';
import { LoginContext } from "../Auth/login/LogInContext";
import { ClaimedDealsContext } from "./ClaimedDealsContext";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function ClaimedDeals() {
  const LoginState = useContext(LoginContext);
  const claimedstate = useContext(ClaimedDealsContext);
  console.log(LoginState.user, "///////4444444//////");

  const handleDeleteDeal = (element) => {
    claimedstate.deleteFromClaimedDealsDb(element)
    claimedstate.getFromClaimedDealsDb()
  }
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const totalCount = claimedstate.claimeddealList.length;
    const totalAmount = claimedstate.claimeddealList.reduce((sum, deal) => sum + parseFloat(deal.Amount), 0);
    setTotalCount(totalCount);
    setTotalAmount(totalAmount);
  }, [claimedstate.claimeddealList]);

  const totalPages = Math.ceil(claimedstate.claimeddealList.length / itemsPerPage);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="dealdeal">
        <div className="dealscon">
          <h1> <span className="yellow">Claimed Deals Table</span></h1>
          <div>

            <p style={{ color: "white" }}>Total Count: {totalCount}</p>
            <p style={{ color: "white" }}>Total Amount: {totalAmount}</p>
          </div>

  
          <table className="container">
            <thead>
              <tr>
                <th><h1>ID</h1></th>
                <th><h1>Amount</h1></th>
                <th><h1>Currency</h1></th>
              </tr>
            </thead>
            <tbody>
              {claimedstate.claimeddealList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.Amount}</td>
                  <td>{element.Currency}</td>
                  <div className="row" style={{ display: "flex", alignItems: "center" }}>
                    <div className="col">
                    </div>
                    <div className="col">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#fd9191", marginTop: "20px" }}
                        size="2xl"
                        onClick={() => handleDeleteDeal(element.id)}
                      />
                    </div>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dealdeal pagination-container">

            <section className="pagination">
              <button id="pg-button-prev" type="button" className="pagination__button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleUp} rotation={270} />            </button>

              <ul className="pagination__list">
                {pageButtons.map((page) => (
                  <li key={page} className={`pagination__item pagination__item--${page}`}>
                    <button id={`pg-button-${page}`} type="button" onClick={() => handlePageChange(page)}>{page}</button>
                  </li>
                ))}
              </ul>

              <button id="pg-button-next" type="button" className="pagination__button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faAngleUp} rotation={90} />          </button>

            </section>
          </div>
        </div>

      </div>
    </>
  );
}
