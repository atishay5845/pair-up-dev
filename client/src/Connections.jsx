
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "./utils/constants";
import { addConnections } from "./utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(!connections);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${BASE_URL}/user/connections`,
        {
          withCredentials: true,
        }
      );

      // Inspect the actual response from your backend
      console.log("Full API response:", response.data);
      console.log("First connected user:", response.data.data?.[0]);

      const users = response.data.data;

      if (!Array.isArray(users)) {
        throw new Error("Invalid connections data received from server.");
      }

      // Remove duplicate users using their user IDs
      const uniqueConnections = [
        ...new Map(
          users
            .filter((user) => user && user._id)
            .map((user) => [String(user._id), user])
        ).values(),
      ];

      console.log("Processed connections:", uniqueConnections);

      dispatch(addConnections(uniqueConnections));
    } catch (err) {
      console.error(
        "Error fetching connections:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to load your connections. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11151c]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#11151c] px-4">
        <h2 className="text-2xl font-bold text-white">
          Could not load connections
        </h2>

        <p className="mt-3 text-center text-red-400">{error}</p>

        <button
          type="button"
          onClick={fetchConnections}
          className="btn mt-5 bg-blue-600 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No connections
  if (!connections || connections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#11151c] px-4">
        <div className="mb-4 text-6xl">🤝</div>

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
      {/* Header */}
      <div className="mx-auto mb-12 max-w-6xl text-center">
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

      {/* Responsive Connections Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills = [],
          } = connection;

          const defaultPhoto =
            gender?.toLowerCase() === "female"
              ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

          return (
            <div
              key={_id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#1d232e] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
            >
              {/* Profile Image */}
              <div className="relative h-64 w-full">
                <img
                  src={photoUrl || defaultPhoto}
                  alt={`${firstName || "User"} profile`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = defaultPhoto;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Connection Badge */}
                <div className="absolute right-3 top-3">
                  <span className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Connected
                  </span>
                </div>

                {/* Name and Details */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white">
                    {[firstName, lastName].filter(Boolean).join(" ") ||
                      "Name not available"}
                  </h2>

                  {(age != null || gender) && (
                    <p className="mt-1 text-sm capitalize text-gray-300">
                      {age != null && `${age} years old`}
                      {age != null && gender && " • "}
                      {gender || ""}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  About
                </p>

                <p className="min-h-[60px] line-clamp-3 text-sm leading-5 text-gray-300">
                  {about || "No information available."}
                </p>

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Skills
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="my-4 border-t border-white/10" />

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
