import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

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