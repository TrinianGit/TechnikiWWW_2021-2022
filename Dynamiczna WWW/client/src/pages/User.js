import '../css/App.css';
import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import sha256 from 'crypto-js/sha256';

function User() {

    let button;
    let { name } = useParams();
    let currentmessage = 0;
    let messages = [];
    let modal;
    let messagesall = "";
    let modal2 = ""
    let i = 0;
    console.log(name)

    const validationSchema = Yup.object().shape({
        Name: Yup.string(),
        Email: Yup.string().email(),
        Number: Yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/),
        Address: Yup.string(),
        Webpage: Yup.string(),
        Github: Yup.string(),
        Twitter: Yup.string(),
        Instagram: Yup.string(),
        Facebook: Yup.string()
      });

      const onSubmit = (data) => {
        console.log(data)
        axios.post('http://localhost:3001/user',null, {
            params: {
                U: name,
                N: data.Name,
                E: data.Email,
                NB: data.Number,
                A: data.Address,
                W: data.Webpage,
                G: data.Github,
                T: data.Twitter,
                I: '@' + data.Instagram.replaceAll('@', ''),
                F: data.Facebook,
                FLAG: "update"
            }
        })
        .then(function async(response) {
            console.log(response);
            if (response.data == "OK"){
                window.location.reload();
            }
        })
        .catch(function (error) {
          console.log(error);
        });
      };


      const initialValues = {
        Name: "",
        Email: "",
        Number: "",
        Address: "",
        Webpage: "",
        Github: "",
        Twitter: "",
        Instagram: "",
        Facebook: ""
      };

      const initialValuesMess = {
        Mess: ""
      };

      const validationSchemaMess = Yup.object().shape({
        Mess: Yup.string().max(60),
      });

      const onSubmitMess = async (data) => {
        if (name == sessionStorage.getItem("Username")){
            await axios.post('http://localhost:3001/messages',null, {
                params: {
                    F: name,
                    T: messages[currentmessage + i].From_User,
                    M: data.Mess
                }
            }).then(function async(response) {
                console.log(response);
                if (response.data == "OK"){
                    window.location.reload();
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else{
            await axios.post('http://localhost:3001/messages',null, {
                params: {
                    F: sessionStorage.getItem("Username"),
                    T: name,
                    M: data.Mess
                }
            }).then(function async(response) {
                console.log(response);
                if (response.data == "OK"){
                    window.location.reload();
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }

    if (null === sessionStorage.getItem("Username")){
        button = <button type="button" className="btn btn-primary ms-1" disabled>Wiadomość</button>

    }
    else if (name === sessionStorage.getItem("Username")){
        button = <button type="button" data-bs-target="#EditData" data-bs-toggle="modal" className="btn btn-primary ms-1">Edytuj dane</button>
        modal = <div className="modal fade" id="EditData" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body text-center">
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="needs-validation register" noValidate>
                  <h1 className="h3 mb-3 fw-normal">Zmień dane</h1>
                  <div className="form-floating">
                      <Field id="Name" name="Name" className="form-control" placeholder="Imię i nazwisko"/>
                      <label htmlFor="floatingInput">Imię i nazwisko</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Email" name="Email" className="form-control" placeholder="Adres e-mail"/>
                      <label htmlFor="floatingInput">Adres e-mail</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Number" name="Number" className="form-control" placeholder="Numer telefonu"/>
                      <label htmlFor="floatingInput">Numer telefonu</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Address" name="Address" className="form-control" placeholder="Adres"/>
                      <label htmlFor="floatingInput">Adres</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Webpage" name="Webpage" className="form-control" placeholder="Strona internetowa"/>
                      <label htmlFor="floatingInput">Strona internetowa</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Github" name="Github" className="form-control" placeholder="Github" />
                      <label htmlFor="floatingInput">Github</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Twitter" name="Twitter" className="form-control" placeholder="Twitter"/>
                      <label htmlFor="floatingInput">Twitter</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Instagram" name="Instagram" className="form-control" placeholder="Instagram" />
                      <label htmlFor="floatingInput">Instagram</label>
                  </div>
                  <div className="form-floating">
                      <Field id="Facebook" name="Facebook" className="form-control" placeholder="Facebook" />
                      <label htmlFor="floatingInput">Facebook</label>
                  </div>
                  <div className="checkbox mb-3">
                  </div>
                  <button className="w-100 btn btn-lg btn-primary Submit" type="submit">Zatwierdź zmiany</button>
                </Form>
              </Formik>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
            </div>
          </div>
        </div>
      </div>

      messagesall = <div className="card mb-4" style={{backgroundImage: 'radial-gradient(circle, rgba(232, 73, 29, 0.096) 0%, rgba(232, 73, 29, 0.37) 35%, rgba(232, 73, 29, 0.562) 100%)'}}>
                        <div className="card-body" style={{backgroundColor: 'transparent'}}>
                        <div className="row">
                            <p className="mb-0 fw-bold text-center">Ostatnie Wiadomości</p>
                        </div>
                        <hr />
                        <div className="row M1">
                            <div className="col-sm-2">
                            <p className="mb-0 fw-bold Nick">Nick</p>
                            </div>
                            <div className="col-sm-8">
                            <p className="text-muted mb-0 Message">Treść</p>
                            </div>
                            <div className="col-sm-2">
                            <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary" onClick={() => {i = 0}}>Odpowiedz</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row M2">
                            <div className="col-sm-2">
                            <p className="mb-0 fw-bold Nick">Nick</p>
                            </div>
                            <div className="col-sm-8">
                            <p className="text-muted mb-0 Message">Treść</p>
                            </div>
                            <div className="col-sm-2">
                            <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary" onClick={() => {i = 1}}>Odpowiedz</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row M3">
                            <div className="col-sm-2">
                            <p className="mb-0 fw-bold Nick">Nick</p>
                            </div>
                            <div className="col-sm-8">
                            <p className="text-muted mb-0 Message">Treść</p>
                            </div>
                            <div className="col-sm-2">
                            <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary" onClick={() => {i = 2}}>Odpowiedz</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row M4">
                            <div className="col-sm-2">
                            <p className="mb-0 fw-bold Nick">Nick</p>
                            </div>
                            <div className="col-sm-8">
                            <p className="text-muted mb-0 Message">Treść</p>
                            </div>
                            <div className="col-sm-2">
                            <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary" onClick={() => {i = 3}}>Odpowiedz</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row M5">
                            <div className="col-sm-2">
                            <p className="mb-0 fw-bold Nick">Nick</p>
                            </div>
                            <div className="col-sm-8">
                            <p className="text-muted mb-0 Message">Treść</p>
                            </div>
                            <div className="col-sm-2">
                            <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary" onClick={() => {i = 4}}>Odpowiedz</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center">
                            <button className="btn btn-primary col-4 col-xl-3 More" type="button" onClick={() => {currentmessage += 5; showMessage()}}>Załaduj póżniejsze</button>
                            <button className="btn btn-primary col-4 col-xl-3 Less" type="button" onClick={() => {currentmessage -= 5; showMessage()}}>Załaduj wcześniejsze</button>
                        </div>
                        </div>
                    </div>
        modal2 = <div className="modal fade" id="MessSend" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" />
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body text-center">
                <Formik initialValues={initialValuesMess} onSubmit={onSubmitMess} validationSchema={validationSchemaMess}>
                    <Form className="needs-validation register" noValidate>
                    <h1 className="h3 mb-3 fw-normal">Wyślij wiadomość</h1>
                    <div className="form-floating">
                        <Field id="Mess" name="Mess" as="textarea" className="form-control" placeholder="Wiadomość (max. 60 znaków)"/>
                        <label htmlFor="floatingInput">Wiadomość</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary Submit" type="submit">Wyślij</button>
                    </Form>
                </Formik>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                </div>
            </div>
            </div>
        </div>
    }
    else{
        button = <button type="button" data-bs-target="#MessSend" data-bs-toggle="modal" className="btn btn-primary ms-1">Wiadomość</button>
        modal = <div className="modal fade" id="MessSend" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body text-center">
              <Formik initialValues={initialValuesMess} onSubmit={onSubmitMess} validationSchema={validationSchemaMess}>
                <Form className="needs-validation register" noValidate>
                  <h1 className="h3 mb-3 fw-normal">Wyślij wiadomość</h1>
                  <div className="form-floating">
                      <Field id="Mess" name="Mess" as="textarea" className="form-control" placeholder="Wiadomość (max. 60 znaków)"/>
                      <label htmlFor="floatingInput">Wiadomość</label>
                  </div>
                  <button className="w-100 btn btn-lg btn-primary Submit" type="submit">Wyślij</button>
                </Form>
              </Formik>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
            </div>
          </div>
        </div>
      </div>
    }

    function showMessage(){
        if (currentmessage > 0){
            document.querySelector('.Less').style.display = 'block'
        }
        else{
            document.querySelector('.Less').style.display = 'none'
        }
        if (messages.length == 0){
            document.querySelector('.M1').style.visibility = 'hidden'
            document.querySelector('.M2').style.visibility = 'hidden'
            document.querySelector('.M3').style.visibility = 'hidden'
            document.querySelector('.M4').style.visibility = 'hidden'
            document.querySelector('.M5').style.visibility = 'hidden'
            document.querySelector('.More').style.display = 'none'
        }
        else if (currentmessage + 1 == messages.length){
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').style.visibility = 'hidden'
            document.querySelector('.M3').style.visibility = 'hidden'
            document.querySelector('.M4').style.visibility = 'hidden'
            document.querySelector('.M5').style.visibility = 'hidden'
            document.querySelector('.More').style.display = 'none'
        }
        else if (currentmessage + 2 ==messages.length){
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').querySelector(".Nick").innerHTML = messages[currentmessage + 1].From_User
            document.querySelector('.M2').querySelector(".Message").innerHTML = messages[currentmessage + 1].Message
            document.querySelector('.M3').style.visibility = 'hidden'
            document.querySelector('.M4').style.visibility = 'hidden'
            document.querySelector('.M5').style.visibility = 'hidden'
            document.querySelector('.More').style.display = 'none'
        }
        else if (currentmessage + 3 == messages.length){
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').querySelector(".Nick").innerHTML = messages[currentmessage + 1].From_User
            document.querySelector('.M2').querySelector(".Message").innerHTML = messages[currentmessage + 1].Message
            document.querySelector('.M3').querySelector(".Nick").innerHTML = messages[currentmessage + 2].From_User
            document.querySelector('.M3').querySelector(".Message").innerHTML = messages[currentmessage + 2].Message
            document.querySelector('.M4').style.visibility = 'hidden'
            document.querySelector('.M5').style.visibility = 'hidden'
            document.querySelector('.More').style.display = 'none'
        }
        else if (currentmessage + 4 ==messages.length){
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').querySelector(".Nick").innerHTML = messages[currentmessage + 1].From_User
            document.querySelector('.M2').querySelector(".Message").innerHTML = messages[currentmessage + 1].Message
            document.querySelector('.M3').querySelector(".Nick").innerHTML = messages[currentmessage + 2].From_User
            document.querySelector('.M3').querySelector(".Message").innerHTML = messages[currentmessage + 2].Message
            document.querySelector('.M4').querySelector(".Nick").innerHTML = messages[currentmessage + 3].From_User
            document.querySelector('.M4').querySelector(".Message").innerHTML = messages[currentmessage + 3].Message
            document.querySelector('.M5').style.visibility = 'hidden'
            document.querySelector('.More').style.display = 'none'
        }
        else if (currentmessage + 5 == messages.length){
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').querySelector(".Nick").innerHTML = messages[currentmessage + 1].From_User
            document.querySelector('.M2').querySelector(".Message").innerHTML = messages[currentmessage + 1].Message
            document.querySelector('.M3').querySelector(".Nick").innerHTML = messages[currentmessage + 2].From_User
            document.querySelector('.M3').querySelector(".Message").innerHTML = messages[currentmessage + 2].Message
            document.querySelector('.M4').querySelector(".Nick").innerHTML = messages[currentmessage + 3].From_User
            document.querySelector('.M4').querySelector(".Message").innerHTML = messages[currentmessage + 3].Message
            document.querySelector('.M5').querySelector(".Nick").innerHTML = messages[currentmessage + 4].From_User
            document.querySelector('.M5').querySelector(".Message").innerHTML = messages[currentmessage + 4].Message
            document.querySelector('.More').style.display = 'none'
        }
        else{
            document.querySelector('.M1').querySelector(".Nick").innerHTML = messages[currentmessage].From_User
            document.querySelector('.M1').querySelector(".Message").innerHTML = messages[currentmessage].Message
            document.querySelector('.M2').querySelector(".Nick").innerHTML = messages[currentmessage + 1].From_User
            document.querySelector('.M2').querySelector(".Message").innerHTML = messages[currentmessage + 1].Message
            document.querySelector('.M3').querySelector(".Nick").innerHTML = messages[currentmessage + 2].From_User
            document.querySelector('.M3').querySelector(".Message").innerHTML = messages[currentmessage + 2].Message
            document.querySelector('.M4').querySelector(".Nick").innerHTML = messages[currentmessage + 3].From_User
            document.querySelector('.M4').querySelector(".Message").innerHTML = messages[currentmessage + 3].Message
            document.querySelector('.M5').querySelector(".Nick").innerHTML = messages[currentmessage + 4].From_User
            document.querySelector('.M5').querySelector(".Message").innerHTML = messages[currentmessage + 4].Message
            document.querySelector('.More').style.display = 'block'
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3001/user", {
            params: {
                L: name,
            }
        }).then((response) => {
            if (response.data == "Not found"){
            window.location.href = "/";
            }
            else{
                document.querySelector('.Name').innerHTML = response.data.Name
                document.querySelector('.Where').innerHTML = response.data.Adress
                document.querySelector('.Facebook').innerHTML = response.data.Facebook
                document.querySelector('.WebPage').innerHTML = response.data.Webpage
                document.querySelector('.Github').innerHTML = response.data.Github
                document.querySelector('.Twitter').innerHTML = response.data.Twitter
                document.querySelector('.Instagram').innerHTML = response.data.Instagram
                document.querySelector('.FullName').innerHTML = response.data.Name
                document.querySelector('.Mail').innerHTML = response.data.Email
                document.querySelector('.Number').innerHTML = response.data.Number
                document.querySelector('.Adress').innerHTML = response.data.Adress
            }
            console.log(response.data)
        }).catch((error) => {
            console.error(error);
        })

        axios.get("http://localhost:3001/messages", {
            params: {
                user: name,
            }
        }).then((response) => {
            console.log(response.data)
            messages = response.data
            showMessage()
        }).catch((error) => {
            console.error(error);
        })


    }, [])


    

  return (
    <div style={{backgroundImage: 'radial-gradient(circle, rgba(53, 66, 74, 0.788) 0%, rgba(53, 66, 74, 0.918) 35%, rgb(25, 27, 29) 100%)', height: '100vh'}}>
        {modal}
        <div className="container py-5">
            <div className="row">
                <div className="col">
                <nav className="ps-3 mb-4 d-flex justify-content-center justify-content-lg-start">
                    <button className="btn btn-danger" onClick={() => {window.location.href = "/"}}>Powrót</button>
                </nav>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                <div className="card mb-4" style={{backgroundImage: 'radial-gradient(circle, rgba(232, 73, 29, 0.096) 0%, rgba(232, 73, 29, 0.37) 35%, rgba(232, 73, 29, 0.562) 100%)'}}>
                    <div className="card-body text-center" style={{backgroundColor: 'transparent'}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{width: '150px'}} />
                    <h5 className="my-3 Name"></h5>
                    <p className="text-muted mb-1 Who">{name}</p>
                    <p className="text-muted mb-4 Where"></p>
                    <div className="d-flex justify-content-center mb-2">
                        {button}
                    </div>
                    </div>
                </div>
                <div className="card mb-4 mb-lg-0" style={{backgroundImage: 'radial-gradient(circle, rgba(232, 73, 29, 0.096) 0%, rgba(232, 73, 29, 0.37) 35%, rgba(232, 73, 29, 0.562) 100%)'}}>
                    <div className="card-body p-0" style={{backgroundColor: 'transparent'}}>
                    <ul className="list-group list-group-flush rounded-3">
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{backgroundColor: 'transparent'}}>
                        <i className="text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                            </svg>
                        </i>
                        <p className="mb-0 WebPage"></p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{backgroundColor: 'transparent'}}>
                        <i className="bi bi-github" style={{color: '#333333'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </i>
                        <p className="mb-0 Github"></p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{backgroundColor: 'transparent'}}>
                        <i className="bi bi-twitter" style={{color: '#55acee'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                        </i>
                        <p className="mb-0 Twitter"></p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{backgroundColor: 'transparent'}}>
                        <i className="bi bi-instagram" style={{color: '#ac2bac'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                        </i>
                        <p className="mb-0 Instagram"></p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" style={{backgroundColor: 'transparent'}}>
                        <i className="bi bi-facebook" style={{color: '#3b5998'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                        </i>
                        <p className="mb-0 Facebook"></p>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
                <div className="col-lg-8">
                <div className="card mb-4 align-self-baseline" style={{backgroundImage: 'radial-gradient(circle, rgba(232, 73, 29, 0.096) 0%, rgba(232, 73, 29, 0.37) 35%, rgba(232, 73, 29, 0.562) 100%)'}}>
                    <div className="card-body" style={{backgroundColor: 'transparent'}}>
                    <div className="row">
                        <div className="col-sm-3">
                        <p className="mb-0">Imię i Nazwisko</p>
                        </div>
                        <div className="col-sm-9">
                        <p className="text-muted mb-0 FullName"></p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                        <p className="mb-0">Adres mailowy</p>
                        </div>
                        <div className="col-sm-9">
                        <p className="text-muted mb-0 Mail"></p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                        <p className="mb-0">Numer Telefonu</p>
                        </div>
                        <div className="col-sm-9">
                        <p className="text-muted mb-0 Number"></p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                        <p className="mb-0">Adres</p>
                        </div>
                        <div className="col-sm-9">
                        <p className="text-muted mb-0 Adress"></p>
                        </div>
                    </div>
                    </div>
                </div>
                {messagesall}
                </div>
            </div>
        </div>
        {modal2}
    </div>

  );
}

export default User;