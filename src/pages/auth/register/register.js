import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/actions/authActions";
import loginIllustration from "../../../assets/images/illustration/login.png";

const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = nameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const user = {
      name: name,
      email: email,
      password: password,
      confPassword: password,
    };

    dispatch(signUp(user));
  };

  if (auth.message === "success") {
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  }

  return (
    <div class="w-full flex justify-center max-w-sm p-10 bg-white overflow-y-auto">
      <form class="space-y-6  flex flex-col justify-center">
        <img src={loginIllustration} class="w-[100%]" />
        {isSuccess ? (
          <div
            class="p-3 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
            role="alert"
          >
            <span class="font-medium">Success!</span> Register success, please
            login
          </div>
        ) : (
          <></>
        )}

        <h3 class="text-xl font-medium text-center text-gray-900 dark:text-white">
          Register account
        </h3>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={nameInput}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="full name"
            required
          />
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailInput}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
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
            id="password"
            placeholder="••••••••"
            ref={passwordInput}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleRegister}
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create account
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Have an account?
          <Link
            to="/auth/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
