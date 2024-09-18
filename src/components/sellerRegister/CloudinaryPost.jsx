const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUploading(true);
      try {
        // Upload files to Cloudinary
        const uploadPromises = [
          formData.bankStatement && uploadToCloudinary(formData.bankStatement),
          formData.taxFile && uploadToCloudinary(formData.taxFile),
          formData.frontID && uploadToCloudinary(formData.frontID),
          formData.backID && uploadToCloudinary(formData.backID),
        ].filter(Boolean);
  
        const uploadResults = await Promise.all(uploadPromises);
        // Process uploadResults if needed
  
        setUploading(false);
        navigate('/thank-you');
      } catch (error) {
        setUploading(false);
        console.error('Upload failed:', error);
      }
    }
  };
  