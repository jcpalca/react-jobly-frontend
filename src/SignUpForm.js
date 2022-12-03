import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Form";
import MyAlert from "./MyAlert";

/**
 * SignUpForm:
 *
 * Props: signUp - function, to be called in parent
 *
 * State: formData - like {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  }
          errors - array of Errors
 *
 * App -> Routes -> SignUpForm
 */
function SignUpForm({ signUp }) {
  console.log("SignUpForm");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);

  /**Handles the input change. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  /**Handle form submission. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setErrors(["Passwords must match."]);
    }

    try {
      // make axios call
      const copy = { ...formData };
      delete copy["confirmPassword"];
      await signUp(copy);
      navigate("/");
      // reroute to main page
    } catch (err) {
      // set errors
      setErrors(err);
    }
  }

  return (
    <Form className="SignUpForm container" onSubmit={handleSubmit}>
      <Form.Text as="h1">Sign Up</Form.Text>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          value={formData.username}
          name="username"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          value={formData.password}
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          value={formData.confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          value={formData.firstName}
          name="firstName"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          value={formData.email}
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors.length > 0 && <MyAlert messages={errors} />}
      <Button as="button" className="btn btn-primary">
        Submit
      </Button>
    </Form>
  );
}

export default SignUpForm;
