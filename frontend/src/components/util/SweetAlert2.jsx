import React, { Component , useEffect,useState} from "react";
export default function SweetAlert2(props) {

    useEffect(()=>{
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.innerHTML = `
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          }).fire({        
              icon: '${props.icon}',
              title: '${props.body}',
              width: 600,
              height: 300
      });
        `;
        document.body.appendChild(s);
    },[])


    return (
        <div>

        </div>
    )
}
