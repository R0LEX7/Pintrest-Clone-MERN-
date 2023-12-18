const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    let response = null;
    const timestamp = new Date().getTime();
    const publicId = `vande_matram_${timestamp}`;

    await cloudinary.uploader.upload(
      filePath,
      { resource_type: "image", public_id: publicId },
      function (error, result) {
        fs.unlinkSync(filePath);
        if (result) response = result;
        console.log(result);
      }
    );
    console.log("Upload on cloudinary successfully" + response);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("Upload on cloudinary failed :" + error);
    return null;
  }
};

module.exports = {
  uploadOnCloudinary,
};
