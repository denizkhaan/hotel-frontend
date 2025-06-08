import axios from "axios";

const uploadRoomImage = async (roomId, selectedFile, roomName, description, token) => {
  const formData = new FormData();
  formData.append("imageFile", selectedFile);
  formData.append("roomName", roomName);
  formData.append("description", description);

  const response = await axios.post(
    `https://hotel-backend-1-txtd.onrender.com/hotel/upload-room-image/${roomId}`,
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
