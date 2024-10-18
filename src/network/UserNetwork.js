import axios, { Axios } from "axios";

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
      `${process.env.apiUrl}User/UpdateFoto`,
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

const updateProfile = async (data = {}) => {
  try {
      const formData = appendData(data);
      const response = await axios.post(
          `${process.env.apiUrl}updateProfile`,
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }
      );
      return response;
  } catch (error) {
      console.error('error updating profile', error);
      throw error;
  }
};


const show = async (id) => {
  const response = await axios.get(
    `${process.env.apiUrl}user/${id}`
  );

  return response;
}

const registrasi = async (registrasi) => {
  try {
    const response = await axios.post(
      `${process.env.apiUrl}registrasi`,
      registrasi,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (dataLogin) => {
  try {
    const response = await axios.post(`${process.env.apiUrl}login`, dataLogin);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UserNetwork = {
  updateFoto,
  updateProfile,
  show,
  login,
  registrasi,
};

export default UserNetwork;
