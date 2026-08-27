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
        // Don't call API if feed is already loaded
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

            // Backend returns:
            // { message: "...", data: [...] }

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

    if (!feed) {
        return (
            <div className="flex justify-center my-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};

export default Feed;