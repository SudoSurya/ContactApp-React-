import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { store } from "../App";
export default function ViewContacts() {
  const [token, setToken] = useContext(store);
  const [contacts, setContacts] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard", {
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
      .get("http://localhost:5000/contacts")
      .then((res) => setContacts(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <center>View Contacts</center>
      <div>
        {data && (
          <div className="w-[600px] mx-auto">
            <table className="border-collapse">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Number</th>
                <th className="p-2 border">Email</th>
              </tr>

              {contacts &&
                contacts.map((item) => {
                  const { _id, name, number, email, admin_mail } = item;
                  if (data.email_address === admin_mail) {
                    return (
                      <tr>
                        <td className="p-2 border">{name}</td>
                        <td className="p-2 border">{number}</td>
                        <td className="p-2 border">{email}</td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
