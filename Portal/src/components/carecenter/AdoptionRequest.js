import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "./NavBar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";
import NavBar from "./NavBar";



const rows=[
    {
        id:1,
        name:'German Dog',
        photo:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thesprucepets.com%2Fthmb%2FLndlJTIok9mVYGN4vlxX0dBYk_I%3D%2F1333x1000%2Fsmart%2Ffilters%3Ano_upscale()%2Fbreed_profile_germansheperd_1118000_profile_2608-d7a78e7c1cf049879bec1ec19113ee42.jpg&imgrefurl=https%3A%2F%2Fwww.thesprucepets.com%2Fbreed-profile-german-shepherd-dog-1117967&tbnid=K0SGI9YGEjloWM&vet=12ahUKEwjoxrqSltT2AhXsXmwGHUY3ACsQMygCegUIARDaAQ..i&docid=2hDIAY8QmkoGSM&w=1333&h=1000&q=german%20shepherd&ved=2ahUKEwjoxrqSltT2AhXsXmwGHUY3ACsQMygCegUIARDaAQ'
    }
]
const columns = [
  {
    field:'id',
    headerName:'ID',  
  },
  {
    field : 'name',
    headerName : 'Animal Name',
    width:300
  },
  {
    field : 'photo',
    headerName : 'Document',
    width  : 300,
    renderCell: (cellValues) => {
      return (
        <div>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Accept
        </Button>
        </div>
      );
    }
  },
  {
    field : 'action',
    headerName : 'Action',
    width  : 300,
    renderCell: (cellValues) => {
      return (
        <div>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();

            axios.post('http://localhost:5000/animals/api/accept',{
              id:cellValues.row._id,
            }).then(res=>{
              setTimeout(()=>{
                window.location.reload()
              },1000)
            })
          }}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={(e) => {
            e.preventDefault();

            axios.post('http://localhost:5000/animal/api/delete',{
              id:cellValues.row.animalId,
              acceptedId:localStorage.getItem('id_user'),
            }).then(res=>{
              setTimeout(()=>{
                window.location.reload()
              },1000)
            })
          }}
        >
          Reject
        </Button>
        </div>
      );
    }
  }
]



function AdoptionRequests()  {  
  
  let [data,setData] = useState([]);
  let [loading,setLoading] = useState(true);

  useEffect(()=>{

    axios.post("http://localhost:5000/adoption/api/show",{
        adoptionCenterId:localStorage.getItem('id_user')
    })
    .then(res=>{
    console.log(res)  
    
    })
    .catch(err=>console.log(err))
    },[])
  return (
    <Box>
    <Navbar/>
    <Box sx={{
      'marginTop':"50px",
      'height':"600px",
    }}>
      <DataGrid
        rowHeight={100}
        rows={rows}
        columns={columns}
        pageSize={5}
      />
      </Box>
      <Footer/>
    </Box>
  );
}


export default AdoptionRequests;