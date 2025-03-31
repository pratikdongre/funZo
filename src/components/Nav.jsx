import { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show ? "nav__black" : ""}`}>
      <img
        className="nav__logo"
        src="/images/Netflix-Logo.wine.svg"
        alt="Netflix-logo"
      />
      <img
        className="nav__avatar"
        src="/images/avatar.svg"
        alt="Netflix-avatar"
      />
    </div>
  );
};

export default Nav;
