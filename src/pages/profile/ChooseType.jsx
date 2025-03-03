import React, { useState, useContext } from "react";
import { updateProfile } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const ChooseType = () => {
  const [userType, setUserType] = useState("");
  const { updateUser } = useContext(AuthContext);

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_type", userType);

    await updateProfile(formData);
    await updateUser();

    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Choose User Type</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userType"
          >
            User Type
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userType"
            value={userType}
            onChange={handleTypeChange}
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!userType}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChooseType;
