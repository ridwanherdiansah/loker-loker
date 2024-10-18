import axios from "axios";

    const destroy = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}keahlian/destroy/${id}`
        );
        
        return response;
    }

    const create = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}keahlian/create`,
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
            `${process.env.apiUrl}keahlian/show/${id}`
        );
        
        return response;
    };


    
const KeahlianNetwork = {
    destroy,
    create,
    show,
};

export default KeahlianNetwork;