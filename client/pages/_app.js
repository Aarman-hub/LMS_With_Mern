import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import TopNav from '../components/TopNav';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
