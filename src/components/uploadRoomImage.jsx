import axios from "axios";

const uploadRoomImage = async (roomId, selectedFile, roomName, description, token) => {
  const formData = new FormData();
  formData.append("imageFile", selectedFile);
  formData.append("roomName", roomName);
  formData.append("description", description);

  const response = await axios.post(
    `https://localhost:7168/api/hotel/upload-room-image/${roomId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export default uploadRoomImage;
