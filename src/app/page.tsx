"use client";

import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import Background from "@/components/Background";
import { chipInterface, linksInterface, projectsInterface } from "@/types";
import Home from "@/components/Home";

const emptyData: projectsInterface = {
  id: Infinity,
  title: "",
  description: "",
  time: "",
  mainLink: "",
  chips: [],
  links: [],
}

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ links: linksInterface[], projects: projectsInterface[], techStack: chipInterface[] }>({ links: [], projects: [], techStack: [] });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('/api/user');
      const json = await response.json();
      setLoading(false);
      setData(json)
    }
    fetchData();
  }, [])

  return (
    <div className="relative">
      <Background id="bg" />
      {
        loading ? (
          <div className="h-screen w-screen flex items-center justify-center backdrop-blur">
            <Loading />
          </div>
        ) : (
          <Home data={data} />
        )
      }
    </div >
  );
}

export default Main;