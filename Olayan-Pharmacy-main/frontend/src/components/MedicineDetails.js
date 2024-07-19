import { useEffect, useState } from "react";

const MedicineDetails = () => {

    const [searchInput, setSearchInput] = useState("")
    const [searchInput2, setSearchInput2] = useState("")
    const [medicine, setMedicine] = useState([])
    const [updateName, setUpdateName] = useState('')
    const [updatePrice, setUpdatePrice] = useState(0)
    const [updateQuantity, setUpdateQuantity] = useState(0)
    const [updateActive_ingredients, setUpdateActive_ingredients] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [updateMedicinal_use, setUpdateMedicinal_use] = useState('')
    const [picture, setPicture] = useState('')
    //const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault();
        const input = {name:searchInput};
        const response = await fetch('/pharmacist/filterMedicineName', {
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
            setMedicine(data);
        }
    }

    const handleSearch2 = async (e) => {
        e.preventDefault();
        const input = {medicinal_use:searchInput2};
        const response = await fetch('/pharmacist/filterMedicineUse', {
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
            setMedicine(data);
        }
    }

    const handleUpdateMedicine = async (e, id) => {
        e.preventDefault();
        const medicine = {
            updateName,
            updatePrice,
            updateQuantity,
            updateActive_ingredients,
            updateDescription,
            updateMedicinal_use
        };
        const response = await fetch(`/pharmacist/updateMedicine/${id}`, {
            method: 'PUT',
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
            setUpdateName('');
            setUpdatePrice(0);
            setUpdateQuantity(0);
            setUpdateActive_ingredients('');
            setUpdateDescription('');
            setUpdateMedicinal_use('');
            console.log("Medicine Updated Successfully");
        }
    }
    const fetchMedicine = async () => {
        const med = {name:""};
        const response = await fetch('/pharmacist/filterMedicineName', {
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
            setMedicine(data);
        }
    }


    const submitImage = async (e,id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', picture);
        console.log(formData)

        const response = await fetch(`/pharmacist/uploadMedicinePicture/${id}`, {
            method: 'PUT'
        });
        const json = await response.json();
    }

    const onInputChange = (e) => {
        setPicture(e.target.files[0])
        console.log(e.target.files[0])
    }


    useEffect(() => { 
        fetchMedicine();
    }, []);
    return (
        
            
            
        <div className="workouts">
            <h4>Medicine Details</h4>
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
                <br></br>
                <br></br>
                {medicine.map((medicine) => (
                    <div className="user-details" key={medicine._id}>
                        <h4>{medicine._id}</h4>
                        {/*medicine.picture=="" ||medicine.picture==null?"": <img width={100} height={100} src={medicine.picture} />*/}
                        <h2>{medicine.name}</h2>

                        <p>Price: {medicine.price}</p>
                        <p>Quantity: {medicine.quantity}</p>
                        <p>Active Ingredients: {medicine.active_ingredients}</p>
                        <p>Description: {medicine.description}</p>
                        <p>Medicinal Use: {medicine.medicinal_use}</p>
                        <p>Sales: {medicine.sales}</p>
                        
                        <form>
                        <label>Medicine Picture Input</label>
                            <input
                                type="file"
                                onChange={(e) => onInputChange(e)}
                            />
                            {/*picture=="" ||picture==null?"": <img width={100} height={100} src={picture} />*/}
                            {picture=="" ||picture==null?"": <button onClick={(e)=>submitImage(e,medicine._id)}>Submit Picture</button>}
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
                            
                            
                            <button onClick={(e) => { handleUpdateMedicine(e, medicine._id) }}>Update Medicine</button>
                        </form>
            

                    </div>
                ))}

        </div>
        

    )
}

export default MedicineDetails;