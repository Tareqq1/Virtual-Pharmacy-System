import { useEffect, useState } from "react";
import AdminDetails from "../components/AdminDetails";
import AdminForm from "../components/AdminForm";
import MedicineDetails from "../components/MedicineDetails";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Navbar from "../components/Navbar";
import AdminHeader from "../components/AdminHeader";
const AdminProfile = () => {
    const [admins, setAdmins] = useState([])
    const [patients, setPatients] = useState([])
    const [pharmacist, setPharmacist] = useState([])

    const [manageType, setManageType] = useState("admin")

    const fetchAdmin = async () => {
        const response = await fetch('/admin/viewAdmins', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);

        if(response.ok){
            setAdmins(data);
        }
        
    }
    const fetchPatients = async () => {
        const response = await fetch('/patient/viewAllPatients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(response.ok){
            setPatients(data);
        }
    }

    const fetchPharmacist = async () => {
        const response = await fetch('/admin/viewAllPharmacists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(response.ok){
            setPharmacist(data);
        }
    }

    useEffect(() => {
        

        fetchAdmin();
        fetchPatients();
        fetchPharmacist();
    }, []);

    const handleDeleteUser = async (e,id) => {
        e.preventDefault();
        console.log(id)
        const response = await fetch(`/admin/deleteUser/` + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if(response.ok){
            fetchAdmin();
            fetchPatients();
            fetchPharmacist();
            console.log("User Deleted Successfully");
        }
    }

    const handleAcceptPharmacist = async (e,id) => {
        e.preventDefault();
        //console.log(id)
        const input = {status:"accepted"};
        const response = await fetch(`/admin/changePharmacistStatus/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(response.ok){
            fetchAdmin();
            fetchPatients();
            fetchPharmacist();
            console.log("Pharmacist Accepted Successfully");
        }
    }

    const handleRejectPharmacist = async (e,id) => {
        e.preventDefault();
        //console.log(id)
        const input = {status:"rejected"};
        const response = await fetch(`/admin/changePharmacistStatus/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(response.ok){
            fetchAdmin();
            fetchPatients();
            fetchPharmacist();
            console.log("Pharmacist Rejected Successfully");
        }
    }


    return(
        <div className="home">
            <AdminHeader />
                <div className='home-header'>
                <Navbar />
                </div>
                {manageType == "admin"?<AdminForm/>:null}
            
            <div className="profile-main">
                <ChangePasswordForm/>
                <button onClick={(e) => setManageType("admin")}>Mange Admins</button>
                <button onClick={(e) => setManageType("patient")}>Mange Patients</button>
                <button onClick={(e) => setManageType("pharmacist")}>Mange Pharmacists</button>
                <button onClick={(e) => setManageType("medicine")}>Manage Medicine</button>
                
                {manageType == "admin"?
                <div className="workouts">
                    <h2>All Admin Details</h2>
                    {admins && admins.map((admin) => (
                        <AdminDetails key = {admin._id} admin = {admin}/>
                        
                    ))}
                </div>:null}

                
               {manageType == "patient"?
               <div className="workouts">
               <h2>All Patient Details</h2>
                    {patients && patients.map((patient) => (
                        <div key = {patient._id} className="user-details">
                            <h4>{patient._id}</h4>
                            <p>name: <strong>{patient.name}</strong></p>
                            <p>email: <strong>{patient.email}</strong></p>
                            <p>mobile number: <strong>{patient.mobile_number}</strong></p>
                            <p>date_of_birth: <strong>{patient.date_of_birth}</strong></p>
                            <p>gender: <strong>{patient.gender}</strong></p>
                            <p>emergency_contact name: <strong>{patient.emergency_contact.name}</strong></p>
                            <p>emergency_contact number: <strong>{patient.emergency_contact.mobile_number}</strong></p>
                            <p>wallet amount:<strong>{patient.wallet_amount}</strong></p>
                            <button onClick ={(e) => handleDeleteUser(e,patient._id)}>Delete Patient</button>
                        </div>
                        
                        
                    ))}
                </div>:null}
                
                {manageType == "pharmacist"?
                
                <div className="workouts">
                    <h2>All Pharmacist Details</h2>
                    {pharmacist && pharmacist.map((pharmacist) => (
                        <div key = {pharmacist._id} className="user-details">
                            <h4>{pharmacist._id}</h4>
                            <p>name: <strong>{pharmacist.name}</strong></p>
                            <p>email: <strong>{pharmacist.email}</strong></p>
                            <p>date_of_birth: <strong>{pharmacist.date_of_birth}</strong></p>
                            <p>hourly_rate: <strong>{pharmacist.hourly_rate}</strong></p>
                            <p>affiliated_hospital: <strong>{pharmacist.affiliated_hospital}</strong></p>
                            <p>educational_background: <strong>{pharmacist.educational_background}</strong></p>
                            <h5><p>registration_request_status: <strong>{pharmacist.registration_request_status}</strong></p></h5>
                            <button onClick ={(e) => handleDeleteUser(e,pharmacist._id)}>Delete Pharmacist</button>
                            <br></br>
                            <br></br>
                            {pharmacist.registration_request_status == "pending" &&
                            <div>
                                <button onClick={(e) => handleAcceptPharmacist(e,pharmacist._id)}>Accept pharmacist</button>
                                <button onClick={(e) => handleRejectPharmacist(e,pharmacist._id)}>Reject pharmacist</button>
                            </div>
                            }
                        </div>
                    ))}
                
                
                
                
                </div>:null}
                {manageType == "medicine"?
                <div className="workouts">
                    <MedicineDetails/>
                </div>:null}

            </div>
            
            
            

        </div>
    )
}

export default AdminProfile;