import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Student_view/Components/Header";
import Navbar from "./Navbar";
import LoadContext from "../context/loadContext";

const Signup = () => {
    const [invalidcred, setinvalidcred] = useState(false);
    const [OTP,setOTP]=useState();
    const [OtpMsg,setOtpMsg]=useState("");
    const [emailVerify,setemailVerify]=useState(false);
    const [registrationMsg,setregistrationMsg]=useState("");
    const [user, setuser] = useState({ reg_no: 0, name: "", email: "", mob_no: 0, dob: "", dept: "", year: "", password: "" });
    const {urlHead}=useContext(LoadContext)
    const handle_change = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    const Add_user = async () => {
        if(!emailVerify)
        return;
        const url = `${urlHead}/user/RegisterStu`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user) // body data type must match "Content-Type" header
        });
        const data = await response.json();
        setregistrationMsg(data.msg);
    }

    const GenerateOTP=async()=>{
        const url = `${urlHead}/user/SendVerificationOTP`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:user.email}) // body data type must match "Content-Type" header
        });
        const data = await response.json();
        setOtpMsg(data.msg);
    }
    const VerifyOTP=async()=>{
        const url = `${urlHead}/user/VerifyOTP`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:user.email,otp:OTP}) // body data type must match "Content-Type" header
        });
        const data = await response.json();
        setOtpMsg(data.msg);
        setemailVerify(data.Verfied);
    }
    return (
        <>
            <Header/>
            <Navbar/>
            <form className="container" style={{ marginTop: "100px" }}>
                <div className="alert">
                    <p>{registrationMsg}</p>
                </div>
                <div className="container">
                    <h2>Register with Your Registration number</h2>
                    <h4>Select Your department Correctly as the account will be approved by your department admin.</h4>
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Registration No</label>
                        <input type="Number" className="form-control" id="exampleInputEmail1" name="reg_no" onChange={handle_change} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Enter Your Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="name" onChange={handle_change} />
                    </div>

                    <div>
                        <p>{OtpMsg}</p>
                        <label>Email Address</label>
                        <input type="email" name="email" onChange={handle_change}/>
                        <button className="btn-primary" type="button" onClick={GenerateOTP}>Generate OTP</button>
                        <input type="text" name="OTP" onChange={(e)=>setOTP(e.target.value)}/>
                        <button className="btn-primary" type="button" onClick={VerifyOTP}>Submit</button>
                    </div>
                    {/* <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handle_change} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div> */}

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                        <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="mob_no" onChange={handle_change} />
                        <div id="emailHelp" className="form-text">We'll never share your Mobile Number with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Date of birth</label>
                        <input type="Date" className="form-control" name="dob" id="exampleInputPassword1" onChange={handle_change} />
                    </div>

                    <div className="mb-3">
                        <select name="dept" className='Dropdown' id="dept-Dropdown" onChange={handle_change}>
                            <option value="" className='options'>Select Department</option>
                            <option value="Information Technology" className='options'>Information Technology</option>
                            <option value="Mechanical Engineering" className='options'>Mechanical Engineering</option>
                            <option value="Electrical Engineering" className='options'>Electrical Engineering</option>
                            <option value="Civil Engineering" className='options'>Civil Engineering</option>
                            <option value="Electronics and Telecommunication" className='options'>Electronics and Telecommunication</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <select name="year" className='Dropdown' id="dept-Dropdown" onChange={handle_change}>
                            <option value="" className='options'>Year of Study</option>
                            <option value="First Year" className='options'>First Year</option>
                            <option value="Second Year" className='options'>Second Year</option>
                            <option value="Third Year" className='options'>Third Year</option>
                            <option value="Final Year" className='options'>Final Year</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={handle_change} />
                    </div>

                    <button className="btn btn-primary" type="button" onClick={Add_user}>Register</button>
                </div>
            </form>
        </>
    )
}
export default Signup;