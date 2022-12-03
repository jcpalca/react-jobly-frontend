import Alert from "react-bootstrap/Alert";
/**
 * MyAlert:
 *
 * Props: messages - list of messages
 *        variant - string
 *
 * State:
 *
 * {} -> Alert
 */
function MyAlert({ messages = [], variant = "danger" }) {
  return (
    <Alert className="mt-3" variant={ variant }>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </Alert>
  );
}

export default MyAlert;
