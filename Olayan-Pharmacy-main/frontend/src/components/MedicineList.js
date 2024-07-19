import { useEffect, useState } from "react";
import { useMedicineContext } from "../hooks/useMedicineContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MedicineList = ({ medicine}) => {
    const { user } = useAuthContext();
    const { dispatch } = useMedicineContext();


    const [error, setError] = useState(null)

    const addToCart = async (e, id) => {
        e.preventDefault();
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

    return (
        <div className="user-details">
            <h4>{medicine._id}</h4>
            {/*medicine.picture=="" ||medicine.picture==null?"": <img width={100} height={100} src={medicine.picture} />*/}
            <h2>{medicine.name}</h2>
            <p>Price: {medicine.price}</p>
            <p>Quantity: {medicine.quantity}</p>
            <p>Active Ingredients: {medicine.active_ingredients}</p>
            <p>Description: {medicine.description}</p>
            <p>Medicinal Use: {medicine.medicinal_use}</p>
            <p><strong>Cost: {medicine.price}</strong></p>
            <p><strong>Quantity: {medicine.quantity}</strong></p>
            <button onClick={(e) => addToCart(e,medicine._id)}><strong>Add to Cart</strong></button>
        </div>
        

    )
}

export default MedicineList;