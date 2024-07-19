import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link  } from "react-router-dom";
import { Button, Card, TextField, Modal } from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [enterOtpOpen, setEnterOtpOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [correctOTP, setCorrectOTP] = useState(false); // [true, false
    const [changePasswordUsername, setChangePasswordUsername] = useState("");
    const [userID, setUserID] = useState("");

    const handleGetOtp = async (username) => {
      const response = await fetch("/admin/generateOTP/" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if(!response.ok){
        console.log(data.error);
      }
      if (response.ok) {
        console.log(data);
        setCorrectOTP(data.otp);
        setUserID(data.user_id);
        setEnterOtpOpen(true);
      }
    };

    const change_password = async (id, password) => {
      const response = await fetch("/admin/changePassword/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });
      const data = await response.json();
      if(!response.ok){
        console.log(data.error);
      }
      if (response.ok) {
        alert("Password changed successfully!");
        setChangePasswordOpen(false);
        setEnterOtpOpen(false);
      }
    };




    const handleLogin = async (e) => {
        e.preventDefault();

        var ourUser = await login(username, password);
        if(ourUser){
            if(ourUser.user){
                navigate('/home')
            }
        }
        // if(ourUser){
        //     if(ourUser.user){
        //         if(ourUser.user.patient){
        //             navigate('/patientHome')
        //         }
        //     }
        // }
        

    }
    

    return(
        <div className="login-page">
            
            <div className="loginForm">

                    <form className="login-form" onSubmit ={handleLogin}>
                        <input
                            type ="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            value = {username}
                        />
                        <input
                            type ="text"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            value = {password}
                        />
                        <button disabled = {isLoading}>login</button>
                        {error && <div className="error">{error}</div>}
                        <p className="message"> Forgot Password? <a>Click here to reset</a></p>
                        <p className="message">Not registered? </p>
                        <Link to='/Register' state = {{role : 0}} ><p className="message"> <a >Create a patient account</a></p></Link>
                        <Link to='/Register' state = {{role : 1}} ><p className="message"> <a> Create a pharmacist account</a></p></Link>
                    </form>

                    <Modal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          className="flex flex-col bg-white gap-4 m-12 p-12 rounded-2xl"
          style={{ height: "fit-content" }}
        >
                    {!enterOtpOpen ? (
            <div className="flex flex-col gap-4">
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={(e) => setChangePasswordUsername(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  handleGetOtp(changePasswordUsername);
                }}
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <TextField
                id="outlined-basic"
                label="otp"
                variant="outlined"
                onChange={(e) => setOtp(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="new password"
                variant="outlined"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  correctOTP == otp
                    ? change_password(userID, newPassword)
                    : alert("Wrong OTP! Try again!");
                }}
              >
                Submit
              </Button>
            </div>
          )}
        </Card>
      </Modal>
                
            </div>
        </div>
    )
}

export default Login;