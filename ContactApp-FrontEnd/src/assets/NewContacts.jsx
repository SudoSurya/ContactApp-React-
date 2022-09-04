import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { store } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
export default function NewContacts() {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("https://contact-app-backe.herokuapp.com/dashboard", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const onSubmit = (data) => {
    axios
      .post("https://contact-app-backe.herokuapp.com/addcontact", data)
      .then((res) => {
        alert("Contact Added");
      })
      .catch((err) => alert(err.response.data));
  };
  return (
    <div className="w-[600px] mx-auto">
      <h1 className="text-center text-3xl text-slate-800">Add New Contact</h1>
      <form
        className="mt-8 space-y-6 "
        action="#"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm  space-y-3">
          {data && (
            <div className="hidden">
              <label htmlFor="username" className="sr-only">
                Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                defaultValue={data.email_address}
                {...register("admin_mail", { required: true })}
              />
            </div>
          )}
          <div>
            <label htmlFor="username" className="sr-only">
              Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="User Name"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="number" className="sr-only">
              User Name
            </label>
            <input
              id="number"
              name="number"
              type="number"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Number"
              {...register("number", {
                required: true,
                minLength: 10,
              })}
            />
            {errors.number && (
              <span className="text-red-400">
                Phone Number Must Be 10 Digits
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Contact
          </button>
          <Link
            to="/contacts"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Contacts
          </Link>
        </div>
      </form>
    </div>
  );
}
