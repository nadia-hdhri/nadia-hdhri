import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";

import { Authcontext } from "../../context/auth-context";
import{ErrorModel}  from "../../models/error-model";
import {SuccessModel} from "../../models/success-model";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)

    try {
      let response = await fetch("http://localhost:5000/api/Agriculteur/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }

      auth.login(responsedata.jardin._id, responsedata.token);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Form>
    
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password  "
            onChange={onchange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={SubmitHundler}>
          Submit
        </Button>
      </Form>
      {success && <h2>{success}</h2>}
    </div>
  );
};
  
