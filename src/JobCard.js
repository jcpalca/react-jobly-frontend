import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./JobCard.css";
import { useContext, useEffect, useState } from "react";
import userContext from "./userContext";

/**
 * JobCard:
 *
 * Props: id - number
 *        handle - string
 *        name - string
 *        description - string
 *        logoUrl - string
 *
 * State: none
 *
 * { JobList, CompanyDetail, UserJobs }  -> JobCard
 */
function JobCard({ id, title, salary, equity, companyName }) {
  console.log("JobCard");

  const { applyToJob, hasApplied, unapplyToJob } = useContext(userContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(hasApplied(id));
  }, [id, hasApplied]);

  function handleApply(evt) {
    if (hasApplied(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  function handleUnapply(evt) {
    if (!hasApplied(id)) return;
    unapplyToJob(id);
    setApplied(false);
  }

  return (
    <Card className="JobCard m-4">
      <Card.Header as="h1">{title}</Card.Header>
      <Card.Body>
        <Card.Title>{companyName}</Card.Title>
        <Card.Text className="m-0">Salary: {salary}</Card.Text>
        <Card.Text className="m-0">Equity: {equity}</Card.Text>
        <Button
          className={`JobCard-Btn ${applied ? "btn-danger" : "btn-primary"}`}
          onClick={applied ? handleUnapply : handleApply}
        >
          {applied ? "Unapply" : "Apply"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
