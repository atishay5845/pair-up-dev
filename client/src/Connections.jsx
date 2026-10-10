
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { addConnections } from "./utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/user/connections",
        {
          withCredentials: true,
        }
      );

      const uniqueConnections = [
        ...new Map(
          response.data.data.map((connection) => [connection._id, connection])
        ).values(),
      ];

      console.log("Connections:", uniqueConnections);
      dispatch(addConnections(uniqueConnections));
    } catch (error) {
      console.log(
        "Error fetching connections:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading
  if (!connections) {
    return (
      <div className="min-h-screen bg-[#11151c] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No connections
  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-[#11151c] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🤝</div>

        <h1 className="text-2xl font-bold text-white">
          No Connections Yet
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Start discovering developers and build your network.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11151c] px-4 py-10">

      {/* Page Header */}
      <div className="mx-auto max-w-6xl text-center mb-12">
        <h1 className="text-4xl font-bold text-white">
          Your Connections
        </h1>

        <p className="mt-3 text-gray-400">
          Developers you have connected with
        </p>

        <div className="mt-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          {connections.length}{" "}
          {connections.length === 1 ? "Connection" : "Connections"}
        </div>
      </div>

      {/* Connections Grid */}
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          grid-cols-1
          gap-7
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = connection;

          const defaultPhoto =
            gender?.toLowerCase() === "female"
              ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

          return (
            <div
              key={_id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#1d232e]
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-primary/30
                hover:shadow-2xl
              "
            >

              {/* Profile Image */}
              <div className="relative h-64 w-full">

                <img
                  src={photoUrl || defaultPhoto}
                  alt={`${firstName || "User"} profile`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = defaultPhoto;
                  }}
                />

                {/* Gradient */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                  "
                />

                {/* Active Badge */}
                <div className="absolute right-3 top-3">
                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-black/60
                      px-3
                      py-1.5
                      text-xs
                      text-white
                      backdrop-blur-md
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    Connected
                  </span>
                </div>

                {/* Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white">
                    {firstName} {lastName}
                  </h2>

                  <p className="mt-1 text-sm capitalize text-gray-300">
                    {age} years old
                    {gender && ` • ${gender}`}
                  </p>
                </div>

              </div>

              {/* Card Body */}
              <div className="p-5">

                {/* About */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    About
                  </p>

                  <p className="line-clamp-3 min-h-[60px] text-sm leading-5 text-gray-300">
                    {about || "No information available."}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-white/10"></div>

                {/* Connection Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Status
                  </span>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    Connected
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
