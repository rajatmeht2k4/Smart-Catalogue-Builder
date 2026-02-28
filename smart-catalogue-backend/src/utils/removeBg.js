import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export async function removeBackground(inputPath, outputPath) {
  const formData = new FormData();
  formData.append("image_file", fs.createReadStream(inputPath));
  formData.append("size", "auto");

  const response = await axios.post(
    "https://api.remove.bg/v1.0/removebg",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVEBG_API_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  fs.writeFileSync(outputPath, response.data);
}
