import { useEffect, useState  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
//import MedicineList from "../components/MedicineList";
import MedicineDetails from "../components/MedicineDetails";
import MedicineForm from "../components/MedicineForm";
import { useMedicineContext } from "../hooks/useMedicineContext";   
import Navbar from "../components/Navbar";
import PharmacistHeader from "../components/PharmacistHeader";
import UpdateMedicineForm from "../components/UpdateMedicineForm";
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';



const Medicine = () => {
    const { user } = useAuthContext();
    const [searchInput, setSearchInput] = useState("")
    const [searchInput2, setSearchInput2] = useState("")
    const [error, setError] = useState(null)
    const [errorImage, setErrorImage] = useState(null)
    const [picture, setPicture] = useState("")
    const { medicine, dispatch } = useMedicineContext();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [active_ingredients, setActive_ingredients] = useState('')
    const [description, setDescription] = useState('')
    const [medicinal_use, setMedicinal_use] = useState('')
    const [archived, setArchived] = useState(false)
    const [prescribed, setPrescribed] = useState(false)


    

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
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

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
            dispatch({type: 'SET_MEDICINE', payload: data});
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
            dispatch({type: 'SET_MEDICINE', payload: data});
        }
    }

    const toggleArchive = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`/pharmacist/toggleArchive/${id}`, {
            method: 'PUT'
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_MEDICINE', payload: json});
        }
    }

    const togglePrescribed = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`/pharmacist/togglePrescription/${id}`, {
            method: 'PUT'
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_MEDICINE', payload: json});
        }
    }

    const uploadImage = async (e,id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', picture);
        console.log(formData)
        
        const response = await fetch('/pharmacist/uploadMedicinePicture/' + id, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
        })
    
        const json = await response.json();
        if(!response.ok){
            setErrorImage(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_MEDICINE', payload: medicine});
            setErrorImage(null);
            alert("Image Uploaded Successfully");
        }
    }


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
                setError(json.error);
                console.log(json.error);
            }
            if(response.ok){
                alert("Medicine Created Successfully");
                setName('');
                setPrice(0);
                setQuantity(0);
                setActive_ingredients('');
                setDescription('');
                setMedicinal_use('');
                dispatch({type: 'ADD_MEDICINE', payload: json});
                console.log("Medicine Created Successfully");
            }
    }





    useEffect(() => { 
        fetchMedicine()
    }, [dispatch]);

    

    return (
        <div className="home">
            <PharmacistHeader />
                <div className='home-header'>
                <Navbar />
                </div>

                <div className="user-form">
                <h4>Add a new Medicine To the system</h4>
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
                    {error && <div className="error">{error}</div>}

                </form>
            </div>
            

            <div className="profile-main">
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
                    {medicine && medicine.length != 0? medicine.map((medicineItem) => (
                        <div className="user-details" key={medicineItem._id}>
                            <h4>{medicineItem._id}</h4>
                            {medicineItem.picture != "" && <img src= {""} />}
                            <image></image>
                            <input 
                                type="file"
                                name="uploadedFile" 
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                setPicture(e.target.files[0]);
                            }} />
                            {errorImage && <div className="error">{errorImage}</div>}
                            <button onClick={(e) => uploadImage(e,medicineItem._id)}>Upload Image</button>
                            <h2>{medicineItem.name}</h2>
                            {medicineItem.archived == "Archived" && <button onClick={(e) => toggleArchive(e,medicineItem._id)}>Unarchive</button>}
                            {medicineItem.archived == "Not Archived" && <button onClick={(e) => toggleArchive(e,medicineItem._id)}>Archive</button>}
                            {medicineItem.prescribed == "Prescribed" && <button onClick={(e) => togglePrescribed(e,medicineItem._id)}>Unprescribe</button>}
                            {medicineItem.prescribed == "Not Prescribed" && <button onClick={(e) => togglePrescribed(e,medicineItem._id)}>Prescribe</button>}

                            <p>Price: {medicineItem.price}</p>
                            <p>Quantity: {medicineItem.quantity}</p>
                            <p>Active Ingredients: {medicineItem.active_ingredients}</p>
                            <p>Description: {medicineItem.description}</p>
                            <p>Medicinal Use: {medicineItem.medicinal_use}</p>
                            <p>Sales: {medicineItem.sales}</p>
                            <p><strong>{medicineItem.archived}</strong> </p>
                            <p><strong>{medicineItem.prescribed}</strong></p>
                            <UpdateMedicineForm key={medicineItem._id} medicine={medicineItem} />
                        </div>
                    )): <div>No Medicine Added Yet</div>}

                </div>
            </div>
            
        </div>
    )
}
export default Medicine;