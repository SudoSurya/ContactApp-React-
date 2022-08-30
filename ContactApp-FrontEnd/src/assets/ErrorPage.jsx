import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1 className="text-4xl text-center">
        Temporal Dead Zone (Only For Aliens)
      </h1>
      <h1 className="text-blue-500 text-5xl mt-16 text-center">
        404 Page Not Found
      </h1>
      <div className="mx-auto mt-16 w-96">
        <Link
          to="/dashboard"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Redirect to HomePage
        </Link>
      </div>
    </div>
  );
}
