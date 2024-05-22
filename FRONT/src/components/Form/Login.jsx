import React, { useState } from "react";
import * as yup from "yup";
import { signin } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import * as formik from 'formik';

export default function Login() {
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup.string().required("Nom d'utilisateur requis"),
    password: yup.string().required("Le mot de passe requis"),
  });  


  async function submit(values) {
    try {
      const response = await signin(values);
      if (response.status === 200 || !response.message) {
        setFeedback(`Bienvenue ${response.user.username}`);
        navigate("/"); 
      } else {
        setFeedback(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container style={{backgroundColor:'#449973', width:'40%'}}> 
        <Row className='justify-content-center mb-5 mt-5'>
          <Col md={6}>
          <div>
            <h1 className='text-center'>CONNEXION</h1>
            <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        username: '',
        password:'',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors,setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="validationFormikUsername2">
              <Form.Label>Nom d'utilsateur</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Nom d'utilisateur"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Mot de Passe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mot de Passe"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          
          <Button type="submit" className='mb-5' style={{backgroundColor:"#334C37",border:"none"}}>Se connecter</Button>
        </Form>
      )}
    </Formik>
        </div>
          </Col>

        </Row>
      </Container>
        
    )
  ;
}
