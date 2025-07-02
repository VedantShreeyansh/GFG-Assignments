import React, { useState } from "react";

const defaultProfile = {
  name: "N/A",
  email: "N/A",
  address: "Add address",
  phone: "Add phone",
  gender: "Add gender",
  dob: "Add date of birth",
  location: "Add location",
  altMobile: "Add alternate mobile",
};
const ProfilePage = ({ onClose }: { onClose: () => void }) => {
  const [user, setUser] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    return { ...defaultProfile, ...stored };
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...user, [name]: value };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const handleEditClick = () => setEditing(true);

  const handleSaveClick = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 py-12">
      <div className="bg-white shadow-2xl p-3 w-full max-w-4xl rounded-2xl relative flex flex-col items-center my-8 mx-4 md:mx-10 lg:mx-20">
        <button
          className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          {" "}
          &times;
        </button>
        <h2 className="mb-1 text-3xl text-center tracking-wide">Account</h2>
        <p className="mb-6 text-xl text-center text-gray-700">{user.name}</p>

        <form
          className="w-full bg-gray-50 shadow-lg rounded-xl px-8 py-8"
          autoComplete="off"
        >
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="px-3 text-lg font-semibold text-gray-700">
              Personal Details
            </legend>
            <table className="w-full border-seperate border-spacing-y-4">
              <tbody>
                <tr>
                  <td className="font-semibold w-1/3">Email:</td>
                  <td>
                    <input
                      className="border-none px-3 py-2 w-full bg-gray-100 text-gray-700"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Address:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      placeholder="Add address"
                      disabled={!editing}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Phone:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="Add phone"
                      disabled={!editing}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Gender:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      placeholder="Add gender"
                      disabled={!editing}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Date of Birth:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="dob"
                      value={user.dob}
                      onChange={handleChange}
                      placeholder="Add date of birth"
                      type="date"
                      disabled={!editing}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Location:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="location"
                      value={user.location}
                      onChange={handleChange}
                      placeholder="Add location"
                      disabled={!editing}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Alternate Mobile:</td>
                  <td>
                    <input
                      className="border-none rounded px-3 py-2 w-full"
                      name="altMobile"
                      value={user.altMobile}
                      onChange={handleChange}
                      placeholder="Add alternate mobile"
                      disabled={!editing}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
          <div className="flex justify-end mt-6">
            {!editing ? (
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition flex mx-auto justify-center items-center"
                onClick={handleEditClick}
              >
                Edit Details
              </button>
            ) : (
              <button
                type="button"
                className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition flex mx-auto justify-center items-center"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
