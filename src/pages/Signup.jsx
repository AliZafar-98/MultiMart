



import React from "react";
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config'
import { ref,  getDownloadURL } from 'firebase/storage';
import {uploadBytes} from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'


import { db } from '../firebase.config'
import { storage } from '../firebase.config'


import Helmet from '../components/Helmet/Helmet';
import '../styles/login.css'




const Signup = () => {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [loding, setLoding] = useState(false)

    const navigate = useNavigate()


    const signup = async (e) => {
        e.preventDefault()
        setLoding(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytes(storageRef, file)

            uploadTask.on(
                (error) => {
                    toast.error(error.massage);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{

                        // updte user profile
                        await updateProfile(user, {
                            displayName: username,
                            photoURL: downloadURL,
                        });

                    // store user data in firestore database 
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    });

                });
            }
            );

            setLoding(false)
            toast.success('Account created')
            navigate('/login')
        } catch (error) {
            setLoding(false)
            toast.error('something went wrong')
        }
    }


    return (

        <Helmet title='Signup'>
            <section>
                <Container>
                    <Row>
                        {
                            loding ? (
                                <Col lg='12' className="text-center"><h5 className="fw-bold">Loding.....</h5></Col>
                            ) : (
                                <Col lg='5' className='m-auto text-center'>
                                    <h3 className="fw-bold mb-4">Signup</h3>

                                    <Form className="auth__form" onSubmit={signup}>
                                        <FormGroup className="form__group">
                                            <input type="text" placeholder="Username"
                                                value={username} onChange={e => setUsername(e.target.value)}
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="email" placeholder="Enter your email"
                                                value={email} onChange={(e) => setEmail(e.target.value)}
                                            />

                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <input type="password" placeholder="Enter your password"
                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FormGroup>



                                        <FormGroup className="form__group">
                                            <input type="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </FormGroup>

                                        <button type="submit" className="buy__btn auth__btn">Create an account</button>
                                        <p>Already have an accunt? <Link to='/login'>Login</Link></p>
                                    </Form>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
};
export default Signup;