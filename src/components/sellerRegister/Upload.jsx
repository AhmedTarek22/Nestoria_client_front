const uploadToCloudinary = async (file) => {
    const cloudName = 'yussef'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'ml_default'; // Replace with your upload preset
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
  
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      return response.data; // Return the response from Cloudinary, which includes the URL
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      throw error;
    }
  };
  