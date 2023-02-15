import React from "react";
import { RiPlaystationLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "../../service/authService";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import heroImg from "../../assets/heroImg.png";

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <RiPlaystationLine size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/upload">Upload Files</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>File {"&"} Documents Upload Management Solution</h2>
          <p>
            Documents Upload system to control and manage documents in the
            project in real time and integrated to make it easier to develop
            your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/upload">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" className="responsive" />
        </div>
      </section>
    </div>
  );
};

export default Home;
