
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "./utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${BASE_URL}/user/requests/received`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || `Request failed: ${res.status}`
        );
      }

      console.log("Received requests:", data);

      // Adjust this path if your backend returns a different structure.
      dispatch(addRequest(data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11151c]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#11151c] px-4">
        <p className="text-center text-red-400">{error}</p>

        <button
          onClick={fetchRequests}
          className="btn bg-blue-600 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11151c] px-4 py-10 text-white">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Connection Requests
      </h1>

      {!requests || requests.length === 0 ? (
        <p className="text-center text-gray-400">
          No pending requests.
        </p>
      ) : (
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#1d232e] p-4"
            >
              <img
                src={
                  request.fromUserId?.photoUrl ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold">
                  {request.fromUserId?.firstName}{" "}
                  {request.fromUserId?.lastName}
                </h2>

                <p className="text-sm text-gray-400">
                  {request.fromUserId?.about ||
                    "No profile description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
