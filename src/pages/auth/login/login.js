import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/actions/authActions";
import loginIllustration from "../../../assets/images/illustration/login.png";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleClick = (e) => {
    e.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    dispatch(signIn(email, password));
  };

  if (auth.name) navigate("/", { replace: true });

  useEffect(() => {
    const config = {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    };

    axios
      .get("https://8628-36-73-62-117.ngrok-free.app/test", config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(123123213);
  }, []);

  return (
    <div class="w-full flex justify-center max-w-sm p-10 bg-white overflow-y-auto">
      <form class="space-y-6  flex flex-col justify-center">
        <img src={loginIllustration} class="w-[100%]" />
        <h3 class="text-xl font-medium text-center text-gray-900 dark:text-white">
          Welcome to ngantin
        </h3>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Email
          </label>
          <input
            type="text"
            ref={emailInput}
            defaultValue="demo@gmail.com"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="user@mail.com"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            ref={passwordInput}
            id="password"
            defaultValue="bismillah123"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-start"></div>
          <a
            href="/"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Lost Password ?
          </a>
        </div>

        <button
          type="submit"
          onClick={handleClick}
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered ?
          <Link
            to="/auth/register"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
