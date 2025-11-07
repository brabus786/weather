'use client';

import HomeTemplate from "@/Templates/HomeTemplate";

const tasks = [
  {
    title: "Weather",
    description: "Check the current weather in your city",
    finishedAt: "2024-06-01",
    url: "/weather"
  },
  {
    title: "Star Wars",
    description: "Explore the Star Wars universe",
    finishedAt: "2024-06-15",
    url: "/star-wars"
  }
];

const Home = () => {
  return (
    <HomeTemplate tasks={tasks} />
  );
}

export default Home;
