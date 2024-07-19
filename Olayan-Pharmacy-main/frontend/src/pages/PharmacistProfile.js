import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Navbar from "../components/Navbar";
import PharmacistHeader from "../components/PharmacistHeader";
import ChangePasswordForm from "../components/ChangePasswordForm";

const PharmacistProfile = () => {
    const userType = "pharmacist";

    const { user } = useAuthContext();
    const [ pharmacist, setPharmacist ] = useState(null);

    const fetchUser = async () => {
        if(user){
        const response = await fetch('/pharmacist/getPharmacist/' + user.user._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            setPharmacist(data);
            //console.log(pharmacist)
            if(pharmacist){
                //console.log(pharmacist.licenses)
            }
        }
    }
    }

    const download_file = (file) => {
        console.log("download " + file )
    }

    useEffect(() => { 
        fetchUser();
    }, [user,pharmacist]);

    return (
        <div className="home">
            <PharmacistHeader />
            <div className='home-header'>
                <Navbar />
            </div>

            
            
            <div className="profile-main">
                <div className="user-details">
                    {pharmacist && <div className="special-text">Wallet Amount: {pharmacist.wallet_amount}</div>}
                    <h2>Submitted Legal Documents</h2>

                    <h4>Liscenses</h4>
                    {pharmacist && pharmacist.licenses.map((license,index) => (
                        <div key={index}>
                            <label>License {index + 1}: {license.split("/")[license.split("/").length - 1]}</label>
                            <button onClick={() => {download_file(license)}}>download</button>
                        </div>
                    ))}
                    
                    <h4>National ID</h4>
                    {pharmacist && <label>National ID Image : {pharmacist.national_id_document.split("/")[pharmacist.national_id_document.split("/").length - 1]}</label>}
                    {pharmacist && <button onClick={() => {download_file(pharmacist.national_id_document)}}>download</button>}
                    <h4>Degree</h4>
                    {pharmacist && <label>Degree : {pharmacist.pharmacy_degree_document.split("/")[pharmacist.pharmacy_degree_document.split("/").length - 1]}</label>}
                    { pharmacist && <button onClick={() => {download_file(pharmacist.pharmacy_degree_document)}}>download</button>}
            </div>
                <ChangePasswordForm/>
            </div>
        </div>
    )
}
export default PharmacistProfile;