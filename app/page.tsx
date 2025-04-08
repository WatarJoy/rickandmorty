import React from "react";
import { FaReact } from "react-icons/fa6";
import {
  SiRedux,
  SiNextdotjs,
  SiTailwindcss,
  SiAxios,
  Si9Gag,
} from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 px-16 desktop:gap-48  desktop:px-32 desktop:pt-24 w-full text-white">
      <h2 className=" text-4xl desktop:text-6xl font-extrabold">
        This is Rick and Morty API
      </h2>
      <div className="flex flex-col gap-24">
        <p className="text-xl leading-8">
          This project leverages the popular
          <span className="font-bold"> Rick and Morty API </span> to provide an
          engaging interface for exploring characters, episodes, and locations.
          <br />
          Built with modern technologies to ensure performance, scalability, and
          a smooth user experience.
        </p>

        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-32">Technologies Used</h3>
          <div className="flex flex-col flex-wrap gap-24">
            <div className="flex items-center gap-12">
              <SiNextdotjs className="text-4xl text-red" />
              <span className="text-lg">
                Next.js: A React framework for server-side rendering and static
                site generation.
              </span>
            </div>
            <div className="flex items-center gap-12">
              <FaReact className="text-4xl text-red" />
              <span className="text-lg">
                React: A library for building user interfaces.
              </span>
            </div>
            <div className="flex items-center gap-12 ">
              <SiRedux className="text-4xl text-red" />
              <span className="text-lg">
                Redux: For state management and maintaining app consistency.
              </span>
            </div>
            <div className="flex items-center gap-12">
              <SiTailwindcss className="text-4xl text-red" />
              <span className="text-lg">
                Tailwind CSS: Utility-first CSS framework for styling.
              </span>
            </div>
            <div className="flex items-center gap-12 ">
              <SiAxios className="text-4xl text-red" />
              <span className="text-lg">
                Axios: For making HTTP requests to fetch data from the API.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Si9Gag className="text-4xl text-red" />
              <span className="text-lg">
                Material UI: For pre-styled React components and UI design.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
