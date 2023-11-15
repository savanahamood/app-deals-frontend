import { useContext, useEffect, useState } from "react";
import './deals.scss';
import { DealsContext } from "./DealContext";
import { ClaimedDealsContext } from "../ClaimedDeals/ClaimedDealsContext";

import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, Dialog, DialogContent, Button } from "@mui/material";
import { faAngleUp, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
// import { faChevronUp } from "@fortawesome/free-regular-svg-icons";

export default function Deals() {
  const claimedDealstate = useContext(ClaimedDealsContext);

  const state = useContext(DealsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({
    ID: "",
    Name: "",
    Description: "",
    Amount: "",
    Currency: "",
    Status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".hidden-element",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".hidden-element",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDeal = () => {
    state.AddToDealsDb(newDeal);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeal({ ...newDeal, [name]: value });
  };

  const handleDeleteDeal = (dealId) => {
    state.deleteDealsInDb(dealId);
    state.getFromDealsDb();
  };
  const statusOptions = ['Active', 'Inactive', 'Deleted', 'Expired'];

  const handleStatusChange = async (ID) => {
    const currentStatus = state.dealsList.find((deal) => deal.id === ID)?.Status;

    const currentIndex = statusOptions.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    const nextStatus = statusOptions[nextIndex];
  
    console.log(`Updating status for deal ID ${ID} from ${currentStatus} to ${nextStatus}`);
  
    // Update the deal status in the database
    await  state.updateDealsInDb(ID, nextStatus);
    await state.getFromDealsDb();

  };
  // const handleClaimedDeal = (dealId) => {
  //   state.deleteDealsInDb(dealId);
  //   state.getFromDealsDb();
  // };
  const totalPages = Math.ceil(state.dealsList.length / itemsPerPage);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    state.getFromDealsDb();
  }, []);
  return (
    <>
      <div className="dealdeal">
        <div className="dealscon">
          <h1> <span className="yellow">Deals Table</span></h1>
          <div className="helpppBtN">
            <button className="Btn hidden-element" onClick={handleOpenModal}>
              <span className="svgContainer">
                <SvgIcon>
                  <AddIcon></AddIcon>
                </SvgIcon>
              </span>
              <span className="BG"></span>
            </button>
          </div>
          <table className="container">
            <thead>
              <tr>
                <th><h1>ID</h1></th>
                <th><h1>Name</h1></th>
                <th><h1>Description</h1></th>
                <th><h1>Amount</h1></th>
                <th><h1>Currency</h1></th>
                <th><h1>Status</h1></th>
              </tr>
            </thead>
            <tbody>
              {state.dealsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.Name}</td>
                  <td>{element.Description}</td>
                  <td>{element.Amount}</td>
                  <td>{element.Currency}</td>
                  <td>
                    {/* Add a button for status change */}
                    <button className="statusButton" onClick={() => handleStatusChange(element.id)}>
                      {element.Status}
                    </button>
                  </td>
                  <div className="row" style={{ display: "flex", alignItems: "center" }}>
                    <div className="col">
                      {/* Other content in the row */}
                    </div>
                    <div className="col">
                      <FontAwesomeIcon
                        icon={faCalendarPlus}
                        style={{ color: "#fd9191", marginTop: "20px" }}
                        size="2xl"
                        isClick={claimedDealstate.isClick[element.id]} onClick={() => claimedDealstate.AddToClaimedDealsDb(element)}
                      />
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

        <Dialog open={isModalOpen} onClose={handleCloseModal} PaperProps={{
          style: {
            border: 'none',
            boxShadow: 'none',
          },
        }}>
          <DialogContent>
            <div className="addde">
              <form>
                <div className="title">
                  <i className="fas fa-pencil-alt"></i>
                  <h2>Add New Deal</h2>
                </div>
                <div className="info">
                  <input className="fname" type="text" placeholder="Name" label="Name"
                    name="Name"
                    value={newDeal.Name}
                    onChange={handleChange} />
                  <input type="text" placeholder="Description" label="Description"
                    name="Description"
                    value={newDeal.Description}
                    onChange={handleChange} />
                  <input type="text" placeholder="Amount" label="Amount"
                    name="Amount"
                    value={newDeal.Amount}
                    onChange={handleChange} />
                  <input type="text" label="Currency"
                    name="Currency"
                    value={newDeal.Currency}
                    onChange={handleChange} placeholder="Currency" />
                </div>
                <Button variant="contained" color="primary" onClick={handleAddDeal}>
                  Add Deal
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
