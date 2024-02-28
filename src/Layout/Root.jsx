import { Outlet } from "react-router-dom";

/** The root layout for the application. */
export default function Root() {
  return (
    <>
      {/*<Navbar />*/}
      <main>
        <Outlet />
      </main>
    </>
  );
}
