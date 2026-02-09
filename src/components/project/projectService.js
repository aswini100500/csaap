import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const projectService = {
    // --- APARTMENT APIS ---
    createApartment: async (projectData) => {
        const response = await axios.post(`${API_URL}/apartments`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getAllApartments: async () => {
        const response = await axios.get(`${API_URL}/apartments`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getApartmentById: async (id) => {
        const response = await axios.get(`${API_URL}/apartments/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    updateApartment: async (id, projectData) => {
        const response = await axios.put(`${API_URL}/apartments/${id}`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    deleteApartment: async (id) => {
        const response = await axios.delete(`${API_URL}/apartments/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    // --- COMMERCIAL APIS ---
    createCommercial: async (projectData) => {
        const response = await axios.post(`${API_URL}/commercials`, projectData);
        return response.data.data;
    },

    getAllCommercials: async () => {
        const response = await axios.get(`${API_URL}/commercials`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getCommercialById: async (id) => {
        const response = await axios.get(`${API_URL}/commercials/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    updateCommercial: async (id, projectData) => {
        const response = await axios.put(`${API_URL}/commercials/${id}`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    deleteCommercial: async (id) => {
        const response = await axios.delete(`${API_URL}/commercials/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    // --- PLOTTING APIS ---
    createPlotting: async (projectData) => {
        const response = await axios.post(`${API_URL}/plottings`, projectData ,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getAllPlottings: async () => {
        const response = await axios.get(`${API_URL}/plottings`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        console.log(response);
        
        return response.data.data;
    },

    getPlottingById: async (id) => {
        const response = await axios.get(`${API_URL}/plottings/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    updatePlotting: async (id, projectData) => {
        const response = await axios.put(`${API_URL}/plottings/${id}`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    deletePlotting: async (id) => {
        const response = await axios.delete(`${API_URL}/plottings/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    // --- DUPLEX APIS ---
    createDuplex: async (projectData) => {
        const response = await axios.post(`${API_URL}/duplexes`, projectData ,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getAllDuplexes: async () => {
        const response = await axios.get(`${API_URL}/duplexes`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getDuplexById: async (id) => {
        const response = await axios.get(`${API_URL}/duplexes/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    updateDuplex: async (id, projectData) => {
        const response = await axios.put(`${API_URL}/duplexes/${id}`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    deleteDuplex: async (id) => {
        const response = await axios.delete(`${API_URL}/duplexes/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    // --- TRIPLEX APIS ---
    createTriplex: async (projectData) => {
        const response = await axios.post(`${API_URL}/triplexes`, projectData ,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getAllTriplexes: async () => {
        const response = await axios.get(`${API_URL}/triplexes`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    getTriplexById: async (id) => {
        const response = await axios.get(`${API_URL}/triplexes/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    updateTriplex: async (id, projectData) => {
        const response = await axios.put(`${API_URL}/triplexes/${id}`, projectData,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },

    deleteTriplex: async (id) => {
        const response = await axios.delete(`${API_URL}/triplexes/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
        });
        return response.data.data;
    },
};

export default projectService;
