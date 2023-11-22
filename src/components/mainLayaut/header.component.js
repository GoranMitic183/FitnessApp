import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import InboxModal from "./inboxModal.component";
import { BlogContext } from "../../store/blogContext";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";

const Header = () => {
  const { messages, admin, adminCheck, getMessagesQuery, changeContentHelper } = useContext(BlogContext);
  const navigate = useNavigate();

  useEffect(()=> {
  const data = getMessagesQuery()
  },[])

  let numberOfMessages;
  if (messages && messages.length === 0) {
    numberOfMessages = 0;
  } else {
    numberOfMessages = messages.length;
  }

  const modal = useRef();

  const [isUserName, setIsUserName] = useState("");

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);

      if (parsedToken.role === 1) {
        adminCheck(true);
      }

      if (parsedToken.username) {
        const name = parsedToken.username;
        setIsUserName(name);
      }
    }
  }, [storedToken, isUserName, adminCheck]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    changeContentHelper("")
  };

  const handleOpenModal = () => {
    modal.current.open();
  };

  let modalActions = <button style={{margin: "0.5rem"}} className="btn  btn-secondary">Close</button>;

  return (
    <div className={`container ${classes.body}`}>
      <nav className={`navbar bg-dark ${classes.header}`} data-bs-theme="dark">
        <div className="container-fluid" style={{ justifyContent: "inherit" }}>
          <h3 className={classes.logo}>{`Welcome ${isUserName}`}</h3>
          <div>
            <InboxModal ref={modal} actions={modalActions} />
            {admin && storedToken && (
              <button
                type="button"
                className="btn btn-primary position-relative"
                style={{ marginRight: "1.5rem" }}
                onClick={handleOpenModal}
              >
                Inbox
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numberOfMessages}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            )}
            {storedToken && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
