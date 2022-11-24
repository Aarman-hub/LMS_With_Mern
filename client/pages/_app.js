import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import TopNav from '../components/TopNav';
import { ToastContainer } from 'react-toastify';
import { Provider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
