import toast from "react-hot-toast";

export const setInitialData = async (setProducts) => {
  try {
    const response = await fetch("http://localhost:5173/src/data/initialData.json");
    const data = await response.json();
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data); // Actualiza el estado con los datos iniciales

  } catch (error) {
    toast.error("Error al obtener los datos iniciales.");
    console.log(error);
  }
};
