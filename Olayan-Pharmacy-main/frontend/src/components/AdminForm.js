import { useState } from "react"
const AdminForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const admin = {username, password, email};
        const response = await fetch('/admin/newAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setError(null);
            setUsername('');
            setPassword('');
            setEmail('');
            console.log("Admin Created Successfully");
        }
    }
    return(
        <div className="user-form">
            <form className="create" onSubmit ={handleSubmit}>
                <h3>Add a new Admin</h3>
                <label>Admin username</label>
                <input
                    type ="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value = {username}
                />
                <label>Admin password</label>
                <input
                    type ="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                />
                <labal>Admin Email</labal>
                <input
                    type ="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                />
                <button>Add Admin</button>
                
                {error && <div className="error">{error}</div>}

            </form>
        </div>
    )
}
export default AdminForm;