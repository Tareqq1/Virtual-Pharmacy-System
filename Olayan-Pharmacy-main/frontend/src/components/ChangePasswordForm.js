import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
const ChangePasswordForm = () => {
    const[changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);

    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        
        const input = {password, newPassword};
        const response = await fetch('/admin/changePassword/' + user.user._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            console.log(json.error);
        }
        if(response.ok){
            setError(null);
            setPassword('');
            setNewPassword('');
            alert("Password Changed Successfully");
            console.log("Password Changed Successfully");
        }
    }
    const toggleChangePassword = () => {
        setChangePassword(!changePassword);
    }

    return(
        <div className="user-details">
            <div><button onClick={toggleChangePassword}>Change Password?</button></div>
            {changePassword?
                <div>
                    <form className="change-password" onSubmit ={handleSubmit}>
                        <label>Enter your current password</label>
                        <input
                            type ="text"
                            onChange={(e) => setPassword(e.target.value)}
                            value = {password}
                        />
                        <label>Enter your new password</label>
                        <input
                            type ="text"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value = {newPassword}
                        />
                        <button>Submit new Password</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            :null}
        </div>
    )
}
export default ChangePasswordForm;