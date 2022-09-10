import React, { useState } from "react";
import { ReactDOM } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {


  const navigate = useNavigate();

  const [email, setEmail]=useState('');
  const [pass, setPass]=useState('');

  async function login() 
  {

  let data={email, pass }; 
  let result= await  fetch('http://34.204.253.168:3000/web_api/admin_login', {
   //  let result = await  fetch('http://192.168.1.95:3600/web_api/admin_login', {
  //let result= await  fetch('/admin_login', {
    
  method : 'POST', 
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    body:JSON.stringify(data)
 });
     let demo = await result.json();

                console.log(demo); 

     if(demo.status){
        //localStorage.setItem('active_status',demo.body[0].active_status );
        localStorage.setItem('address',demo.body.address );
        localStorage.setItem('token',demo.body.token );
        localStorage.setItem('gender',demo.body.gender );
        localStorage.setItem('date',demo.body.date );
        localStorage.setItem('email',demo.body.email );
        localStorage.setItem('mobile',demo.body.mobile );
        localStorage.setItem('name',demo.body.name );
       
        localStorage.setItem('user_type',demo.body.user_type );
        localStorage.setItem('_id',demo.body._id );
       
        localStorage.setItem("user-info", JSON.stringify(result));
      //  navigate('/home');
       
            navigate('/home');
            toast.success(demo.msg);
       
     
    }
    else{

        toast.error(demo.msg);
    }
    
  }

    return (
        <>

        <ToastContainer position="bottom-right" />
        <div className="page main-signin-wrapper ">
            <div className="main-signin-wrapper">
                <div className="row signpages text-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="row row-sm">
                                <div className="col-lg-6 col-xl-5 d-none d-lg-block text-center bg-primary details">
                                    <div className="mt-5 pt-4 p-2 pos-absolute">
                                        {/* <img src="assets/img/brand/logo-light.png" className="header-brand-img mb-4" alt="logo" /> */}
                                        <h3 className="text-white mb-4">Sportimo</h3>
                                        <div className="clearfix"></div>
                                        <img src="assets/img/user.svg" className="ht-100 mb-0" alt="user" />
                                        <h5 className="mt-4 text-white">Signin Your Account</h5>
                                        <span className="tx-white-6 tx-13 mb-5 mt-xl-0">Signup to create, discover and connect with the global community</span>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-7 col-xs-12 col-sm-12 login_form ">
                                    <div className="container-fluid">
                                        <div className="row row-sm">
                                            <div className="card-body mt-2 mb-2">
                                                <img src="assets/img/brand/logo.png"
                                                    className=" d-lg-none header-brand-img text-left float-left mb-4" alt="logo" />
                                                <div className="clearfix"></div>
                                            
                                                <form>
                                                    <h5 className="text-left mb-2">Signin to Your Account</h5>
                                                    <p className="mb-4 text-muted tx-13 ml-0 text-left">Signin to create, discover and connect with the global community</p>
                                                    <div className="form-group text-left">
                                                        <label>Email Address</label>
                                                        <input className="form-control" placeholder="Enter your email"  type="email" 
                                                         onChange={ (e)=>setEmail(e.target.value) } />
                                                    </div>
                                                    <div className="form-group text-left">
                                                        <label>Password</label>
                                                        <input className="form-control" placeholder="Enter your password" type="password"
                                                        onChange={ (e)=>setPass(e.target.value) } 
                                                        
                                                        />
                                                    </div>
                                                    <button type="button" className="btn ripple btn-main-primary btn-block ht50" onClick={login}>Sign In</button>
                                                </form>
                                                <div className="text-left mt-5 ml-0">
                                                    <div className="mb-1"><a href="#">Forgot password?</a></div>
                                                    {/* <div>Don't have an account? <a href="#">Register Here</a></div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
            

        </>
    );
}

export default Login;