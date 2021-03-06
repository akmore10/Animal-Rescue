import React from "react";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, width } from "@mui/system";
import Navbar from "./NavBar";
import { useState,useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";

const rows = [
  {
    id:1,
    name:"German Shepherd",
    location:"Mumbai",
    status:"pending",
  },
  {
    id:2,
    name:"BullDog",
    location:"Mumbai",
    status:"pending",
  },
  {
    id:3,
    name:"Golden Retriver",
    location:"Mumbai",
    status:"pending",
  }

]  

const columns = [
  {
    field:'id',
    headerName:'ID',  
  },
  {
    field : 'name',
    headerName : 'Name',
    width:300
  },
  {
    field : 'location',
    headerName : 'City',
    width:300
  },
  {
    field : 'status',
    headerName : 'Status',
    width:300
  },
]



function ViewDisaster()  {  
  
  let [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://4589-110-44-11-192.ngrok.io/disaster/api/show',{
      ngoID:localStorage.getItem('id_user')
    }).then(res=>{
      res = res.data.map(item=>item.Record)
      res = res.map((record)=>{
        record['id'] = record.ngoId 
        return record
      })
      console.log(res);
      setData(res);
  })},[])
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


export default ViewDisaster;
