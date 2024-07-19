import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
//import { PatientHeader} from './components/PatientHeader';
import Navbar from '../components/Navbar';
import PatientHeader from '../components/PatientHeader';
import PharmacistHeader from '../components/PharmacistHeader';
import AdminHeader from '../components/AdminHeader';
const Home = () => {
    const navigate = useNavigate()

    const { user } = useAuthContext();

    return(       
            <div className="home">
            
            {user && user.user.patient? <PatientHeader /> : null}
            {user && user.user.pharmacist? <PharmacistHeader /> : null}
            {user && !user.user.patient && !user.user.pharmacist && !user.user.doctor? <AdminHeader /> : null}
                <div className='home-header'>
                    <Navbar />
                </div>

                <div className='home-main'>
                </div>
            </div>
    )
}

export default Home;