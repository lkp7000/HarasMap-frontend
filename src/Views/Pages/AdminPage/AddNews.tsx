import React, { useState, ChangeEvent, FormEvent } from 'react';
import AdminDashBoardLayout from '../AdminDashboard/AdminDashBoardLayout';
import { addnews } from '../../../services/api';

import { useTranslation } from 'react-i18next';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const AddNews: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [buttonTitle, setButtonTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const {t}= useTranslation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const handleButtonTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setButtonTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const convertImageToByteArray = (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
      reader.onerror = (error) => reject(error);

            reader.readAsArrayBuffer(file);
        });
    };
    const notify = () => toast(t('Submitted Successfully'));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit button clicked");

    try {
      if (!image) {
        throw new Error("No image selected");
      }
      const imageByteArray = await convertImageToByteArray(image);

      const formData = new FormData();

      const formFields: any = {
        image: Array.from(imageByteArray),
        title: buttonTitle,
        description: description,
      };

      const token = localStorage.getItem("token");
      const apiResponse = await addnews(formFields, token);
      console.log("API response:", apiResponse);

      notify();
      setImage(null);
      setButtonTitle("");
      setDescription("");
    } catch (error) {
      console.error(
        "Error making service request or handling API response:",
        error
      );
    }
  };

  return (
    <AdminDashBoardLayout>
      <div className="max-w-md mx-auto mt-12 p-4 bg-white rounded-md shadow-md bg-[#e2e8f0] rounded-lg dark:bg-gray-900">
        <h2 className="text-2xl text-center font-semibold mb-4">
          {t("Add News")}
        </h2>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <label
              htmlFor="image"
              className="block text-gray-600 font-semibold mb-2"
            >
              {t("Upload Image")}:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full py-2 px-3 pl-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="buttonTitle"
              className="block text-gray-600 font-semibold mb-2"
            >
              {t("News Title")}:
            </label>
            <input
              type="text"
              id="buttonTitle"
              value={buttonTitle}
              onChange={handleButtonTitleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="block text-gray-600 font-semibold mb-2"
            >
              {t("Description")}:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full py-6 px-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 self-end"
          >
            {t("Submit")}
            <ToastContainer />
          </button>
        </form>
      </div>
    </AdminDashBoardLayout>
  );
};

export default AddNews;
