import { Outlet } from 'react-router';
import Footer from '../Componentes/Footer';
import Navber from '../Componentes/Navber/Navber';

const Root = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: '#F8F5EF' }}
    >
      <Navber />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
