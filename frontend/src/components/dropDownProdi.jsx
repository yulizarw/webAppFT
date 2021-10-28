import React, { Component, useEffect, useState } from "react";

export const ProdiDropDown = () => {
    return (
        <div>
            <select className="form-control mb-3" onChange={prodiInput} style={{ border: '1px solid #0D69F2' }}>
                {/* <select className="form-control" style={{ border: '1px solid #0D69F2' }}> */}
                <option>Pilih Program Studi</option>

                <option value="1">Teknik Industri</option>
                <option value="2">Teknik Elektro</option>
                <option value="3">Teknik Mesin</option>
                <option value="4">Teknik Perkapalan</option>

            </select>
        </div>
    )
}