import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <strong> VideoMemedu62 </strong>
      </div>
      <ul className={styles.headerList}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
      </ul>
    </header>
  );
}

export default Header;
