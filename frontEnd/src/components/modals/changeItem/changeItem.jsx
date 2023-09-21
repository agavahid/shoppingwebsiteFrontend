
import React, { useEffect, useState } from "react";
import "./changeItem.css";
import axios from "axios";
import { baseApi } from "../../../configs/configs";

export default function ChangeItem({url, id, isRender}) {
  const [modal, setModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [pieceName, setPieceName] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  
  function getPageItems(){
    toggleModal()
    if(url === 'item'){
      axios({
        method: 'GET',
        url: `${baseApi}/azclassics/${url}/${id}`
      }).then(response => {
        isRender()
        setAuthorName(response.data[0].fullname);
        setPieceName(response.data[0].piece);
        setBornDate(response.data[0].born);
        setImgUrl(response.data[0].url);
      })
    }else if(url === 'blogs'){
      axios({
        method: 'GET',
        url: `${baseApi}/azclassics/${url}/${id}`
      }).then(response => {
        isRender()
        setAuthorName(response.data[0].fullname);
        setPieceName(response.data[0].piece);
        setBornDate(response.data[0].born);
        setImgUrl(response.data[0].url);
      })
    }
  }
  function getValue(e, type){
    if(type === 'author'){
      setAuthorName(e.target.value)
    }else if(type === 'born'){
        setBornDate(e.target.value)
    }else if(type === 'piece'){
        setPieceName(e.target.value)
    }else if(type === 'url'){
        setImgUrl(e.target.value)
    }
  }
  function sendPageItems(){
    if(url === 'item'){
      axios({
        method: 'PUT',
        url: `${baseApi}/azclassics/item`,
        data:{
            fullname: authorName, piece: pieceName, born: bornDate, url: imgUrl, id: id
        }
      }).then((response) => {
          if(response.status === 200){
              getPageItems()
              alert('Successfully Changed')
          }
      })
    }else if(url === 'blogs'){
      axios({
        method: 'PUT',
        url: `${baseApi}/azclassics/blogs`,
        data:{
            fullname: authorName, piece: pieceName, born: bornDate, url: imgUrl, id: id
        }
      }).then((response) => {
          if(response.status === 200){
              getPageItems()
              alert('Successfully Changed')
          }
      })
    }
  }
  
  const toggleModal = () => {
    setModal(!modal);
  };
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <div onClick={getPageItems} className="btn-modal">
          <img alt="change" src="https://static.thenounproject.com/png/469207-200.png" 
              className="changeIcon"
          /> Change
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div className="mb">
                <span>Author Name</span>  
                  <div className="labelDiv">
                    <label htmlFor="changeTo" className="col-form-label"></label>
                    <input value={authorName} onChange={(e)=>getValue(e, 'author')} type="text" name="changeTo" id="fullName" className="changeItemform-control"/>
                  </div>  
              </div>
              <div className="mb">
                <span>Born</span>
                <div className="labelDiv">
                  <label htmlFor="newName" className="col-form-label"></label>
                  <input value={bornDate} onChange={(e)=>getValue(e, 'born')} type="text" name="newName" id="born" className="changeItemform-control"/>
                </div>
              </div>
              <div className="mb">
                <span>Piece</span> 
                <div className="labelDiv">
                  <label htmlFor="changeTo" className="col-form-label"></label>
                  <input value={pieceName} onChange={(e)=>getValue(e, 'piece')} type="text" name="changeTo" id="newPiece" className="changeItemform-control"/>
                </div>   
              </div>
              <div className="mb">
                <span>Photo Url</span>    
                <div className="labelDiv">
                  <label htmlFor="changeTo" className="col-form-label"></label>
                  <input value={imgUrl} onChange={(e)=>getValue(e, 'url')} type="text" name="changeTo" id="url" className="changeItemform-control"/>
                </div>
              </div>
              <div className="buttonContainer">
                <button className="modal-close" onClick={toggleModal}>Close</button>
                <button className="modal-send" onClick={sendPageItems}>Send</button>
              </div>
            </div>
        </div>
      )}
    </>
  );
}


/*

    <div className="modal" data-backdrop="static" id="modal1">
                    
        <Modal.Dialog>
            

            <Modal.Header>
                <h4 className="modal-title">What you want to change?</h4>
                <button type="button" className="close" data-dismiss="modal">&times</button>
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="mb-1">
                            <span>Author Name</span>    
                            <label htmlFor="changeTo" className="col-form-label"></label>
                            <input placeholder="Write your chosen item" type="text" name="changeTo" id="fullName" className="form-control"/>
                        </div>
                        <div className="mb-2">
                            <span>Born</span>
                            <label htmlFor="newName" className="col-form-label"></label>
                            <input placeholder="New item name" type="text" name="newName" id="born" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <span>Piece</span>    
                            <label htmlFor="changeTo" className="col-form-label"></label>
                            <input placeholder="Write your chosen item" type="text" name="changeTo" id="newPiece" className="form-control"/>
                        </div>
                        <div className="mb-4">
                            <span>Photo Url</span>    
                            <label htmlFor="changeTo" className="col-form-label"></label>
                            <input placeholder="Write your chosen item" type="text" name="changeTo" id="url" className="form-control"/>
                        </div>
                    </Form>
                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary"  data-dismiss="modal" onclick="loadDoc()">Submit</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            
            
        </Modal.Dialog>
    </div>





*/