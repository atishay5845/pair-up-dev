
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  // Load existing user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setSkills(user.skills || []);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!age) {
      setError("Age is required.");
      return;
    }

    if (Number(age) < 18 || Number(age) > 100) {
      setError("Please enter a valid age between 18 and 100.");
      return;
    }

    if (!gender) {
      setError("Gender is required.");
      return;
    }

    const updatedProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: Number(age),
      gender,
      about: about.trim(),
      photoUrl: photoUrl.trim(),
      skills,
    };

    try {
      setSaving(true);

      /*
        Change this URL if your backend route is different.

        Example:
        http://localhost:5000/profile/edit
      */
      const response = await fetch(
        "http://localhost:5000/profile/edit",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(updatedProfile),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile."
        );
      }

      setSuccess("Profile updated successfully!");

      console.log("Updated profile:", data);
    } catch (err) {
      setError(
        err.message || "An error occurred while saving the profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11151c] px-4 py-10">
      <div
        className="
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          justify-center
          gap-10
          lg:flex-row
          lg:items-start
        "
      >
        {/* ================= EDIT PROFILE ================= */}

        <div className="card w-full max-w-md bg-base-300 shadow-xl">
          <div className="card-body">

            <h2 className="mb-4 text-center text-2xl font-bold">
              Edit Profile
            </h2>

            <form onSubmit={handleSave}>

              {/* First Name */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    First Name:
                  </span>
                </div>

                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  placeholder="Enter your first name"
                />
              </label>

              {/* Last Name */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    Last Name:
                  </span>
                </div>

                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Enter your last name"
                />
              </label>

              {/* Age */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    Age:
                  </span>
                </div>

                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                />
              </label>

              {/* Gender */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    Gender:
                  </span>
                </div>

                <select
                  value={gender}
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </label>

              {/* About */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    About:
                  </span>
                </div>

                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full"
                  onChange={(e) =>
                    setAbout(e.target.value)
                  }
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </label>

              {/* Photo URL */}
              <label className="form-control my-2 w-full">
                <div className="label">
                  <span className="label-text">
                    Photo URL:
                  </span>
                </div>

                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setPhotoUrl(e.target.value)
                  }
                  placeholder="Enter profile photo URL"
                />
              </label>

              {/* Error */}
              {error && (
                <div className="alert alert-error mt-4">
                  <span>{error}</span>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="alert alert-success mt-4">
                  <span>{success}</span>
                </div>
              )}

              {/* Save */}
              <button
                type="submit"
                disabled={saving}
                className="
                  btn
                  mt-5
                  w-full
                  border-none
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  disabled:bg-blue-400
                "
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

            </form>
          </div>
        </div>

        {/* ================= LIVE PROFILE PREVIEW ================= */}

        <div
          className="
            flex
            w-full
            max-w-sm
            flex-col
            items-center
            lg:sticky
            lg:top-10
          "
        >
          <h2 className="mb-4 text-xl font-semibold text-white">
            Live Profile Preview
          </h2>

          <UserCard
            showActions={false}
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills,
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default EditProfile;

// import { useEffect, useState } from "react";
// import UserCard from "./UserCard";


// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [about, setAbout] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [error, setError] = useState("");

//   // Fill the form with existing user data
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName || "");
//       setLastName(user.lastName || "");
//       setAge(user.age || "");
//       setGender(user.gender || "");
//       setAbout(user.about || "");
//       setPhotoUrl(user.photoUrl || "");
//     }
//   }, [user]);

//   const saveProfile = async () => {
//     try{
//       const res = await fetch(BASE_URL + "/profile/edit", {
        
//           firstName,
//           lastName,
//           age: Number(age),
//           gender,
//           about,
//           photoUrl
//         },{
//           withCredentials: true,
//         }
//       );
//       dispatch(addUser(res.data.data));
//     }catch(err){
//       setError(err.message || "An error occurred while saving the profile.");
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#11151c] px-4 py-10">
//       <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">

//         {/* ================= EDIT PROFILE ================= */}
//         <div className="card w-full max-w-md bg-base-300 shadow-xl">
//           <div className="card-body">

//             <h2 className="mb-4 justify-center text-2xl font-bold">
//               Edit Profile
//             </h2>

//             <form onSubmit={handleSave}>

//               {/* First Name */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">First Name:</span>
//                 </div>

//                 <input
//                   type="text"
//                   value={firstName}
//                   className="input input-bordered w-full"
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="Enter your first name"
//                 />
//               </label>

//               {/* Last Name */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">Last Name:</span>
//                 </div>

//                 <input
//                   type="text"
//                   value={lastName}
//                   className="input input-bordered w-full"
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Enter your last name"
//                 />
//               </label>

//               {/* Age */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">Age:</span>
//                 </div>

//                 <input
//                   type="number"
//                   value={age}
//                   className="input input-bordered w-full"
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="Enter your age"
//                   min="18"
//                   max="100"
//                 />
//               </label>

//               {/* Gender */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">Gender:</span>
//                 </div>

//                 <select
//                   value={gender}
//                   className="select select-bordered w-full"
//                   onChange={(e) => setGender(e.target.value)}
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>

//               {/* About */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">About:</span>
//                 </div>

//                 <textarea
//                   value={about}
//                   className="textarea textarea-bordered w-full"
//                   onChange={(e) => setAbout(e.target.value)}
//                   placeholder="Tell us about yourself"
//                   rows="4"
//                 />
//               </label>

//               {/* Photo URL */}
//               <label className="form-control my-2 w-full">
//                 <div className="label">
//                   <span className="label-text">Photo URL:</span>
//                 </div>

//                 <input
//                   type="text"
//                   value={photoUrl}
//                   className="input input-bordered w-full"
//                   onChange={(e) => setPhotoUrl(e.target.value)}
//                   placeholder="Enter profile photo URL"
//                 />
//               </label>

//               {/* Error */}
//               {error && (
//                 <div className="alert alert-error mt-3">
//                   <span>{error}</span>
//                 </div>
//               )}

//               {/* Save Button */}
//               <button
//                 type="submit"
//                 className="btn mt-5 w-full border-none bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Save Profile
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* ================= PROFILE PREVIEW ================= */}
//         <div className="flex w-full max-w-sm flex-col items-center">
//           <h2 className="mb-4 text-xl font-semibold text-white">
//             Profile Preview
//           </h2>

//           <div className="w-full">
//             <UserCard
//               user={{
//                 firstName,
//                 lastName,
//                 photoUrl,
//                 age,
//                 gender,
//                 about,
//               }}
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EditProfile;