
import React, { useState } from "react";
import "./addItem.css";
import axios from "axios";
import { Formik, Form, Field, useFormik, FormikProps } from 'formik';
import { nations, genres } from "../../nationAndGenres/nationGenreList";
import { baseApi } from "../../../configs/configs";

export default function AddItem({url,isRender}) {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  function addItem({ values }) {
    const {author, piece, born, nation, genre, url, description, urltype } = values;
    console.log(author, piece, born, nation, genre, url, description, urltype )

    if(urltype === 'item'){
      axios({
        method: 'POST',
        url: `${baseApi}/azclassics/item`,
        data:{
          author: author, piece: piece, born: born, nation: nation, genre: genre, url: url, description: description
        }
      }).then((response) => {
          if(response.status === 200){
              isRender()
              alert('Successfully Added')
              toggleModal()
          }
      })
    }else if(urltype === 'blogs'){
      axios({
        method: 'POST',
        url: `${baseApi}/azclassics/blogs`,
        data:{
          author: author, piece: piece, born: born, nation: nation, genre: genre, url: url, description: description
        }
      }).then((response) => {
          if(response.status === 200){
              isRender()
              alert('Successfully Added')
              toggleModal()
          }
      })
    }

}
const {handleSubmit, handleChange, values} = useFormik({
    initialValues: {
      author: '',
      piece: '',
      born: '',
      nation: '',
      genre: '',
      url: '',
      description: '',
      urltype: url
    },
    onSubmit: values => {
      addItem({ values });
    }
  })
  return (
    <>
      <div onClick={toggleModal} className="btn-modal-add">
        <img src="https://static.thenounproject.com/png/2803202-200.png" className="addNewItemIcon"/>
        <span> Add New Item</span>
      </div>
      {modal && 
        <Formik  className="modalAdd">
          <div>
          <div onClick={toggleModal} className="overlayAdd"></div>
          
            <Form  className="modal-content-add">
                <div className="mb">
                  <Field 
                      type="text"
                      name="author"
                      id="author"
                      className="addItemform-control"
                      placeholder="Author"
                      value={values.author}
                      onChange={handleChange}
                  />
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="piece"
                      id="piece" 
                      className='addItemform-control' 
                      placeholder="Piece"
                      value={values.piece}
                      onChange={handleChange}
                  />
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="born"
                      id="born" 
                      className='addItemform-control' 
                      placeholder="Publish Date"
                      value={values.born}
                      onChange={handleChange}
                  />
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="nation"
                      id="nation" 
                      className='addItemform-control' 
                      placeholder="Nation"
                      value={values.nation}
                      onChange={handleChange}
                  />                  
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="genre"
                      id="genre" 
                      className='addItemform-control' 
                      placeholder="Genre"
                      value={values.genre}
                      onChange={handleChange}
                  />
                  
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="url"
                      id="url" 
                      className='addItemform-control' 
                      placeholder="Url"
                      value={values.url}
                      onChange={handleChange}
                  />
                </div>
                <div className="mb">
                  <Field
                      type="text"
                      name="description"
                      id="description" 
                      className='addItemform-control' 
                      placeholder="Description"
                      value={values.description}
                      onChange={handleChange}
                  />
                </div>
               
                <div className="buttonContainer">
                  <button type="button" className="modal-close-add" onClick={toggleModal}>Close</button>
                  <button type="button" className="modal-send-add" onClick={()=> handleSubmit()}>Send</button>
                </div>
            </Form>
            
          </div>
      </Formik>
      }
      {/*modal && (
        <div className="modalAdd">
          <div onClick={toggleModal} className="overlayAdd"></div>
          <div className="modal-content-add">
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
      )*/}
    </>
  );
}
