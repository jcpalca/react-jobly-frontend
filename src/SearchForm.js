import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./SearchForm.css";
import { debounce } from "./utils";

/**
 * SearchForm:
 *
 * Props: searchFor - function, to be called in parent
 *
 * State: value - string
 *
 * { JobsList, CompaniesList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  const [value, setValue] = useState("");

  console.log("SearchForm", value);

  /**Handle the input change. */
  function handleChange(evt) {
    setValue(evt.target.value);
    searchFor(evt.target.value.trim());
  }

  return (
    <Form className="SearchForm">
      <Form.Group>
        <Form.Control
          onChange={debounce(handleChange, 300)}
          placeholder="Enter search term"
          className="SearchForm-bar mt-5 form-control-lg"
        />
      </Form.Group>
    </Form>
  );
}

export default SearchForm;
