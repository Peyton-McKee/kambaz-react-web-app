import { Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl placeholder="username" className="wd-username" />
      <br />
      <FormControl
        placeholder="password"
        type="password"
        className="wd-password"
      />
      <br />
      <FormControl
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      />
      <br />
      <Link to="/Kambaz/Account/Profile">
        <Button className="mb-1 w-100">Sign up</Button>
      </Link>
      <br />
      <Link to="/Kambaz/Account/Signin">
        <Button className="w-100">Sign in</Button>
      </Link>
    </div>
  );
}
