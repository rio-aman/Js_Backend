import { v2 } from "cloudinary";
import fs from "fs"; //fs is file system

// Configuration
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloundinary
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
        })
        console.log(response)
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // it remove the temporary file that are saved locally 
        return null; 
    }
}

export {uploadOnCloudinary}


// cloudinary.v2.uploader
//   .upload(
//     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//     {
//       public_id: "shoes",
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });
