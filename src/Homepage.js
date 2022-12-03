import { useContext } from "react";
import "./Homepage.css";
import userContext from "./userContext";

/**
 * Homepage:
 *
 * Props: None
 *
 * State: None
 *
 * Routes -> Homepage
 */
function Homepage() {
  console.log("Homepage");

  const { currUser } = useContext(userContext);

  return (
    <div className="Homepage">
      <div className="container text-center justify-content-center align-items-center">
        <h1 className="mb-4 fw-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currUser && (
          <p className="fw-bold">
            Welcome back, {currUser.firstName + " " + currUser.lastName}!
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
