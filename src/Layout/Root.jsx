import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import './Root.scss'

/** The root layout for the application. */
export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
