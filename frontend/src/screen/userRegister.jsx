import React, { Component, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ModalPopUp } from "../components/util/ModalPopUp";

import { useHistory } from "react-router-dom";

import logoUpn from '../asset/LOGO_UPN_Tanpa_Kutip.png'
import logoMbkm from '../asset/kmb.png'

import { registerUser } from "../store/action/adminAction";

export const UserRegister = (props) => {
    const { loginFunction } = props;

    const history = useHistory();

    const dispatch = useDispatch();

    const [formInput, setFormInput] = useState({
        namaDikjar: "",
        emailDikjar: "",
        password: "",
        satuanKerja: "",
        role: ""
    });
    const [kaprodiInputForm, setKaprodiInput] = useState ({
        namaKaprodi:"",
        emailKaprodi:"",
        passwordKaprodi:"",
        role:"",
        prodiId:""
    })

    //   const [modalPopUp, setModalPopUp] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (formInput.role == 'dikjar'){
            console.log(formInput)
        }
        if (kaprodiInputForm.role =='kaprodi'){
            console.log(kaprodiInputForm,'.....')
        }
        // dispatch(registerUser(formInput));
        // loginFunction();
    };


    const userInput = (input) => {
        const { name, value } = input.target;
        setFormInput({ ...formInput, [name]: value });
    };
    const kaprodiInput =(input) => {
        const { name, value } = input.target;
        setKaprodiInput({ ...kaprodiInputForm, [name]: value });
    }
    
    const mahasiswaInput =(input) => {
        const { name, value } = input.target;
        setFormInput({ ...formInput, [name]: value });
    }

    const kaprodiRoleInput = (input)=> {
        setKaprodiInput({...kaprodiInputForm, role:input.target.value})
    }
    const roleInput = (input) => {
        const role = input;
        setFormInput({ ...formInput, role: input.target.value })
    };

    const prodiInput = (input) => {
        if(input.target.value == 'industri'){
            setKaprodiInput({...kaprodiInputForm, prodiId:1})
        }else if (input.target.value == 'elektro'){
            setKaprodiInput({...kaprodiInputForm, prodiId:2})
        }else if (input.target.value == 'mesin'){
            setKaprodiInput({...kaprodiInputForm, prodiId:3})
        }else if (input.target.value == 'kapal'){
            setKaprodiInput({...kaprodiInputForm, prodiId:4})
        }
    }

    //   if (registerStatus) {
    //     return (
    //       <ModalPopUp
    //         body="Pendaftaran berhasil"
    //         dispatch={resetRegister}
    //         redirect="/"
    //       />
    //     );
    //   }

    //   console.log(registerError)

    return (
        <div className="hold-transition login-page" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
            <div style={{ alignContent: 'space-evenly', justifyContent: 'space-between' }}>
                <img src={logoUpn} width="100px" style={{ marginBottom: '0rem', marginRight: '10px' }}></img>
                <img src={logoMbkm} width="150px" style={{ marginLeft: '10px' }}></img>
            </div>

            <div className="login-box">
                <div className="login-logo">
                    {/* <img src={LogoAves} width="300px"></img> */}
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg" style={{ color: "#0D69F2", width: 'auto', height: '2em', fontSize: '1.25rem' }} >Masukkan Data Diri</p>
                        {/* {registerError && <p style={{color:'red', fontSize:'8'}}>Harap lengkapi data diri Anda </p>} */}
                        <form onSubmit={onSubmit}>
                            <div className="form-group" style={{ color: '#0D69F2' }}>
                                <label>Daftar sebagai</label>
                                <select className="form-control" onChange={roleInput} style={{ border: '1px solid #0D69F2' }}>
                                    {/* <select className="form-control" style={{ border: '1px solid #0D69F2' }}> */}
                                    <option>Pilih peran</option>

                                    <option value="dikjar">Tenaga Kependidikan</option>
                                    <option value="kaprodi">Ketua Program Studi</option>
                                    <option value="dospem">Dosen </option>
                                    <option value="instansi">Pembimbing Instansi</option>
                                    <option value="mahasiswa">Mahasiswa</option>
                                </select>
                            </div>

                            {formInput.role == 'dikjar' && (
                                <div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nama Lengkap"
                                            onChange={userInput}
                                            name="namaDikjar"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={userInput}
                                            name="emailDikjar"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Kata Sandi"
                                            onChange={userInput}
                                            name="password"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Satuan Kerja"
                                            onChange={userInput}
                                            name="satuanKerja"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o"></span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                            }

                            {kaprodiInputForm.role === 'kaprodi' &&
                                <>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nama Lengkap"
                                            onChange={kaprodiInput}
                                            name="namaKaprodi"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={kaprodiInput}
                                            name="emailKaprodi"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Kata Sandi"
                                            onChange={kaprodiInput}
                                            name="passwordKaprodi"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <select className="form-control" onChange={prodiInput} style={{ border: '1px solid #0D69F2' }}>
                                            {/* <select className="form-control" style={{ border: '1px solid #0D69F2' }}> */}
                                            <option>Pilih Program Studi</option>

                                            <option value="industri">Teknik Industri</option>
                                            <option value="elektro">Teknik Elektro</option>
                                            <option value="mesin">Teknik Mesin</option>
                                            <option value="kapal">Teknik Perkapalan</option>

                                        </select>
                                    </div>
                                    <br></br>

                                </>

                            }

                            {formInput.role == 'mahasiswa' && (

                                <>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nama Lengkap"
                                            onChange={mahasiswaInput}
                                            name="namaMahasiswa"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Nomor Induk Mahasiswa"
                                            onChange={mahasiswaInput}
                                            name="nim"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <select className="form-control mb-3" onChange={roleInput} style={{ border: '1px solid #0D69F2' }}>
                                            {/* <select className="form-control" style={{ border: '1px solid #0D69F2' }}> */}
                                            <option>Pilih Program Studi</option>

                                            <option value="1">Teknik Industri</option>
                                            <option value="2">Teknik Elektro</option>
                                            <option value="3">Teknik Mesin</option>
                                            <option value="4">Teknik Perkapalan</option>

                                        </select>
                                    </div>
                                    <div>
                                        <select className="form-control mb-3" onChange={roleInput} style={{ border: '1px solid #0D69F2' }}>
                                            {/* <select className="form-control" style={{ border: '1px solid #0D69F2' }}> */}
                                            <option>Jenis Kelamin</option>

                                            <option value="lakiLaki">Laki - Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                             

                                        </select>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={mahasiswaInput}
                                            name="email"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Kata Sandi"
                                            onChange={mahasiswaInput}
                                            name="password"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Tahun Angkatan"
                                            onChange={mahasiswaInput}
                                            name="tahunAngkatan"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Semester"
                                            onChange={mahasiswaInput}
                                            name="semester"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Indeks Prestasi Kumulatif (IPK)"
                                            onChange={mahasiswaInput}
                                            name="ipk"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <label className='mt-2' style={{ color:'#0D69f2'}}>Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Tahun Angkatan"
                                            onChange={mahasiswaInput}
                                            name="tanggalLahir"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tempat Lahir"
                                            onChange={mahasiswaInput}
                                            name="tempatLahir"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Bidang Peminatan"
                                            onChange={mahasiswaInput}
                                            name="bidangPeminatan"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nama Orang Tua"
                                            onChange={mahasiswaInput}
                                            name="namaOrangTua"
                                        />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-user-circle-o" ></span>
                                            </div>
                                        </div>
                                    </div>
                                   

                                </>
                            )}
                            {/* <div className="input-group mb-3" style={{ border: '1px solid #0D69F2' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nama Lengkap"
                                    //   onChange={userInput}
                                    name="name"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fa fa-user-circle-o" ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nama Pengguna"
                                    //   onChange={userInput}
                                    name="userName"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Alamat Email"
                                    //   onChange={userInput}
                                    name="email"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Kata Sandi"
                                    //   onChange={userInput}
                                    name="password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Nomor HP"
                                    //   onChange={userInput}
                                    name="phone"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Alamat Lengkap"
                                    //   onChange={userInput}
                                    name="address"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-address-book"></span>
                                    </div>
                                </div>
                            </div> */}

                            {formInput.role.length !== 0 && (
                                <div className="row">
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
