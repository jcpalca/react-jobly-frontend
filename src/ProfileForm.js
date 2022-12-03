import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserJobs from "./UserJobs"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Form";
import MyAlert from "./MyAlert";
import userContext from "./userContext";
import "./ProfileForm.css"

/**
 * ProfileForm:
 *
 * Props: editProfile - function, to be called in parent
 *
 * State: formData - like {
    username: "",
    first: "",
    last: "",
    email: "",
  }
          errors - array of Errors
 *
 * Context: currUser
 *
 * App -> Routes -> ProfileForm
 */
function ProfileForm({ editProfile }) {
  console.log("ProfileForm");

  const navigate = useNavigate();

  const { currUser } = useContext(userContext);

  const [formData, setFormData] = useState({
    username: currUser.username,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
  });
  const [errors, setErrors] = useState([]);

  if(!currUser) return null;

  // useEffect(() => {
  //   if (currUser) {
  //     setFormData({
  //       username: currUser.username,
  //       firstName: currUser.firstName,
  //       lastName: currUser.lastName,
  //       email: currUser.email,
  //     });
  //   }
  // }, [currUser]);

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
    const copy = { ...formData };
    delete copy["username"];
    try {
      // make axios call
      await editProfile(currUser.username, copy);
      // reroute to main page
      navigate("/");
    } catch (err) {
      // set errors
      setErrors([err]);
    }
  }

  // if (!currUser) {
  //   return <MySpinner />;
  // }

  return (
    <div className="ProfileForm">
      <Form className="container" onSubmit={handleSubmit}>
        <Form.Text as="h1" className="ProfileForm-title mt-3">
          {currUser.username}'s Profile
        </Form.Text>
        <Form.Group>
          <Form.Label className="ProfileForm-username">Username:</Form.Label>
          <Form.Control value={formData.username} name="username" disabled />
        </Form.Group>

        <Form.Group>
          <Form.Label className="ProfileForm-firstname">First Name:</Form.Label>
          <Form.Control
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="ProfileForm-lastname">Last Name:</Form.Label>
          <Form.Control
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="ProfileForm-email">Email:</Form.Label>
          <Form.Control
            value={formData.email}
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.length > 0 && <MyAlert messages={errors} />}
        <Button as="button" className="btn btn-primary mt-3">
          Edit Profile
        </Button>
      </Form>
      <UserJobs />
    </div>
  );
}

export default ProfileForm;
