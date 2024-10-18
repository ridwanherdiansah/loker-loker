import axios from "axios";

    const appendData = (data) => {
        let formData = new FormData();
        Object.keys(data).forEach((keyName) => {
        if (keyName !== "image") {
            formData.append(keyName, data[keyName]);
        }
        });
        const image = data.image;
        if (image) {
        formData.append("image", image);
        }
        return formData;
    };

    const post = async (data = {}) => {
        try {
            const formData = appendData(data);
            const response = await axios.post(
              `${process.env.apiUrl}loker/create`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            return response;
          } catch (error) {
            console.error('error updating profile', error);
            throw error;
          }
    }

    const user = async (params = {}) => {
        const response = await axios.get(
            `${process.env.apiUrl}loker/lokerUser/${params?.idUser || ""}`,
            { params }
        );

        return response;
    }

    const apply = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}loker/apply`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response;
    };  

    const perusahaan = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}loker/prusahaanId/${id}`
        );

        return response;
    }

    const loker = async (params = {}) => {
        const response = await axios.get(
            `${process.env.apiUrl}loker`,{params}
        );
        
        return response;
    };

    const lokerNew = async () => {
        const response = await axios.get(
            `${process.env.apiUrl}lokerNew`,
        );
        
        return response;
    };

    const search = async (params = {}) => {
        const response = await axios.get(
            `${process.env.apiUrl}loker/search`,{params}
        );
        
        return response;
    };

    const show = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}loker/id/${id}`
        );

        return response;
    }

const LokerNetwork = {
    post,
    user,
    apply,
    perusahaan,
    lokerNew,
    loker,
    search,
    show,
};

export default LokerNetwork;