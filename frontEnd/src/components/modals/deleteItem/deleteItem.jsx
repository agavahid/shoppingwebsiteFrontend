import React from "react";
import './deleteItem.css';
import { useState } from "react";
import axios from "axios";
import { baseApi } from "../../../configs/configs";


export default function DeleteItem({url,id, isRender}) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
    function deleteChoosed(e){
      axios({
        url: `${baseApi}/azclassics/${url}/${id}`,
        method: 'DELETE'
      })
      .then(response => {
        console.log(response)
        if(response.status === 200){
          isRender()
        }
      })
      toggleModal()
    }
    return (
      <>
        <div onClick={toggleModal} className="btn-modal-delete">
            <img alt="delete" src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" 
                className="deleteIcon"
            /> Delete
        </div>
  
        {modal && (
          <div className="modaldelete">
            <div onClick={toggleModal} className="overlaydelete"></div>
            <div className="modal-content-delete">
              <h2>You Sure For Delete?</h2>
              <button className="deleteItem" onClick={(e)=> deleteChoosed(e)}>Delete Item</button>
              <button className="close-modal-delete" onClick={toggleModal}>CLOSE</button>
            </div>
          </div>
        )}
      </>
    );
  }
  