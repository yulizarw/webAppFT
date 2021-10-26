import React, { Component, useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, resetRegister } from "../store/action/adminAction";
import { useHistory } from "react-router-dom";

export function Login(props) {
//   const { loginFunction } = props;
//   const user = useSelector((state) => state.adminReducers.userLogin);
//   const history = useHistory();

//   const dispatch = useDispatch();
//   const [formInput, setFormInput] = useState({
//     userName: "",
//     password: "",
//     role: "",
//   });
//   useEffect (()=> {
//     dispatch(resetRegister ())
//   },[])

//   const [modalPopUp, setModalPopUp] = useState(null);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(fetchLogin(formInput));
//     loginFunction();
//   };

//   const passwordInput = (input) => {
//     const password = formInput.password;
//     setFormInput({ ...formInput, password: input.target.value });
//   };

//   const userNameInput = (input) => {
//     const userName = formInput.userName;
//     setFormInput({ ...formInput, userName: input.target.value });
//   };
//   const roleInput = (input) => {
//     const role = input;
//     setFormInput({ ...formInput, role: input.target.value });
//   };

//   const registerUser = () => {
//     history.push("/register")
//   }

//   if (localStorage.getItem("access_token")) {
//     history.push("/home");
//   }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          {/* <img src={LogoAves} width="300px"></img> */}
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg" style={{color:"#0D69F2", width:'auto', height:'2em', fontSize:'1.25rem'}}>Login</p>

            {/* <form onSubmit={onSubmit}> */}
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Pengguna"
                  style={{border:'1px solid #0D69F2'}}
                //   onChange={userNameInput}
                />
                <div className="input-group-append" style={{border:'1px solid #0D69F2'}}>
                  <div className="input-group-text">
                    <span className="fas fa-envelope" style={{color:'#0d69f2'}}></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Kata Sandi"
                //   onChange={passwordInput}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label style={{width:'auto', marginRight:'1em'}}>Masuk sebagai</label>
                {/* <select className="form-control" onChange={roleInput}> */}
                <select>
                  <option>Pilih peran</option>
                  <option value="admin">Admin</option>
                  <option value="dikjar">Tenaga Kependidikan</option>
                  <option value="kaprodi">Ketua Program Studi</option>
                  <option value="dospem">Dosen </option>
                  <option value="instansi">Pembimbing Instansi</option>
                  <option value="Mahasiswa">Mahasiswa</option>
                </select>
              </div>
              <div className="row">
                <div className="col-8">
                  
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-light btn-block" style={{boxSizing:'border-box', boxShadow:'0px 4px 4px rgba(87, 16, 237, 0.24)', borderRadius:'100px', border:'1px solid #0D69F2'}}>
                    Masuk
                  </button>
                </div>
              </div>
            </form>

            <p>Belum punya akun?</p>
              <button className="btn btn-default" >Daftar</button>
           
          </div>
        </div>
      </div>
    </div>
  );
}
