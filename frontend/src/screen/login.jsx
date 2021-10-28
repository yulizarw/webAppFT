import React, { Component, useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, resetRegister } from "../store/action/adminAction";
import { useHistory } from "react-router-dom";

import logoUpn from '../asset/LOGO_UPN_Tanpa_Kutip.png'
import logoMbkm from '../asset/kmb.png'
export function Login(props) {
    const { loginFunction } = props;
  //   const user = useSelector((state) => state.adminReducers.userLogin);
    const history = useHistory();

    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
      email: "",
      password: "",
      role: "",
    });
  //   useEffect (()=> {
  //     dispatch(resetRegister ())
  //   },[])

  //   const [modalPopUp, setModalPopUp] = useState(null);

    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchLogin(formInput));
      loginFunction();
    };

    const passwordInput = (input) => {
      const password = formInput.password;
      setFormInput({ ...formInput, password: input.target.value });
    };

    const emailInput = (input) => {
      const email = formInput.email;
      setFormInput({ ...formInput, email: input.target.value });
    };
    const roleInput = (input) => {
      const role = input;
      setFormInput({ ...formInput, role: input.target.value });
    };

    const registerUser = () => {
      history.push("/register")
    }

    if (localStorage.getItem("access_token")) {
      history.push("/home");
    }

    console.log()
  return (
    <>
      <div className="hold-transition login-page" style={{backgroundImage:'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)',backgroundRepeat:'no-repeat', backgroundAttachment:'fixed', backgroundSize:'cover'}}>
        <div style={{alignContent:'space-evenly', justifyContent:'space-between'}}>
          <img src={logoUpn} width="100px" style={{ marginBottom: '5rem', marginTop: '-10rem', marginRight:'10px'}}></img>
          <img src={logoMbkm} width="150px" style={{ marginBottom: '0rem', marginTop: '-15rem', marginLeft:'10px' }}></img>
        </div>
        <p style={{ width: '500px', marginRight: '1.40rem', fontFamily: 'inter', textAlign: 'center', fontSize: '24px', lineHeight: '29px', color: '#0D69F2' }}>SISTEM PELAYANAN AKADEMIK FAKULTAS TEKNIK</p>
        <div className="login-box"  >
          <div className="card">
            <div className="card-body login-card-body" style={{border: '3px solid rgba(51, 0, 255, 0.92)',marginLeft: 'auto', marginRight: 'auto',boxSizing: 'border-box',backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter:'blur(10px) saturate(100%) contrast(45%) brightness(130%)'}}>
              <p className="login-box-msg" style={{ color: "#0D69F2", width: 'auto', height: '2em', fontSize: '1.25rem' }}>Login</p>

              <form onSubmit={onSubmit}>
              {/* <form> */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Pengguna"
                    style={{ border: '1px solid #0D69F2' }}
                    onChange={emailInput}
                  />
                  <div className="input-group-append" style={{ border: '1px solid #0D69F2' }}>
                    <div className="input-group-text">
                      <span className="fas fa-envelope" style={{ color: '#0d69f2' }}></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Kata Sandi"
                    onChange={passwordInput}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" style={{ color: '#0d69f2' }}></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ width: 'auto', marginRight: '1em', color: "#0D69F2" }}>Masuk sebagai</label>
                  <select className="form-control" onChange={roleInput}>
                    <option>Pilih peran</option>
                    <option value="admin">Admin</option>
                    <option value="dikjar">Tenaga Kependidikan</option>
                    <option value="kaprodi">Ketua Program Studi</option>
                    <option value="dospem">Dosen </option>
                    <option value="instansi">Pembimbing Instansi</option>
                    <option value="mahasiswa">Mahasiswa</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-8">

                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-light btn-block" style={{ color:'#0D69f2',boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(87, 16, 237, 0.24)', borderRadius: '10px', border: '1px solid #0D69F2' }}>
                      Masuk
                    </button>
                  </div>
                </div>
              </form>

              <p style={{color: "#0D69F2"}}>Belum punya akun?</p>
              <button className="btn btn-default" onClick={registerUser} style={{color:'#0D69f2'}} >Daftar</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
