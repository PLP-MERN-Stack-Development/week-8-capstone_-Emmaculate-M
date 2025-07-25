import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-orchid text-cream p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SeizureSafe</h1>
      <div className="flex flex-wrap gap-2 justify-center md:justify-end">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/add-seizure" className="hover:underline">Log Seizure</Link>
        <Link to="/emergency" className="hover:underline">Emergency</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
