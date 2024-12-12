import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import CreatePost from "./CreatePost";
import Posts from "../../components/common/Posts";

const HomePage = () => {
    const [feedType, setFeedType] = useState("Posts");

    return (
        <>
            <Navbar />
            <div> {/* Added container for centering */}
                <div> 
                    {/*  CREATE POST INPUT */}
                    <CreatePost />

                    {/* POSTS */}
                    <Posts />
                </div>
            </div>
        </>
    );
};

export default HomePage;