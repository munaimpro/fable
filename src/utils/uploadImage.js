import toast from "react-hot-toast";

export const uploadImage = async (imageFile) => {
    console.log(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if (data.success) {
        return data.data.url;
    }

    toast.error("Image upload failed");
}