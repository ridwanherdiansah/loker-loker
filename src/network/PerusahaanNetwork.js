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
  
  const updateFoto = async (data = {}) => {
    try {
      const formData = appendData(data);
      const response = await axios.post(
        `${process.env.apiUrl}perusahaan/updateFoto`,
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

    const CardUpdatePerusahaan = async (data) => {
        const response = await axios.post(
            `${process.env.apiUrl}perusahaan/create`,
            data,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        return response;
    };

    const user = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}perusahaan/user/${id}`
        );

        return response;
    }

    const id = async (id) => {
        const response = await axios.get(
            `${process.env.apiUrl}perusahaan/id/${id}`
        );

        return response;
    };

    const get = async (params = {}) => {
        const response = await axios.get(
            `${process.env.apiUrl}perusahaan`, {params}
        );

        return response;
    };

    const show = async (params = {}) => {
        const response = await axios.get(
            `${process.env.apiUrl}perusahaan/show`,{params}
        );
        
        return response;
    };


    
const PerusahaanNetwork = {
    updateFoto,
    CardUpdatePerusahaan,
    user,
    id,
    get,
    show,
};

export default PerusahaanNetwork;