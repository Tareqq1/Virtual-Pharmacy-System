import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Register = ( ) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date_of_birth, setDate_of_birth] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState([]);
    const [mobile_number, setMobile_number] = useState('')
    const [emergency_contact_name, setEmergency_contact_name] = useState('')
    const [emergency_contact_mobile, setEmergency_contact_mobile] = useState('')

    const [usernameP, setUsernameP] = useState('')
    const [passwordP, setPasswordP] = useState('')
    const [nameP, setNameP] = useState('')
    const [emailP, setEmailP] = useState('')
    const [date_of_birthP, setDate_of_birthP] = useState('')
    const [hourly_rate, setHourly_rate] = useState('')
    const [affiliated_hospital, setAffiliated_hospital] = useState('')
    const [educational_background, setEducational_background] = useState('')

    const [licenses, setLicenses] = useState([]);
    const [degree, setDegree] = useState(null);
    const [nid, setNid] = useState(null);

    const [error, setError] = useState('')

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        console.log(licenses);
      }, [licenses]);
    


    const handleSubmitPatient = async (e) => {
        e.preventDefault();
        const patient = {
            username,
            password,
            name,
            email,
            date_of_birth,
            gender,
            addresses: [{address}],
            mobile_number,
            emergency_contact:{name:emergency_contact_name,mobile_number:emergency_contact_mobile}};
        const response = await fetch('/register/newPatient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setUsername('');
            setPassword('');
            setName('');
            setEmail('');
            setMobile_number('');
            setDate_of_birth('');
            setGender('');
            setMobile_number('');
            setEmergency_contact_name('');
            setEmergency_contact_mobile('');
            console.log("Your Patient Account has been Created Successfully");
            setError('');
            alert("Your Patient Account has been Created Successfully");
            navigate('/')
        }
    }
    const handleSubmitPharmacist = async (e) => {
        e.preventDefault();
        const pharmacist = {
            username:usernameP,
            password:passwordP,
            name:nameP,
            email:emailP,
            date_of_birth:date_of_birthP,
            hourly_rate,
            affiliated_hospital,
            educational_background};
        
        const formData = new FormData();

        formData.append("national_id_document",nid)
        formData.append("pharmacy_degree_document",degree)

        for (let i = 0; i<licenses.length;i++){
            formData.append("licenses", licenses[i]);
        }
        formData.append("username", usernameP);
        formData.append("password", passwordP);
        formData.append("name", nameP);
        formData.append("email", emailP);
        formData.append("date_of_birth", date_of_birthP);
        formData.append("hourly_rate", hourly_rate);
        formData.append("affiliated_hospital", affiliated_hospital);
        formData.append("educational_background", educational_background);

        const response = await fetch('/register/newPharmacist', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
        })
    
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setUsernameP('');
            setPasswordP('');
            setNameP('');
            setEmailP('');
            setDate_of_birthP('');
            setHourly_rate('');
            setAffiliated_hospital('');
            setNid(null)
            setDegree(null)
            setLicenses([])
            console.log("Pharmacist Created Successfully");
            setError('');
            alert("Your Pharmacist Account has been Created Successfully");
            navigate('/')
        }
    }

    

    return(
        <div className="login-page">
            <div className="loginForm">
                    {state.role == 0?
                <form className="login-form" onSubmit ={handleSubmitPatient}>
                    <h3>Register as a Patient</h3>
                    <label>username</label>
                    <input
                        type ="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value = {username}
                    />
                    <label>password</label>
                    <input
                        type ="text"
                        onChange={(e) => setPassword(e.target.value)}
                        value = {password}
                    />
                    <label>name</label>
                    <input
                        type ="text"
                        onChange={(e) => setName(e.target.value)}
                        value = {name}
                    />
                    <label>email</label>
                    <input
                        type ="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value = {email}
                    />
                    <label>mobile_number</label>
                    <input
                        type ="text"
                        onChange={(e) => setMobile_number(e.target.value)}
                        value = {mobile_number}
                        />
                    <label>date_of_birth</label>
                    <input
                        type ="text"
                        placeholder="YYYY-MM-DD"
                        onChange={(e) => setDate_of_birth(e.target.value)}
                        value = {date_of_birth}
                    />
                    <label>gender</label>
                    <input
                        type="text"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                    />
                    <label>Address</label>
                    <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                    <label>emergency_contact_name</label>
                    <input
                        type="text"
                        onChange={(e) => setEmergency_contact_name(e.target.value)}
                        value={emergency_contact_name}
                    />
                    <label>emergency_contact_mobile</label>
                    <input
                        type="text"
                        onChange={(e) => setEmergency_contact_mobile(e.target.value)}
                        value={emergency_contact_mobile}
                    />
                    {error && <div className="error">{error}</div>}
                    
                    <button>Register</button>
                </form>:
                <form className="login-form" onSubmit ={handleSubmitPharmacist}>
                    <h3>Register as a Pharmacist</h3>
                    <label>username</label>
                    <input
                        type ="text"
                        onChange={(e) => setUsernameP(e.target.value)}
                        value = {usernameP}
                    />
                    <label>password</label>
                    <input
                        type ="text"
                        onChange={(e) => setPasswordP(e.target.value)}
                        value = {passwordP}
                    />
                    <label>name</label>
                    <input
                        type ="text"
                        onChange={(e) => setNameP(e.target.value)}
                        value = {nameP}
                    />
                    <label>email</label>
                    <input
                        type ="text"
                        onChange={(e) => setEmailP(e.target.value)}
                        value = {emailP}
                    />
                    <label>date_of_birth</label>
                    <input
                        type ="text"
                        placeholder="YYYY-MM-DD"
                        onChange={(e) => setDate_of_birthP(e.target.value)}
                        value = {date_of_birthP}
                    />
                    <label>Pharmacist Degree</label>                    
                    <input
                        onChange={(e) => {
                        setDegree(e.target.files[0]);
                        }}
                        type="file"
                        name="uploadedFile"
                    />
                    <label>National ID</label>                    
                    <input
                        onChange={(e) => {
                        setNid(e.target.files[0]);
                        }}
                        type="file"
                        name="uploadedFile"
                    />
                    <label>Liscenses</label>                    
                    <input
                        onChange={(e) => {
                            setLicenses([e.target.files[0], ...licenses]);
                        }}
                        type="file"
                        name="uploadedFile"
                        placeholder="Upload licenses"
                    />
                    {licenses.map((license) => (
                    <p key={license.name}>{license.name}</p>
                    ))}

                    
                    <label>hourly_rate</label>
                    <input
                        type ="text"
                        onChange={(e) => setHourly_rate(e.target.value)}
                        value = {hourly_rate}
                    />
                    <label>affiliated_hospital</label>
                    <input
                        type ="text"
                        onChange={(e) => setAffiliated_hospital(e.target.value)}
                        value = {affiliated_hospital}
                    />
                    <label>educational_background</label>
                    <input
                        type ="text"
                        onChange={(e) => setEducational_background(e.target.value)}
                        value = {educational_background}
                    />
                    {error && <div className="error">{error}</div>}
                    <button>Register</button>
                </form>
                }
                <br></br>
                <p>Already have an account? <Link to="/"><a>Sign In</a></Link></p>
        </div>
        </div>
        
    )
}

export default Register;