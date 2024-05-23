import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik } from 'formik';
import * as yup from 'yup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import VideoList from './VideoList'; 

export default function Homepage() {
  const firebaseConfig = {
    apiKey: "AIzaSyDduY2VoKZ1HY9fnDaYwkEUDPMM7P-3ylU",
    authDomain: "filrouge-98660.firebaseapp.com",
    projectId: "filrouge-98660",
    storageBucket: "filrouge-98660.appspot.com",
    messagingSenderId: "677999033333",
    appId: "1:677999033333:web:d8d07a32a2755e8a5e7ebc",
    measurementId: "G-PT8D7LLBPD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
  const db = getFirestore(app);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videoData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoData);
    });
    return () => unsubscribe();
  }, [db]);

  const schema = yup.object().shape({
    file: yup.mixed().required("Veuillez mettre une image"),
    title: yup.string().required("Veuillez donner un titre"),
  });

  const uploadFile = (file, title) => {
    const fileName = new Date().getTime() + "_" + file.name;
    const storageRef = ref(storage, "videos/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case 'storage/unauthorized':
            console.log("Unauthorized access");
            break;
          default:
            console.log("Upload error", error);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await addDoc(collection(db, "videos"), {
            title: title,
            url: downloadUrl,
            likes: [],
            dislikes: [],
            timestamp: new Date()
          });
        });
      }
    );
  };

  return (
    <Container style={{ backgroundColor: '#449973', width: '40%' }}>
      <Row className='justify-content-center mb-5 mt-5'>
        <Col md={6}>
          <div>
            <h1 className='text-center'>Add Video</h1>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                uploadFile(values.file, values.title);
              }}
              initialValues={{
                title: '',
                file: null,
                terms: false,
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="position-relative mb-3">
                    <Form.Label>Fichier</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      accept=""
                      name="file"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                      isInvalid={!!errors.file}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.file}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="8"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className='mb-5' style={{ backgroundColor: "#334C37", border: "none" }}>
                    Ajouter
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
      <VideoList videos={videos} db={db} />
    </Container>
  );
}

