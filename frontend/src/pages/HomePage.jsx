import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error)
        if(error.response?.status==429){
            setIsRateLimited(true);
        }
        else{
            toast.error("Failed to load notes")
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotes(); // <-- Call the function here
  }, []); // <-- Add dependency array
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 py-8">

      </div>
    </div>
  );
};

export default HomePage;
