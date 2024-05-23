import React, { useState } from "react";
import * as yup from "yup";
import { signup } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import * as formik from 'formik';

export default function Register() {
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();
  const { Formik } = formik;

  const schema = yup.object().shape({
    username: yup.string().required("Nom d'utilisateur requis"),
    password: yup.string().required("Le mot de passe requis"),
    confirmpassword:yup.string().required("La confirmation du mot de passe requis"),
    terms: yup.bool().required().oneOf([true], 'Vous devez accepter les termes et les conditions du site'),
  });


  async function submit(values) {
    try {
      const response = await signup(values);
      setFeedback(response.message);
      if (response.status === 200) {
        navigate("/login");
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
        <h1 className='text-center'>INSCRIPTION</h1>
        <Formik
  validationSchema={schema}
  onSubmit={submit}
  initialValues={{
    username: '',
    password:'',
    confirmpassword:'',
    
    file: null,
    terms: false,
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
            type="password"
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
      <Form.Group
          as={Col}
          md="8"
          controlId="validationFormik105"
          className="position-relative"
        >
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer le mot de passe"
            name="confirmpassword"
            value={values.confirmpassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmpassword}
          />

          <Form.Control.Feedback type="invalid" tooltip>
            {errors.confirmpassword}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Label>Genre</Form.Label>
        {['radio'].map((type) => (
    <div key={`default-${type}`} className="mb-3">
      <Form.Check 
        type={type}
        id={`default-${type}`}
        label="Femme"
        name="group1"
      />
       <Form.Check 
        type={type}
        id={`default-${type}`}
        label="Homme"
        name="group1"
      />
      </div> 
  ))}
      
      
      <Form.Group className="position-relative mb-3">
        <Form.Check
          required
          name="terms"
          label="Accepter les termes et les conditions"
          onChange={handleChange}
          isInvalid={!!errors.terms}
          feedback={errors.terms}
          feedbackType="invalid"
          id="validationFormik106"
          feedbackTooltip
        />
      </Form.Group>
      <Button type="submit" className='mb-5' style={{backgroundColor:"#334C37",border:"none"}}>S'inscrire</Button>
    </Form>
  )}
</Formik>
    </div>
      </Col>

    </Row>
  </Container>
  );
}
