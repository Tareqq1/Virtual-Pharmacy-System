import { useEffect, useState  } from "react";
import { useMedicineContext } from "../hooks/useMedicineContext";
import { useAuthContext } from "../hooks/useAuthContext";
//import MedicineList from "../components/MedicineList";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Navbar from '../components/Navbar';
import PatientHeader from '../components/PatientHeader';

import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const Shop = () => {
    const { user } = useAuthContext();
    const [searchInput, setSearchInput] = useState("")
    const [searchInput2, setSearchInput2] = useState("")
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null)
    const [Total, setTotal] = useState(null)
    const { medicine, dispatch } = useMedicineContext();
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");


    const fetchMedicine = async () => {
        const med = {name:""};
        const response = await fetch('/pharmacist/filterMedicineNameArchive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(med),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

    const fetchPatient = async () => {
        
        if(user){
            //console.log(user.user.patient)
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
                var TOTAL = 0;
                for(var i = 0; i < data.cart.length; i++){
                    TOTAL = TOTAL + data.cart[i].price * data.cart[i].quantity;
                }
                setTotal(TOTAL)
            }
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const input = {name:searchInput};
        const response = await fetch('/pharmacist/filterMedicineNameArchive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

    const handleSearch2 = async (e) => {
        e.preventDefault();
        const input = {medicinal_use:searchInput2};
        const response = await fetch('/pharmacist/filterMedicineUseArchive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

    const addToCart = async (e, id) => {
        e.preventDefault();
        setError(null);
        const input = {medicineId : id};
        const response = await fetch(`/patient/addToCart/` + user.user.patient, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }

        if(response.ok){
            fetchPatient();
            console.log("Medicine Added Successfully");
        }   
    }

    const removeFromCart = async (e, id) => {
        e.preventDefault();
        setError(null);
        const input = {medicineId : id};
        const response = await fetch(`/patient/removeFromCart/` + user.user.patient, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            fetchPatient();
            console.log("Medicine Removed Successfully");
        }
    }

    const checkout = async (e) => {
        e.preventDefault();
        setError(null);
        const input = {
            cart:patient.cart,
            status:"pending",
            total:Total,
            address:address,
            paymentMethod:paymentMethod};
        const response = await fetch(`/patient/checkout/` + user.user.patient, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            fetchPatient();
            fetchMedicine();
            alert("Order Placed Successfully");
            console.log("Order Placed Successfully");
        }
    }


    const deleteFromCart = async (e, id) => {
        e.preventDefault();
        setError(null);
        const input = {index : id};
        const response = await fetch(`/patient/deleteFromCart/` + user.user.patient, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            fetchPatient();
            console.log("Cart Item Deleted Successfully");
        }
    }

    const viewAlternative = async (e, active_ingredients) => {
        e.preventDefault();
        const input = {active_ingredients:active_ingredients};
        const response = await fetch('/pharmacist/viewAlternativeMedicineArchive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        if(!response.ok){
            console.log(data.error);
        }
        if(response.ok){
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }


    useEffect(() => { 
        fetchMedicine();
        fetchPatient();
        
    }, [dispatch,user]);

    

    return (
        <div className="home">
            <PatientHeader />
                <div className='home-header'>
                <Navbar />
                </div>
                           
            <div className="user-form">
                <h2 className="special-text">Your Wallet: {patient && patient.wallet_amount}</h2>
                <h2>Medicine Cart</h2>
                <form className="create">
                    
                    {
                        patient && patient.cart.map((item,index) => (
                            <div className="user-form-shop-item" key ={index}>
                                <p><strong>Item Name:</strong> {item.name}</p>
                                <p><strong>Price:</strong> {item.price}</p>
                                <p><strong>Quantity:</strong> <strong>{item.quantity}</strong></p>
                                <button onClick={(e) => addToCart(e,item.medicineId)}><strong>+</strong></button>
                                <button onClick={(e) => removeFromCart(e,item.medicineId)}><strong>-</strong></button>
                                <button onClick={(e) => deleteFromCart(e,index)}>Remove</button>
                            </div>
                            
                        ))
                    }
                    {patient  && patient.cart.length != 0 && 
                    <div>
                        <p> Total: {Total} EGP </p>
                        <div className="default">
                        <label>Delivery Address</label>
                        <select onChange={(e) => setAddress(e.target.value)}>
                            <option key = {0} value="">Select Address</option>
                            {patient && patient.addresses.map((item,index) => (
                                <option key ={index+1} value={item.address}>{item.address}</option>
                            ))}
                        </select>
                        <br></br>
                        <FormControl>
                        <FormLabel id="payment">Payment Method</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="cash"
                            name="radio-buttons-group"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            row
                        >
                            <FormControlLabel onChange={(e) => console.log(e.target.value)}  value="cash" control={<Radio />} label="cash" />
                            <FormControlLabel onChange={(e) => console.log(e.target.value)} value="credit" control={<Radio />} label="credit" />
                            <FormControlLabel onChange={(e) => console.log(e.target.value)} value="wallet" control={<Radio />} label="wallet" />
                        </RadioGroup>
                        </FormControl>
                        <br></br>
                        <button onClick={(e) => checkout(e)}>Checkout</button>
                    </div>
                    </div>
                    }
                    {error && <div className="error">{error}</div>}
                    
                </form>
                
            </div>
            
            

            <div className="profile-main">
                <div className="workouts">
                    <div>
                        <div>
                                <input
                                    className='input-field'
                                    placeholder='Search by Medicine Name'
                                    type='text'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <button onClick={(e) => { handleSearch(e) }}>search by medicine name</button>
                                <input
                                    className='input-field'
                                    placeholder='Search by Medicinal Use'
                                    type='text'
                                    value={searchInput2}
                                    onChange={(e) => setSearchInput2(e.target.value)}
                                />
                                <button onClick={(e) => { handleSearch2(e) }}>search by medicinal use</button>
                        </div>
                
                    </div>

                    {medicine && medicine.map((medicine,index) => (
                        <div key = {index} className="user-details">
                        {/*<h4>{medicine._id}</h4>*/}
                        {/*medicine.picture=="" ||medicine.picture==null?"": <img width={100} height={100} src={medicine.picture} />*/}
                        <h2>{medicine.name}</h2>
                        <p>Price: {medicine.price}</p>
                        <p>Quantity: {medicine.quantity}</p>
                        <p>Active Ingredients: {medicine.active_ingredients}</p>
                        <p>Description: {medicine.description}</p>
                        <p>Medicinal Use: {medicine.medicinal_use}</p>
                        <p><strong>Cost: {medicine.price}</strong></p>
                        <p><strong>Quantity: {medicine.quantity}</strong></p>
                        {medicine.quantity == 0 ? <div className="error">Out of Stock <a className="alt-text" onClick={(e) => viewAlternative(e,medicine.active_ingredients)}><u>View Alternative Medicine?</u></a></div> :
                        (medicine.prescribed == "Not Prescribed" ?<button onClick={(e) => addToCart(e,medicine._id)}><strong>Add to Cart</strong></button>
                            : <div>Medicine can only be purchased through prescription</div>)}
            
                        </div>
                            
                    ))}
                </div>
            </div>
            
        </div>
    )
}
export default Shop;