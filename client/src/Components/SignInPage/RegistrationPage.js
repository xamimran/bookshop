import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./registration.css";
import {
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlineHome,
} from "react-icons/hi";
export default function Registration({setLoggedIn}) {
  // the registration for the manager;
  // also for the bookshop
  const [next, setNext] = useState(false);
const [errors,setErrors] = useState(null)
  const [formState, setFormState] = useState({});
  // console.log(formState);

  const navigate = useNavigate();

  function formChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setFormState({ ...formState, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setNext(true);
  }

  function handleRegister(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        password: formState.password,
        password_confirmation: formState.password_confirmation,
        bookshop_name: formState.bookshop_name,
        bookshop_items_alert_limit: formState.bookshop_items_alert_limit,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("role", "manager")
          localStorage.setItem("token", data.jwt);
          setLoggedIn(true)
          navigate("/dash");
        });
      } else {
        r.json().then((e) => setErrors(e));
      }
    });
  }
console.log(errors)
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <h4>
          <b>PIONEER BOOKSHOP MANAGERS</b>
        </h4>
        <button className="btn btn-primary">
          <Link to="/" className="home_link">Home<HiOutlineHome className="home_icon"/></Link>            
        </button>
      </nav>
      <h3>Join Us</h3>
      <div className="container mt-5">
        <div className="row">
          <div className="column w-25 mr-3" style={{marginTop:"150px"}}>
          {next ? (
            <form onSubmit={handleRegister} autoComplete="off">
               <div class="form-group">
                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" name="bookshop_name" placeholder="Bookshop Name" required   onChange={(e) => formChange(e)}/>
              </div>
              <div class="form-group">
                <input type="number" class="form-control" id="name" aria-describedby="emailHelp" name="bookshop_items_alert_limit"  min="100" max="1000" placeholder="Items limit Alert" required   onChange={(e) => formChange(e)}/>
              </div>
                {/* <div className="registration-inputs-container">
                  <input
                    id="name"
                    type="text"
                    name="bookshop_name"
                    placeholder="Bookshop Name"
                    onChange={(e) => formChange(e)}
                  />
                  <input
                    id="quantity"
                    type="number"
                    name="bookshop_items_alert_limit"
                    min="100"
                    max="1000"
                    placeholder="Items limit Alert"
                    onChange={(e) => formChange(e)}
                    required
                  />
                </div> */}
               <button type="submit" class="btn btn-primary mr-2">Register</button>
              <p style={{ color: "red", fontStyle: "italic" }}>
                {errors && `${errors.errors}!`}
              </p>
            </form>
          ) : (
            // <form onSubmit={handleSubmit} autoComplete="off">
            //   <div className="registration-inputs-container">
            //     <div>
            //       <input
            //         id="name"
            //         type="text"
            //         name="name"
            //         placeholder="Name"
            //         onChange={(e) => formChange(e)}
            //         required
            //       />
            //     </div>
            //     <br />
            //     <div className="login_mail">
            //       <HiOutlineMail className="login_left_icon" />
            //       <input
            //         id="email"
            //         type="email"
            //         name="email"
            //         placeholder="Email address"
            //         onChange={(e) => formChange(e)}
            //         required
            //       />
            //     </div>
            //     <br />
            //     <div className="login_pass">
            //       <HiOutlineLockClosed className="login_left_icon" />
            //       <input
            //         id="password"
            //         type="password"
            //         name="password"
            //         placeholder="Password"
            //         onChange={(e) => formChange(e)}
            //         required
            //       />
            //       <HiOutlineEye id="login_view_pass" />
            //     </div>
            //     <br />
            //     <div className="login_pass">
            //       <HiOutlineLockClosed className="login_left_icon" />
            //       <input
            //         id="passwordConfirm"
            //         type="password"
            //         name="password_confirmation"
            //         placeholder="Confirm password"
            //         onChange={(e) => formChange(e)}
            //         required
            //       />
            //       <HiOutlineEye id="login_view_pass" />
            //     </div>
            //   </div>
            //   <br />
            //   <div className="registration-button-form">
            //     <button type="submit">Continue</button>
            //   </div>
            // </form>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div class="form-group">
                <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" required   onChange={(e) => formChange(e)}/>
              </div>
              <div class="form-group">
                <HiOutlineMail className="login_left_icon" />
                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" required   onChange={(e) => formChange(e)}/>
              </div>
              <div class="form-group">
                <HiOutlineLockClosed className="login_left_icon" />
                <input type="password" class="form-control" id="password" name="password" placeholder="Password"required onChange={(e) => formChange(e)}/>
              </div>
              <div class="form-group">
                <HiOutlineLockClosed className="login_left_icon" />
                <input type="password" class="form-control" id="passwordConfirm"  name="password_confirmation" placeholder="Confirm Password"required onChange={(e) => formChange(e)}/>
              </div>
              <button type="submit" class="btn btn-primary mr-2">Continue</button>
            </form>
          )}
          </div>
          <div class="column w-25">
              <img src="https://www.hicom-asia.com/wp-content/uploads/2019/09/ISBN-3-1024x585.jpg" alt="Forest" className="rounded-circle"/>
          </div>
        </div>
      </div>
    </div>
  );
}
