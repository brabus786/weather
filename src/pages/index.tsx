"use client";

import HomeTemplate from "@/Templates/HomeTemplate";

const tasks = [
  {
    title: "Weather",
    description: "Test task/React (USENSE Company)",
    finishedAt: "2024-10-29",
    url: "/weather",
  },
  {
    title: "Star Wars",
    description: "Test task/React (STARNAVI)",
    finishedAt: "2024-11-08",
    url: "/star-wars",
  },
];

const Home = () => {
  return <HomeTemplate tasks={tasks} />;
};

export default Home;
