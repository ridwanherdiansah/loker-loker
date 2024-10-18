import axios from "axios";

    const exportData = async (idLoker) => {
        try {
            const response = await axios.get(
                `${process.env.apiUrl}pelamar/export/${idLoker}`
            
            );
            
            return response.data;
        } catch (error) {
            console.error("Error exporting data:", error);
            throw error;
        }
    };

    const loker = async (idLoker) => {
        const response = await axios.get(
            `${process.env.apiUrl}pelamar/loker/${idLoker}`
        );

        return response;
    }

    const create = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}pelamar/create`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response;
    };   

    const show = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}pelamar/show/${id}`
        );
        
        return response;
    };


    
const PelamarNetwork = {
    exportData,
    loker,
    create,
    show,
};

export default PelamarNetwork;