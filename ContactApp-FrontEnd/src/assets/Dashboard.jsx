import { useContext, useState, useEffect } from "react";
import { store } from "../App";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import LogoutModal from "./LogoutModal";
export default function Dashboard() {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

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

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {openModal && <LogoutModal />}
      <div className="text-5xl">
        <center>DashBoard</center>
      </div>
      <div>
        {data && (
          <>
            <div className="flex cursor-pointer selection:bg-red-500 justify-between bg-green-400 w-[700px] mt-10 p-4 rounded-md text-gray-50 text-lg font-mono mx-auto">
              <ul className="flex flex-col space-y-4">
                <li>Username</li>
                <li>Number</li>
                <li>Email Address</li>
                <Link
                  to="/addcontact"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add new Contact
                </Link>
              </ul>
              <ul className="flex flex-col space-y-4">
                <li>{data.username}</li>
                <li>{data.number}</li>
                <li>{data.email_address}</li>
                <Link
                  to="/contacts"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  View Contacts
                </Link>
              </ul>
            </div>
            <div className="mx-auto text-center m-2">
              <button
                className="bg-red-500 px-5 py-2 rounded-md text-lg text-gray-50"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
