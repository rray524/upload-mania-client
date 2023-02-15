import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_LOGOUT } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../service/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.auth.userName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    await dispatch(SET_LOGOUT());
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <div className="link__styles">
          <Link to="/">
            <button className="--btn --btn-danger">Home</button>
          </Link>
          <button onClick={logout} className="--btn --btn-danger">
            Logout
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
