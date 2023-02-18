import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlineHome
} from "react-icons/hi";
import "./sigin.css";

export default function SignIn({setLoggedIn}) {
  // The signIn page
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [action, setAction] = useState(false);

  function handleInput(e) {
    const key = e.target.name;
    const value = e.target.value;
    setErrors()

    setErrors("");
    setFormData({ ...formData, [key]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        role: action ? "" : "manager",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            localStorage.setItem("user", JSON.stringify(user.user));
            localStorage.setItem("token", user.jwt);
            localStorage.setItem("role", action?"":"manager");
            setLoggedIn(true)
            navigate(`${action ? "/make_sale" : "/dash"}`);
          });
        } else {
          console.log(r.status)
          setErrors("Wrong Email or Password")
        }
      })
      .catch((err) => {
        setErrors(err)});
  }

  return (

    // <div className="registration-nav">
    //       <h2>PIONEER BOOKSHOP MANAGERS</h2>
    //       <button>
    //       <Link to="/" className="home_link">Home</Link>
    //       <HiOutlineHome className="home_icon"/>          </button>
    //     </div>
    <div>
      <nav class="navbar navbar-light bg-light">
        <h4>
          <b>PIONEER BOOKSHOP MANAGERS</b>
        </h4>
        <button className="btn btn-primary">
          <Link to="/" className="home_link">Home<HiOutlineHome className="home_icon"/></Link>            
        </button>
      </nav>
      <div className="container mt-5">
        <div class="row">
          <div class="column w-25 mr-3" style={{marginTop:"150px"}}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div class="form-group">
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) => {handleInput(e);}}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => {handleInput(e);}}/>
                <HiOutlineEye id="login_view_pass" />
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={action} onChange={() => setAction(!action)}/>
                  <label class="form-check-label" for="flexCheckChecked">
                    Access Point of Sale
                  </label>
              </div>
              <button type="submit" class="btn btn-primary mr-2">Login</button>
              <Link to="/signup">
              <button class="btn btn-primary"> Register</button>
              </Link>
              </form>
              <p style={{ color: "red", fontStyle: "italic" }}>
                {errors && `${errors}!`}
              </p>
              <div className="mb-1">
                <span>Forgot password?</span>
              </div>
          </div>
          <div class="column w-25">
              <img src="https://www.urbansider.com/wp-admin/admin-ajax.php?action=kernel&p=image&src=file%3Dwp-content%252Fuploads%252FCategories%252FShopping%252FTheAbbeyBookshop2-e1653042668321.jpg%26type%3Dwebp%2C85%26thumbnail%3D800%2C600&hash=3585194a" alt="Forest"/>
          </div>
        </div>
      </div>
    </div>
    // <div className="sign-in">
    //   <div className="registration">  
    //     <div className="registration-container">
    //       <div className="registration-signup-form">
    //         <h3>Welcome back</h3>
    //         <form onSubmit={handleSubmit} autoComplete="off">
    //           <div className="login-inputs-container">
    //             <div className="login_mail">
    //               <HiOutlineMail  className="login_left_icon"/>
    //               <input
    //                 id="email"
    //                 type="email"
    //                 name="email"
    //                 placeholder="Email address"
    //                 required
                    // onChange={(e) => {
                    //   handleInput(e);
                    // }}
    //               />
    //             </div>
    //             <div className="login_pass">
    //               <HiOutlineLockClosed className="login_left_icon"/>
    //               <input
    //                 id="password"
    //                 type="password"
    //                 name="password"
    //                 placeholder="Password"
    //                 required
    //                 onChange={(e) => {
    //                   handleInput(e);
    //                 }}
    //               />
    //               <HiOutlineEye id="login_view_pass" />
    //             </div>
    //           </div>
    //           <br />
    //           <div className="login-button-form">
    //             <button type="submit">Login</button>
    //             <button> <Link to="/signup">Register</Link></button>
    //           </div>
    //           <div className="login_forgot_password">
    //             <span>Forgot password?</span>
    //           </div>
    //         </form>
    //         <p style={{ color: "red", fontStyle: "italic" }}>
    //           {errors && `${errors}!`}
    //         </p>
    //         <div className="login-checkbox">
    //           <label>
    //             <input
    //               type="checkbox"
    //               checked={action}
    //               onChange={() => setAction(!action)}
    //             />
    //             Access Point of Sale
    //           </label>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  //    <div className="registration-welcome-message">
  //    <img src="/svgs/login-svg.svg" alt="#" />
  //    <h5>Hey, welcome back</h5>
  //    <p>Good to see you again</p>
  //  </div>
  );
}
