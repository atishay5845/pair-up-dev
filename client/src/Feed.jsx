import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed.feed);
    const dispatch = useDispatch();

    console.log("Feed:", feed);

    const getFeed = async () => {
        if (feed) {
            return;
        }

        try {
            const res = await axios.get(
                BASE_URL + "/feed",
                {
                    withCredentials: true
                }
            );

            console.log("API Response:", res.data);

            dispatch(addFeed(res.data.data));

        } catch (error) {
            console.log(
                "Error fetching feed:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    // Loading
    if (!feed) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#11151c]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // No users
    if (feed.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#11151c]">
                <h2 className="text-2xl font-bold text-white">
                    No developers available
                </h2>
            </div>
        );
    }

    // Users available
    return (
        <div className="min-h-screen bg-[#11151c] px-4 py-10">

            <h1 className="mb-10 text-center text-4xl font-bold text-white">
                Discover Developers
            </h1>

            <div className="flex flex-wrap justify-center gap-8">

                {feed.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                    />
                ))}

            </div>

        </div>
    );
};

export default Feed;