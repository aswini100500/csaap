import React, { use } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';




const AdminApi =async () => {
 const [companiesData,setCompanies]=useState([]); 
const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://api.csaap.com/api/superadmin/tenants', {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      
      let companiesData = [];
      if (Array.isArray(response.data)) {
        companiesData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        companiesData = response.data.data;
      } else if (response.data && response.data.tenants && Array.isArray(response.data.tenants)) {
        companiesData = response.data.tenants;
      }
      
      if (companiesData.length > 0) {
        setCompanies(companiesData);
        setFilteredCompanies(companiesData);
      } else {
        throw new Error('No companies data received from API');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching companies');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
     
     <>
        <p>`data ${data}`</p>
     </>
  )
}

export default AdminApi;