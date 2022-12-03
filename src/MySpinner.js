import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

/**
 * Spinner:
 *
 * Props: none
 *
 * State: none
 *
 * {} -> Spinner
 */
function MySpinner() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" />
    </Container>
  );
}

export default MySpinner;
