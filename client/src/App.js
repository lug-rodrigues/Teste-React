import { useState } from 'react';
import './App.css';
import Axios from "axios";
import { Button, Box, TextField  } from "@material-ui/core";
import Table from "./components/Table.js";

function App() {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [productToEdit, setProductToEdit] = useState({});

  const [productList, setProductList] = useState([]);

  const resetProduct = () =>{
    document.getElementById('nameTextField').value = '';
    document.getElementById('descriptionTextField').value = '';
    document.getElementById('priceTextField').value = 0;
    document.getElementById('quantityTextField').value = 0;
  }

  const addProduct = () =>{
    Axios.post("http://localhost:3001/postProduct", { 
      name: name,
      description : description,
      price : price,
      quantity : quantity
     })
     .then(() => {
       getProducts();
       resetProduct();
     })
     .catch(()=> {
       console.log("EITA, DEU ERRADO!!! ");
     })
  }

  const getProducts = () => {
    Axios.get("http://localhost:3001/getProductsList")
    .then((response) => {
      setProductList(response.data);
    })
  }

  const putProduct = (xiProduct) =>{
    Axios.put("http://localhost:3001/putProduct", {
      id : xiProduct.PRO_ID,  
      name: xiProduct.PRO_NAME,
      description : xiProduct.PRO_DESCRIPTION,
      price : xiProduct.PRO_PRICE,
      quantity : xiProduct.PRO_QUANTITY
    })
    .then((response)=>{
      getProducts();
    })
    .catch(()=>{
      console.log("EITA!!! DEU ERRADO AQUI TBM!!!");
    })
  }

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/deleteProduct/${id}`)
      .then((response)=>{
        getProducts();
      })
      .catch(()=>{
        console.log("EITA!!! DEU ERRADO AQUI TBM!!!");
      })
  }

  const updateOrDeleteProduct = (xiProduct, action) => {
    
    setProductToEdit(xiProduct);
    
    if(action === "update"){
      putProduct(xiProduct);
    }
    else if(action === "delete"){
      deleteProduct(xiProduct.PRO_ID);
    }
    /*else{
      setProductToEdit(xiProduct);
      document.getElementById('nameTextField').value = xiProduct.PRO_NAME;
      document.getElementById('descriptionTextField').value = xiProduct.PRO_DESCRIPTION;
      document.getElementById('priceTextField').value = xiProduct.PRO_PRICE;
      document.getElementById('quantityTextField').value = xiProduct.PRO_QUANTITY;
    }*/
  }

  return (
    <div className="App">
      <div className="information"> 

        <h1>Cadastro de Produtos:</h1>

        <TextField id="nameTextField" label="Nome" 
          onChange={(event) => {
            setName(event.target.value);
        }}/>

        <TextField id="descriptionTextField" label="Descrição" 
          onChange={(event) => {
            setDescription(event.target.value);
        }}/>

        <TextField id="priceTextField" label="Preço (R$)" 
          onChange={(event) => {
            setPrice(event.target.value);
        }}/>

        <TextField id="quantityTextField" label="Quantidade" 
          onChange={(event) => {
            setQuantity(event.target.value);
        }}/>

        <Button variant="contained" color="primary" onClick={addProduct} >Adicionar</Button>

        <Button variant="contained" color="secondary" onClick={getProducts} >Consultar</Button>
      </div>

      <br/>
      
        <Box className="products">
          <Table productList={ productList } 
                productToEdit = { productToEdit } 
                selectProduct={function (productToEdit, action) { updateOrDeleteProduct(productToEdit, action) }}
          />
        </Box>
    </div>
  );
}

export default App;
