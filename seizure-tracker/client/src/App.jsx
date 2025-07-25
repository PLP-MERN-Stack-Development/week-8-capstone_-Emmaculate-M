import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-cream text-indigo-900 p-4">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
