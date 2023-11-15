import { useContext, useEffect, useState } from "react";
import './user.scss';
import { UsersContext } from "./UsersContext";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon, Dialog, DialogContent, Button } from "@mui/material";
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function Users() {
  const state = useContext(UsersContext);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    ID: "",
    Name: "",
    image: "",
    email: "",
    Phone: "",
    Status: "",
    Gender: "",
    Date_Of_Birth: "",
    // role: "",
    // username: "",
    password: "123",
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

  const handleAddUser = () => {
    state.AddToUsersDb(newUser);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

  };

  const handleDeleteUser = (userId) => {
    state.deleteUsersInDb(userId);
    state.getFromUsersDb();
  };
  const statusOptions = ['Active', 'Inactive', 'Deleted', 'Expired'];

  const handleStatusChange = async (ID) => {
    const currentStatus = state.usersList.find((user) => user.id === ID)?.Status;

    const currentIndex = statusOptions.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusOptions.length;
    const nextStatus = statusOptions[nextIndex];

    console.log(`Updating status for deal ID ${ID} from ${currentStatus} to ${nextStatus}`);

    // Update the deal status in the database
    await state.updateUsersInDb(ID, nextStatus);
    await state.getFromUsersDb();

  };
  const totalPages = Math.ceil(state.usersList.length / itemsPerPage);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (userId) => {
    const updatedSelectedUsers = [...selectedUsers];

    if (updatedSelectedUsers.includes(userId)) {
      updatedSelectedUsers.splice(updatedSelectedUsers.indexOf(userId), 1);
    } else {
      updatedSelectedUsers.push(userId);
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const handleDeleteSelected = () => {
    selectedUsers.forEach((userId) => {
      state.deleteUsersInDb(userId);
    });
    setSelectedUsers([]);
    state.getFromUsersDb();
  };


  useEffect(() => {
    state.getFromUsersDb();
  }, []);
  return (
    <>
      <div className="useruser">
        <div className="dealscon">
          <h1> <span className="yellow">Users Table</span></h1>
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
            <thead className="">
              <tr>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>ID</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Image</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Name</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Gender</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Date_Of_Birth</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Status</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Phone</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Email</h1></th>
                <th style={{ textAlign: 'center' }}><h1 style={{ textAlign: 'center' }}>Actions</h1></th>

              </tr>
            </thead>
            <tbody>
              {state.usersList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((element) => (
                <tr key={element.id}>
                  <td style={{ textAlign: 'center' }}>{element.id} </td>
                  <td style={{ textAlign: 'center' }}>{element.image}</td>
                  <td style={{ textAlign: 'center' }}>{element.Name}</td>
                  <td style={{ textAlign: 'center' }}>{element.Gender}</td>
                  <td style={{ textAlign: 'center' }}>{element.Date_Of_Birth}</td>
                  <td style={{ textAlign: 'center' }}><button className="statusButton" onClick={() => handleStatusChange(element.id)}>
                    {element.Status}
                  </button></td>
                  <td style={{ textAlign: 'center' }}>{element.Phone}</td>
                  <td style={{ textAlign: 'center' }}>{element.email}</td>

                  <div className="row" style={{ display: "flex", alignItems: "center" }}>
                    <div className="col">
                      {/* Other content in the row */}
                    </div>
                    <div className="col">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ color: "#fd9191", marginTop: "20px" }}
                        size="2xl"
                        onClick={() => handleDeleteUser(element.id)}
                      />
                    </div>
                  </div>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(element.id)}
                      onChange={() => handleCheckboxChange(element.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="delete-selected-container">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteSelected}
              disabled={selectedUsers.length === 0}
            >
              Delete Selected
            </Button>
          </div>
          <div className="useruser pagination-container">
            <section className="pagination">
              <button id="pg-button-prev" type="button" className="pagination__button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleUp} rotation={270} />
              </button>
              <ul className="pagination__list">
                {pageButtons.map((page) => (
                  <li key={page} className={`pagination__item pagination__item--${page}`}>
                    <button id={`pg-button-${page}`} type="button" onClick={() => handlePageChange(page)}>{page}</button>
                  </li>
                ))}
              </ul>
              <button id="pg-button-next" type="button" className="pagination__button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faAngleUp} rotation={90} />
              </button>
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
                  <h2>Add New User</h2>
                </div>
                {/* <td>{element.id}</td>
                  <td>{element.image}</td>
                  <td>{element.Name}</td>
                  <td>{element.Gender}</td>
                  <td>{element.Date_Of_Birth}</td>
                  <td>{element.Status}</td>
                  <td>{element.Phone}</td>
                  <td>{element.email}</td> */}
                <div className="info">
                  <input className="fname" type="text" placeholder="Name" label="Name"
                    name="Name"
                    value={newUser.Name}
                    onChange={handleChange} />
                  <input type="text" placeholder="Gender" label="Gender"
                    name="Gender"
                    value={newUser.Gender}
                    onChange={handleChange} />
                  <input type="text" placeholder="Date_Of_Birth" label="Date_Of_Birth"
                    name="Date_Of_Birth"
                    value={newUser.Date_Of_Birth}
                    onChange={handleChange} />
                  <input type="text" label="Status"
                    name="Status"
                    value={newUser.Status}
                    onChange={handleChange} placeholder="Status" />
                  <input className="email" type="text" placeholder="email" label="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange} />
                  {/* Hidden image input */}
                  {/* <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="image"
                    style={{ display: 'none' }}
                    id="imageInput"
                  /> */}

                  {/* Image input label/button */}
                  {/* <label htmlFor="imageInput" className="image-input-label">
                    Add Image
                  </label> */}
                </div>
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                  Add User
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
