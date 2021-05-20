import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ErrorModel (props) {
  return <>{props.error && <Alert severity="error">{props.error}</Alert>}</>;
}