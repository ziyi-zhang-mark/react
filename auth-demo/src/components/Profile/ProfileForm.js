import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import { apiKey } from "../Auth/AuthForm";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
