
import React from "react";

const UserCard = ({ user, showActions = true }) => {
    const {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills = [],
    } = user || {};

    const defaultPhoto =
        gender?.toLowerCase() === "female"
            ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <div
            className="
                w-[310px]
                overflow-hidden
                rounded-2xl
                bg-[#1d232e]
                border border-white/10
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
            "
        >
            {/* Image */}
            <div className="relative h-[300px] w-full">

                <img
                    src={photoUrl || defaultPhoto}
                    alt={`${firstName || "User"} profile`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = defaultPhoto;
                    }}
                />

                {/* Image gradient */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-transparent
                        to-transparent
                    "
                />

                {/* Active */}
                <div className="absolute right-3 top-3">
                    <span
                        className="
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-black/60
                            px-2.5
                            py-1
                            text-xs
                            text-white
                            backdrop-blur-sm
                        "
                    >
                        <span className="h-2 w-2 rounded-full bg-green-400" />
                        Active
                    </span>
                </div>

                {/* Name */}
                <div className="absolute bottom-4 left-4">

                    <h2 className="text-xl font-bold text-white">
                        {firstName || "First Name"}{" "}
                        {lastName || "Last Name"}

                        {age && (
                            <span className="ml-1.5 font-normal text-gray-300">
                                {age}
                            </span>
                        )}
                    </h2>

                    {gender && (
                        <p className="mt-0.5 text-xs capitalize text-gray-300">
                            {gender}
                        </p>
                    )}

                </div>
            </div>

            {/* Card Content */}
            <div className="p-4">

                {/* About */}
                <div className="mb-4">

                    <p className="mb-1.5 text-xs font-semibold text-gray-400">
                        About
                    </p>

                    <p className="line-clamp-2 text-sm leading-5 text-gray-300">
                        {about || "Tell us something about yourself..."}
                    </p>

                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-5">

                        <p className="mb-2 text-xs font-semibold text-gray-400">
                            Skills
                        </p>

                        <div className="flex flex-wrap gap-1.5">

                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="
                                        rounded-full
                                        border
                                        border-primary/30
                                        bg-primary/10
                                        px-2.5
                                        py-1
                                        text-xs
                                        text-primary
                                    "
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>
                    </div>
                )}

                {/* Buttons */}
                {showActions && (
                    <div className="flex gap-2">

                        <button
                            type="button"
                            className="
                                btn
                                btn-sm
                                flex-1
                                rounded-lg
                                border-red-500/40
                                bg-transparent
                                text-red-400
                                hover:bg-red-500
                                hover:text-white
                            "
                        >
                            Ignore
                        </button>

                        <button
                            type="button"
                            className="
                                btn
                                btn-sm
                                flex-1
                                rounded-lg
                                btn-primary
                            "
                        >
                            Interested
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default UserCard;

// import React from "react";

// const UserCard = ({ user }) => {
//   const {
//     firstName,
//     lastName,
//     photoUrl,
//     age,
//     gender,
//     about,
//     skills = [],
//   } = user || {};

//   const defaultPhoto =
//     gender?.toLowerCase() === "female"
//       ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
//       : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     <div
//       className="
//         w-[310px]
//         overflow-hidden
//         rounded-2xl
//         border border-white/10
//         bg-[#1d232e]
//         shadow-xl
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:shadow-2xl
//       "
//     >
//       {/* Image */}
//       <div className="relative h-[300px] w-full">
//         <img
//           src={photoUrl || defaultPhoto}
//           alt={`${firstName || "User"} profile`}
//           className="h-full w-full object-cover"
//           onError={(e) => {
//             e.currentTarget.src = defaultPhoto;
//           }}
//         />

//         {/* Image Gradient */}
//         <div
//           className="
//             absolute
//             inset-0
//             bg-gradient-to-t
//             from-black/80
//             via-transparent
//             to-transparent
//           "
//         />

//         {/* Active */}
//         <div className="absolute right-3 top-3">
//           <span
//             className="
//               flex
//               items-center
//               gap-1.5
//               rounded-full
//               bg-black/60
//               px-2.5
//               py-1
//               text-xs
//               text-white
//               backdrop-blur-sm
//             "
//           >
//             <span className="h-2 w-2 rounded-full bg-green-400" />
//             Active
//           </span>
//         </div>

//         {/* Name */}
//         <div className="absolute bottom-4 left-4">
//           <h2 className="text-xl font-bold text-white">
//             {firstName || "First Name"} {lastName || "Last Name"}

//             {age && (
//               <span className="ml-1.5 font-normal text-gray-300">
//                 {age}
//               </span>
//             )}
//           </h2>

//           {gender && (
//             <p className="mt-0.5 text-xs capitalize text-gray-300">
//               {gender}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="p-4">
//         {/* About */}
//         <div className="mb-4">
//           <p className="mb-1.5 text-xs font-semibold text-gray-400">
//             About
//           </p>

//           <p className="line-clamp-2 text-sm leading-5 text-gray-300">
//             {about || "Tell us something about yourself..."}
//           </p>
//         </div>

//         {/* Skills */}
//         {skills.length > 0 && (
//           <div className="mb-5">
//             <p className="mb-2 text-xs font-semibold text-gray-400">
//               Skills
//             </p>

//             <div className="flex flex-wrap gap-1.5">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="
//                     rounded-full
//                     border
//                     border-primary/30
//                     bg-primary/10
//                     px-2.5
//                     py-1
//                     text-xs
//                     text-primary
//                   "
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <button
//             type="button"
//             className="
//               btn
//               btn-sm
//               flex-1
//               rounded-lg
//               border-red-500/40
//               bg-transparent
//               text-red-400
//               hover:bg-red-500
//               hover:text-white
//             "
//           >
//             Ignore
//           </button>

//           <button
//             type="button"
//             className="
//               btn
//               btn-sm
//               flex-1
//               rounded-lg
//               btn-primary
//             "
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// import React from "react";

// const UserCard = ({ user }) => {
//     const {
//         firstName,
//         lastName,
//         photoUrl,
//         age,
//         gender,
//         about,
//         skills
//     } = user;

//     return (
//         <div
//             className="
//                 w-[310px]
//                 overflow-hidden
//                 rounded-2xl
//                 bg-[#1d232e]
//                 border border-white/10
//                 shadow-xl
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//                 hover:shadow-2xl
//             "
//         >

//             {/* Image */}
//             <div className="relative h-[300px] w-full">

//                 <img
//                     src={
//                         photoUrl ||
//                         (
//                             gender?.toLowerCase() === "female"
//                                 ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
//                                 : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                         )
//                     }
//                     alt={`${firstName} profile`}
//                     className="
//                         h-full
//                         w-full
//                         object-cover
//                     "
//                 />

//                 {/* Image gradient */}
//                 <div
//                     className="
//                         absolute
//                         inset-0
//                         bg-gradient-to-t
//                         from-black/80
//                         via-transparent
//                         to-transparent
//                     "
//                 />

//                 {/* Active */}
//                 <div className="absolute right-3 top-3">
//                     <span
//                         className="
//                             flex
//                             items-center
//                             gap-1.5
//                             rounded-full
//                             bg-black/60
//                             px-2.5
//                             py-1
//                             text-xs
//                             text-white
//                             backdrop-blur-sm
//                         "
//                     >
//                         <span className="h-2 w-2 rounded-full bg-green-400" />
//                         Active
//                     </span>
//                 </div>

//                 {/* Name */}
//                 <div className="absolute bottom-4 left-4">

//                     <h2 className="text-xl font-bold text-white">
//                         {firstName} {lastName}

//                         {age && (
//                             <span className="ml-1.5 font-normal text-gray-300">
//                                 {age}
//                             </span>
//                         )}
//                     </h2>

//                     {gender && (
//                         <p className="mt-0.5 text-xs capitalize text-gray-300">
//                             {gender}
//                         </p>
//                     )}

//                 </div>

//             </div>


//             {/* Card Content */}
//             <div className="p-4">

//                 {/* About */}
//                 {about && (
//                     <div className="mb-4">

//                         <p className="mb-1.5 text-xs font-semibold text-gray-400">
//                             About
//                         </p>

//                         <p className="line-clamp-2 text-sm leading-5 text-gray-300">
//                             {about}
//                         </p>

//                     </div>
//                 )}


//                 {/* Skills */}
//                 {skills && skills.length > 0 && (
//                     <div className="mb-5">

//                         <p className="mb-2 text-xs font-semibold text-gray-400">
//                             Skills
//                         </p>

//                         <div className="flex flex-wrap gap-1.5">

//                             {skills.map((skill, index) => (
//                                 <span
//                                     key={index}
//                                     className="
//                                         rounded-full
//                                         border
//                                         border-primary/30
//                                         bg-primary/10
//                                         px-2.5
//                                         py-1
//                                         text-xs
//                                         text-primary
//                                     "
//                                 >
//                                     {skill}
//                                 </span>
//                             ))}

//                         </div>

//                     </div>
//                 )}


//                 {/* Buttons */}
//                 <div className="flex gap-2">

//                     <button
//                         className="
//                             btn
//                             btn-sm
//                             flex-1
//                             rounded-lg
//                             border-red-500/40
//                             bg-transparent
//                             text-red-400
//                             hover:bg-red-500
//                             hover:text-white
//                         "
//                     >
//                         Ignore
//                     </button>

//                     <button
//                         className="
//                             btn
//                             btn-sm
//                             flex-1
//                             rounded-lg
//                             btn-primary
//                         "
//                     >
//                         Interested
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// };

// export default UserCard;