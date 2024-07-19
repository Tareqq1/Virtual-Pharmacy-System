import { useEffect, useState } from "react";
import { useMedicineContext } from "../hooks/useMedicineContext";
const UpdateMedicineForm = ({medicine}) => {

    const { dispatch } = useMedicineContext();
    const [updateName, setUpdateName] = useState('')
    const [updatePrice, setUpdatePrice] = useState(0)
    const [updateQuantity, setUpdateQuantity] = useState(0)
    const [updateActive_ingredients, setUpdateActive_ingredients] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [updateMedicinal_use, setUpdateMedicinal_use] = useState('')
    const [error, setError] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)

    const handleUpdateMedicine = async (e) => {
        e.preventDefault();
        console.log(medicine._id)
        const med = {
            name: updateName,
            price: updatePrice,
            quantity: updateQuantity,
            active_ingredients: updateActive_ingredients,
            description: updateDescription,
            medicinal_use: updateMedicinal_use
        };
        console.log(med)
        const response = await fetch(`/pharmacist/updateMedicine/${medicine._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(med)
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
            setError(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_MEDICINE', payload: medicine});
            setUpdateName('');
            setUpdatePrice(0);
            setUpdateQuantity(0);
            setUpdateActive_ingredients('');
            setUpdateDescription('');
            setUpdateMedicinal_use('');
            setError(null)
            setIsUpdated(false)
            alert("Medicine Updated Successfully");
            console.log("Medicine Updated Successfully");
        }
    }




    return (
        
            
            
        <div>
            <button onClick={()=>setIsUpdated(!isUpdated)}>Toggle Update Medicine</button>
            {isUpdated?<form>
                            <h3>Update Medicine Form</h3>
                            
                            <label>Medicine name</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateName(e.target.value)}
                                value={updateName}
                            />
                            <label>Price</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdatePrice(e.target.value)}
                                value={updatePrice}
                            />
                            <label>Quantity</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateQuantity(e.target.value)}
                                value={updateQuantity}
                            />
                            <label>Active Ingredients</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateActive_ingredients(e.target.value)}
                                value={updateActive_ingredients}

                            />
                            <label>Description</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateDescription(e.target.value)}
                                value={updateDescription}
                            />
                            <label>Medicinal Use</label>
                            <input

                                type="text"
                                onChange={(e) => setUpdateMedicinal_use(e.target.value)}
                                value={updateMedicinal_use}
                            />
                            
                            
                            <button onClick={(e) => { handleUpdateMedicine(e) }}>Submit Update</button>
                            {error && <div className="error">{error}</div>}
                        </form>: null}

        </div>
        

    )
}

export default UpdateMedicineForm;