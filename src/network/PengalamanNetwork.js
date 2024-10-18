import axios from "axios";

    const destroy = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}pengalaman/destroy/${id}`
        );
        
        return response;
    }

    const create = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}pengalaman/create`,
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
            `${process.env.apiUrl}pengalaman/show/${id}`
        );
        
        return response;
    };


    
const PengalamanNetwork = {
    destroy,
    create,
    show,
};

export default PengalamanNetwork;