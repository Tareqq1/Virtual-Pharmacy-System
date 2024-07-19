import { useState } from "react"
import { useMedicineContext } from "../hooks/useMedicineContext"
const MedicineForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [active_ingredients, setActive_ingredients] = useState('')
    const [description, setDescription] = useState('')
    const [medicinal_use, setMedicinal_use] = useState('')
    //const [picture, setPicture] = useState('')
    const { medicine, dispatch } = useMedicineContext();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const medicine = {
            name,
            price,
            quantity,
            active_ingredients,
            description,
            medicinal_use
        };
        const response = await fetch('/pharmacist/newMedicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){

            console.log("Medicine Created Successfully");
        }
    }
    return(
        <div className="user-form">
            <h3>Add a new Medicine To the system</h3>
            <form className="create" onSubmit ={handleSubmit}>
                
                <label>Medicine name</label>
                <input
                    type ="text"
                    onChange={(e) => setName(e.target.value)}
                    value = {name}
                />
                <label>Price</label>
                <input
                    type ="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value = {price}
                />
                <label>Quantity</label>
                <input
                    type ="text"
                    onChange={(e) => setQuantity(e.target.value)}
                    value = {quantity}
                />
                <label>Active Ingredients</label>
                <input
                    type ="text"
                    onChange={(e) => setActive_ingredients(e.target.value)}
                    value = {active_ingredients}
                />
                <label>Description</label>
                <input
                    type ="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value = {description}
                />
                <label>Medicinal Use</label>
                <input
                    type ="text"
                    onChange={(e) => setMedicinal_use(e.target.value)}
                    value = {medicinal_use}
                />
                <button>Add Medicine</button>

            </form>
        </div>
    )
}
export default MedicineForm;