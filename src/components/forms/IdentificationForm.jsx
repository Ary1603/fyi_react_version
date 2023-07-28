import React, { useState } from "react";
//Components
import Alerts from "../alerts/alerts";
//CSS
import "../../assets/styles/errors.css";
import "./identification-form.css";
//React Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//Validation tools
import { Formik } from "formik";
import { formSchema } from "../../data/schemas/formSchema";
//Data
import { mexico_states } from "../../data/mexico_states";

const states = mexico_states.states;

function IdentificationForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formErrors, setformErrors] = useState(false);

  return (
    <>
      <h2 id="identification-title">Identificación </h2>

      <Formik
        initialValues={{
          userName: "",
          firstSurname: "",
          secondLastName: "",
          curp: "",
          rfc: "",
          state: "",
          town: "",
          colony: "",
          address: "",
          zipCode: "",
          exteriorNumber: "",
          interiorNumber: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values, { setSubmitting, resetForm, isValiditing }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setformErrors(false);

          fetch("http://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify({
              infoUsuario: {
                Nombre: values.userName,
                Primer_Apellido: values.firstSurname,
                Segundo_Apellido: values.secondLastName,
                Curp: values.curp,
                Rfc: values.rfc,
              },
              Domicilio: {
                Calle: values.address,
                Estado: values.state,
                Municipio: values.town,
                Colonia: values.colony,
                CodigoPostal: values.zipCode,
                NumeroExterior: values.exteriorNumber,
                NumeroInterior: values.interiorNumber,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              console.log("Success:", response);
              // Resets form after submission is complete
              resetForm();
            });
          setSubmitting(true);

          console.log("Se subio");
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Row>
                <Form.Group
                  className="mb-3 form-group"
                  as={Col}
                  controlId="formGridName"
                >
                  <Form.Label className="label-form">Nombre*</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                    className={
                      errors.userName && errors.userName != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.userName && errors.userName != "Campo requerido" ? (
                    <Alerts message={errors.userName} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridFirstSurname"
                >
                  <Form.Label className="label-form">
                    Primer apellido*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstSurname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstSurname}
                    className={
                      errors.firstSurname &&
                      errors.firstSurname != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.firstSurname &&
                  errors.firstSurname != "Campo requerido" ? (
                    <Alerts message={errors.firstSurname} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridSecondLastName"
                >
                  <Form.Label className="label-form">
                    Segundo apellido
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="secondLastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondLastName}
                    className={
                      errors.secondLastName &&
                      errors.secondLastName != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.secondLastName &&
                  errors.secondLastName != "Campo requerido" ? (
                    <Alerts message={errors.secondLastName} />
                  ) : null}
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  className="mb-3 form-group"
                  as={Col}
                  controlId="formGridCurp"
                >
                  <Form.Label className="label-form">CURP*</Form.Label>
                  <Form.Control
                    type="text"
                    name="curp"
                    maxLength={18}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.curp}
                    className={
                      errors.curp && errors.curp != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.curp && errors.curp != "Campo requerido" ? (
                    <Alerts message={errors.curp} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridRfc"
                >
                  <Form.Label className="label-form">
                    RFC (con homoclave)*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={13}
                    name="rfc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rfc}
                    className={
                      errors.rfc && errors.rfc != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.rfc && errors.rfc != "Campo requerido" ? (
                    <Alerts message={errors.rfc} />
                  ) : null}
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-3 form-group">
                  <Form.Label className="label-form">Código postal*</Form.Label>
                  <Form.Control
                    type="number"
                    name="zipCode"
                    maxLength={5}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipCode}
                    className={
                      errors.zipCode && errors.zipCode != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.zipCode && errors.zipCode != "Campo requerido" ? (
                    <Alerts message={errors.zipCode} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridStreetName"
                >
                  <Form.Label className="label-form">Calle*</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    className={
                      errors.address && errors.address != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.address ? <Alerts message={errors.address} /> : null}
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridExteriorNumber"
                >
                  <Form.Label className="label-form">
                    Número exterior*
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="exteriorNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.exteriorNumber}
                    className={
                      errors.exteriorNumber &&
                      errors.exteriorNumber != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.exteriorNumber &&
                  errors.exteriorNumber != "Campo requerido" ? (
                    <Alerts message={errors.exteriorNumber} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridInteriorNumber"
                >
                  <Form.Label className="label-form">
                    Número interior
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="interiorNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.interiorNumber}
                    className={
                      errors.interiorNumber &&
                      errors.interiorNumber != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.interiorNumber &&
                  errors.interiorNumber != "Campo requerido" ? (
                    <Alerts message={errors.interiorNumber} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridState"
                >
                  <Form.Label className="label-form">Estado*</Form.Label>
                  <Form.Select
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                    className={
                      errors.state && errors.state != "Campo requerido"
                        ? "error"
                        : null
                    }
                  >
                    <option>Seleccione su estado</option>
                    {states.map((state, index) => (
                      <option key={index}>{state.name}</option>
                    ))}
                  </Form.Select>
                  {errors.state && errors.state != "Campo requerido" ? (
                    <Alerts message={errors.state} />
                  ) : null}
                </Form.Group>
              </Row>

              <Row>
                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridTown"
                >
                  <Form.Label className="label-form">
                    Delegación / Municipio*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="town"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.town}
                    className={
                      errors.town && errors.town != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.town && errors.town != "Campo requerido" ? (
                    <Alerts message={errors.town} />
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  className="mb-3 form-group"
                  controlId="formGridColonia"
                >
                  <Form.Label className="label-form">Colonia*</Form.Label>
                  <Form.Control
                    type="text"
                    name="colony"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.colony}
                    className={
                      errors.colony && errors.colony != "Campo requerido"
                        ? "error"
                        : null
                    }
                  />
                  {errors.colony && errors.colony != "Campo requerido" ? (
                    <Alerts message={errors.colony} />
                  ) : null}
                </Form.Group>
              </Row>

              <Button
                className="btn-submit-form"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  handleShow();
                  if (errors) {
                    setformErrors(true);
                  } else {
                    setformErrors(false);
                  }
                }}
              >
                Submit
              </Button>
            </Container>
          </Form>
        )}
      </Formik>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formErrors
              ? "Upss... Error en el formulario"
              : "Formulario enviado"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors
            ? "Existen campos por validar."
            : "Campos validados correctamente."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={
              formErrors ? "modal-content-danger" : "modal-content-success"
            }
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IdentificationForm;
