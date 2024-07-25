import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginUserMutation,
  useSignupUserMutation,
  RootState,
} from "../../store";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import { setUser } from "../../store/slices/authSlice";
import log from "./LoginComponent.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LoginComponent: React.FC = () => {
  const [
    loginUser,
    {
      isError: isLoginError,
      isSuccess: isLoginSuccess,
      isLoading: isLoginLoading,
      data: loginData,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [
    signupUser,
    {
      isError: isSignupError,
      isSuccess: isSignupSuccess,
      isLoading: isSignupLoading,
      data: signupData,
      error: signupError,
    },
  ] = useSignupUserMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const registerBtnRef = useRef<HTMLButtonElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;
    const container = containerRef.current;

    if (registerBtn && loginBtn && container) {
      const addClass = () => container.classList.add(log.active);
      const removeClass = () => container.classList.remove(log.active);

      registerBtn.addEventListener("click", addClass);
      loginBtn.addEventListener("click", removeClass);

      return () => {
        registerBtn.removeEventListener("click", addClass);
        loginBtn.removeEventListener("click", removeClass);
      };
    }
  }, []);

  // handling form input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { message, user } = await signupUser({
        name,
        email,
        password,
      }).unwrap();
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Failed to signup", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { message, user } = await loginUser({ email, password }).unwrap();
      dispatch(setUser(user));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  return (
    <div className={log.global}>
      <div className={log.mainContainer}>
        <div className={log.container} id="container" ref={containerRef}>
          <div className={log.formContainer + " " + log.signUp}>
            <form className={log.form} onSubmit={handleSignup}>
              <h1>Create Account</h1>
              <div className={log.socialIcons}>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <Button type="submit">Sign Up</Button>
              {isSignupSuccess && (
                <p>User Created Successfully. Please log in</p>
              )}
              {isSignupError && <p>User Failed to Create. Please try again</p>}
            </form>
          </div>
          <div className={log.formContainer + " " + log.signIn}>
            <form className={log.form} onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className={log.socialIcons}>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="#" className={log.icon}>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your email password</span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
              <a href="#">Forget Your Password?</a>
              <Button type="submit">Sign In</Button>
            </form>
          </div>
          <div className={log.toggleContainer}>
            <div className={log.toggle}>
              <div className={log.togglePanel + " " + log.toggleLeft}>
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button id="login" ref={loginBtnRef}>
                  Sign In
                </button>
              </div>
              <div className={log.togglePanel + " " + log.toggleRight}>
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button id="register" ref={registerBtnRef}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
