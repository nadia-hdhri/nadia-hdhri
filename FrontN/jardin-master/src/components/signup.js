import { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import ErrorModel from "../models/error-model";
import SuccessModel from "../models/success-model";

const Signup = () => {
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/jardin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          email: email,
          password: password,
          adresse: adresse,
          tel: tel,
          date: date,
          description: description,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess(
        "Votre demande est enregistre. Vous recever un email de confirmation dans les bref delais"
      );
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <ErrorModel error={error} />
      <SuccessModel success={success} />
      <Form onSubmit={submit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer le nom"
              required
              name="nom"
              onChange={onchange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrer email"
              required
              name="email"
              onChange={onchange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              required
              name="password"
              onChange={onchange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Addresse</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            type="text"
            required
            name="adresse"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Tel</Form.Label>
          <Form.Control
            placeholder="22222222"
            type="text"
            required
            name="tel"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Date de creation</Form.Label>
          <br></br>
          <input
            type="date"
            id="start"
            name="date"
            value="2018-07-22"
            min="2018-01-01"
            max="2018-12-31"
            required
            onChange={onchange}
          ></input>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            required
            name="description"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
