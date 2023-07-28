//Validation tools
import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Campo requerido")
    .matches(/^[aA-zZ\s]+$/, "Letras únicamente"),
  firstSurname: Yup.string()
    .required("Campo requerido")
    .matches(/^[aA-zZ\s]+$/, "Letras únicamente"),
  secondLastName: Yup.string().matches(/^[aA-zZ\s]+$/, "Letras únicamente"),
  curp: Yup.string()
    .required("Campo requerido")
    .min(18, "Valide los datos de tu CURP")
    .max(18, "Valide los datos de tu CURP"),
  rfc: Yup.string()
    .required("Campo requerido")
    .min(13, "Valide los datos de tu CURP")
    .max(13, "Valide los datos de su RFC (con homoclave)"),
  state: Yup.string()
    .required("Campo requerido")
    .matches(/^[aA-zZ\s]+$/, "Letras únicamente"),
  address: Yup.string().required("Campo requerido"),
  town: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Letras únicamente")
    .required("Campo requerido"),
  colony: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Letras únicamente")
    .required("Campo requerido"),
  zipCode: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Valide su código postal "
    )
    .min(5, "Valide su código postal (minimo 5 digitos)")
    .max(5, "Valide su código postal (máximo 5 digitos)")
    .required("Campo requerido"),
  exteriorNumber: Yup.string()
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
      "Valide el campo"
    )
    .max(5, "Valide el campo (máximo 10 digitos)")
    .required("Campo requerido"),
  interiorNumber: Yup.string()
    .required("Campo requerido")
    .max(10, "Valide los datos (máximo 10 digitos)"),
});
