import { Modal } from "bootstrap";
import React, { Component , useEffect,useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom"; 
// import { resetUserStatus } from "../../store/action/userAction";
import { useDispatch, useSelector } from "react-redux";

function ModalPopUp(props) {

  const dispatch = useDispatch();
  const [redirect,setRedirect] = useState(null);
  const history = useHistory() 

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = "$('#modal-default').modal('show');";
    document.body.appendChild(s);
  }, []);

  function onCloseModalPopUp(e) {
    e.preventDefault();
    dispatch(props.dispatch);
    history.push(props.redirect)
  }

  return (
    <div className="modal fade" id="modal-default" onClick={onCloseModalPopUp}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Notifikasi</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onCloseModalPopUp}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p> {props.body} </p>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={onCloseModalPopUp}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPopUp;
