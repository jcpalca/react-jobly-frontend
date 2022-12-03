import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./CompanyCard.css";

/**
 * CompanyCard:
 *
 * Props: handle - string
 *        name - string
 *        description - string
 *        logoUrl - string
 *
 * State: none
 *
 * CompanyList -> CompanyCard -> NavLink
 */
function CompanyCard({ handle, name, description, logoUrl }) {
  console.log("CompanyCard");

  return (
    <Card className="CompanyCard m-4">
      <NavLink to={`/companies/${handle}`}>
        <Card.Header as="h1">{name}</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          {logoUrl !== null && (
            <Card.Img src={logoUrl} alt={handle} variant="right" />
          )}
        </Card.Body>
      </NavLink>
    </Card>
  );
}

export default CompanyCard;
