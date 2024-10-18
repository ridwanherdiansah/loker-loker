import axios from "axios";

    const destroy = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}pendidikan/destroy/${id}`
        );

        return response;
    }

    const create = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}pendidikan/create`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response;
    };   

    const show = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}pendidikan/show/${id}`
        );
        
        return response;
    };


    
const PendidikanNetwork = {
    destroy,
    create,
    show,
};

export default PendidikanNetwork;