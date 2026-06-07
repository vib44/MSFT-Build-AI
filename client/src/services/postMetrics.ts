import React from 'react'
import axios from "axios"
import { API_BASE_URL } from './config';

const api= axios.create({baseURL:API_BASE_URL})

const postMetrics = async (metrics: any) => {
  try
  {
    const res=await api.post("logs/savemetrics",metrics) 
    return res.data;
  }
  catch(err)
  {
    throw new Error(`Error saving metrics ${err}`);
  }
  
}

export default postMetrics