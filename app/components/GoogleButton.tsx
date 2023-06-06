import { googleSignin } from "@/utils/googleSignin";

export default function GoogleButton() {
  return (
    <div className="google-btn">
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p onClick={googleSignin} className="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
}
