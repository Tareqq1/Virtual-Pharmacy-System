import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import MedicineDetails from "../components/MedicineDetails";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Navbar from '../components/Navbar';
import PatientHeader from '../components/PatientHeader';

const PatientProfile = () => {
    const { user } = useAuthContext();
    const [address, setAddress] = useState("");
    const [ patient, setPatient ] = useState(null);
    const [addAddress, setAddAddress] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error1, setError1] = useState(null)

    const handleClick = () => {
        setAddAddress(!addAddress);
    }

    const addNewAddress = async (e) => {
        e.preventDefault();
        // add new address
        const response = await fetch('/patient/addDeliveryAddress/' + patient._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address: address}),
            credentials: 'include'
        });
        const data = await response.json();
        if(!response.ok){
            setError1(data.error);
            console.log(data.error)
        }
        if(response.ok){
            setAddAddress(false);
            setAddress("");
            fetchPatient();
            //console.log("Address Added Successfully");
            alert("Address Added Successfully")

        }


    }

    const fetchPatient = async () => {
        
        if(user){
            console.log(user.user.patient)
            const response = await fetch('/patient/viewPatient/' + user.user._id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            //console.log(data);
            if(!response.ok){
                console.log(data.error);
            }
            if(response.ok){
                setPatient(data)
            }
        }
    }

    const fetchOrders = async () => {
        if(user){
            const response = await fetch('/patient/viewPatientOrders/' + user.user.patient, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            //console.log(data);
            if(!response.ok){
                console.log(data.error);
            }
            if(response.ok){
                setOrders(data.orders)
                console.log(orders)
        }
    }
    }

    const cancelOrder = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`/patient/cancelOrder/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            fetchOrders();
            console.log("Order Cancelled Successfully");
        }
    }

    useEffect(() => { 
        fetchPatient();
        fetchOrders();
        
    }, [user]);

    return (
        <div className="home">
            <PatientHeader />
                <div className='home-header'>
                <Navbar />
                </div>
            
            <div className="profile-main">
                <ChangePasswordForm/>
                <div className="user-details">
                    <h2>Addresses</h2>
                    <div className="workouts">
                        {patient && patient.addresses.map((item,index) => (
                            <div key = {index} className="user-details">
                                <p>Address {index+1} : <strong>{item.address}</strong></p>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleClick}>Add Address</button>
                    {addAddress && 
                    <div>
                        <form onSubmit={addNewAddress}>
                            <input
                            type="text"
                            placeholder="New Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                            <button type="submit">Submit</button>
                            {error1 && <div className="error">{error1}</div>}
                        </form>
                    </div>}
                    
                    <h2>Orders</h2>
                    
                    <div className="workouts">
                        {orders.length !=0 && orders.map((order,index) => (
                            <div key = {index} className="user-details">
                                <h4>Order ID: {order._id}</h4>
                                <p>Order Status: <strong>{order.status}</strong></p>
                                <p>Order Date: <strong>{order.orderDate}</strong></p>
                                <p>Delivery Address: <strong>{order.address}</strong></p>
                                <p>Medicines: </p>
                                <div>
                                    {order.cart.map((medicine,index) => (
                                        <div key = {index} className="user-details">
                                            <p>Medicine Name: <strong>{medicine.name}</strong></p>
                                            <p>Medicine Quantity: <strong>{medicine.quantity}</strong></p>
                                        </div>
                                    ))}
                                </div>
                                <p>Total: {order.total}</p>
                                <p>Payment Method: {order.paymentMethod}</p>
                                {order.status == "pending" && <button onClick={(e) => cancelOrder(e,order._id)}>Cancel Order</button>}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default PatientProfile;