import React from "react";

const Feed = () => {
    const getFeed = async () => {
        try {
            const response = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Feed</h1>
        </div>
    )
}

export default Feed