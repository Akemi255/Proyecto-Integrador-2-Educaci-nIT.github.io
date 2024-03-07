import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { TextField, Button, Box } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { useSelectedOption } from "../context/SelectedOptionContext";
import "../styles/scss/create-product/create-product.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Este dato es obligatorio")
    .max(23, "El nombre debe tener máximo 23 caracteres"),
  price: Yup.number()
    .required("Este dato es obligatorio")
    .min(0),
  stock: Yup.number()
    .integer("El stock debe ser un número entero")
    .required("Este dato es obligatorio")
    .min(0),
  description: Yup.string()
    .required("Este dato es obligatorio")
    .max(40, "La descripción debe tener máximo 40 caracteres"),
  imageUrl: Yup.string()
    .url("Ingresa una URL válida")
    .required("Este dato es obligatorio"),
});

const EditProduct = () => {
  const { id } = useParams();
  const { selectedOption, setSelectedOption } = useSelectedOption();

  const [product] = useState(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const selectedProduct = products.find(item => item.id === id);
    if (selectedProduct) {
      return selectedProduct;
    } else {
      toast.error("Ups... Ha ocurrido un error");
      return {
        name: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: ''
      };
    }
  });

  const handleSubmit = async (values) => {
    try {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = products.map(item => {
        if (item.id === id) {
          return { ...item, ...values }; 
        }
        return item;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      toast.success("Producto actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el producto");
    }
  };

  useEffect(()=>{
    setSelectedOption("Volver")
  },[id])

  return (
    <>
    <br />
      <Button to="/" className="go-back" component={Link} onClick={() => setSelectedOption("Inicio")} style={{ backgroundColor: selectedOption === "Volver" ? "#e6e6e6" : "" }}>
        <ArrowBackIosIcon style={{ verticalAlign: "middle" }} />
        <span style={{ verticalAlign: "middle", marginLeft: "5px" }}>Volver</span>
      </Button>
      <div className="create-product-container">
        <h2>Editar Producto</h2>
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="create-product-form">
              <Box mb={2}>
                <Field as={TextField} name="name" label="Nombre" fullWidth />
                <ErrorMessage name="name" component="div" className="error-message" />
              </Box>
              <Box mb={2}>
                <Field as={TextField} name="price" label="Precio" fullWidth />
                <ErrorMessage name="price" component="div" className="error-message" />
              </Box>
              <Box mb={2}>
                <Field as={TextField} name="stock" label="Stock" fullWidth />
                <ErrorMessage name="stock" component="div" className="error-message" />
              </Box>
              <Box mb={2}>
                <Field as={TextField} name="description" multiline rows={4} label="Descripción" fullWidth />
                <ErrorMessage name="description" component="div" className="error-message" />
              </Box>
              <Box mb={2}>
                <Field as={TextField} name="imageUrl" label="URL de la imagen" fullWidth />
                <ErrorMessage name="imageUrl" component="div" className="error-message" />
                {values.imageUrl && (
                <img src={values.imageUrl} alt="Vista previa de la imagen" style={{ marginTop: "10px", width: "100%", maxHeight: "auto", objectFit: "cover" }} />
                )}
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Actualizar Producto
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditProduct;
