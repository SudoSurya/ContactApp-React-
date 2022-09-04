import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { store } from "../App";
import { Link } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/20/solid";
export default function ViewContacts() {
  const [token, setToken] = useContext(store);
  const [contacts, setContacts] = useState(null);
  const [data, setData] = useState(null);
  if (data) {
    localStorage.setItem("email", data.email_address);
  }
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
  useEffect(() => {
    axios
      .get("https://contact-app-backe.herokuapp.com/contacts")
      .then((res) => setContacts(res.data))
      .catch((error) => console.log(error));
  }, []);

  const removeContact = (_id) => {
    axios
      .delete(`https://contact-app-backe.herokuapp.com/delete/${_id}`)
      .then((res) => {
        setContacts(res.data);
        alert("Record Deleted");
      });
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      <h1 className="text-center text-4xl capitalize underline decoration-emerald-400 underline-offset-8">
        View Contacts
      </h1>

      <div>
        <div className="flex w-[600px] mx-auto my-4 justify-between">
          <Link
            to="/addcontact"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Add new Contact
          </Link>
          <Link
            to="/dashboard"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Go Back To Dashboard
          </Link>
        </div>
        {data && (
          <>
            {contacts &&
              contacts.map((item, index) => {
                const { _id, name, number, email, admin_mail } = item;
                if (localStorage.getItem("email") === admin_mail) {
                  let c = 0;
                  return (
                    <div
                      key={_id}
                      className="overflow-hidden bg-white shadow sm:rounded-lg w-[600px] mx-auto my-4"
                    >
                      <div className="px-4 py-5 sm:px-6 flex justify-between">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Contact {c + 1}
                        </h3>
                        <h3
                          className="bg-red-500 cursor-pointer px-5 py-2 rounded-md text-lg text-gray-50"
                          onClick={() => removeContact(_id)}
                        >
                          delete
                        </h3>
                      </div>
                      <div className="border-t border-gray-200">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {name}
                            </dd>
                          </div>
                          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Phone Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {number}
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              {email}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  );
                }
              })}
          </>
        )}
      </div>
    </div>
  );
}
