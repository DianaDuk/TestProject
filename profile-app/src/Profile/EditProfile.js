import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";

export function EditProfile() {
  const [avatar, setAvatar] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("user")) || {
      name: "",
      surname: "",
      jobTitle: "",
      phone: "",
      email: "",
      address: "",
      pitch: "",
      visibility: "Private",
      scopes: [],
      interests: [],
      links: [],
    },
  });

  
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
    alert("Profile saved successfully!");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToList = (field) => {
    const currentValues = watch(field);
    setValue(field, [...currentValues, ""]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md flex space-x-6">
      {}
      <div className="flex flex-col items-center space-y-4 w-1/3">
        {}
        <div className="relative">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer shadow-md">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <span className="text-gray-600 text-lg">📸</span>
          </label>
        </div>
      </div>

      {}
      <div className="w-2/3 bg-gradient-to-b from-blue-100 to-blue-50 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Surname</label>
              <input
                {...register("surname", { required: "Surname is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.surname && (
                <span className="text-red-500 text-sm">
                  {errors.surname.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Job Title</label>
            <input {...register("jobTitle")} className="w-full border p-2 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input {...register("address")} className="w-full border p-2 rounded-md" />
          </div>
          <div>
            <label className="block text-gray-700">Pitch</label>
            <textarea
              {...register("pitch")}
              className="w-full border p-2 rounded-md"
            ></textarea>
          </div>

          {}
          {["scopes", "interests", "links"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize">
                {field.replace(/s$/, "")}:
              </label>
              {watch(field)?.map((item, index) => (
                <input
                  key={index}
                  value={item}
                  onChange={(e) => {
                    const newValues = [...watch(field)];
                    newValues[index] = e.target.value;
                    setValue(field, newValues);
                  }}
                  className="w-full border p-2 rounded-md mb-2"
                />
              ))}
              <button
                type="button"
                onClick={() => addToList(field)}
                className="flex items-center text-blue-500"
              >
                <BsPlusCircle className="mr-1" />
                Add {field.replace(/s$/, "")}
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}


