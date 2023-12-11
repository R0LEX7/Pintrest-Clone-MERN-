const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: "dtrawqhte",
  api_key: "662798996286344",
  api_secret: "KSoxVWXYcmHg4o13GA4uF0RrZuw",
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
