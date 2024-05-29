import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import "./FAQ.css";
import { useState } from "react";
import Accordian from "./Accordian.jsx";

function FAQ() {
  const datas = [
    {
      title: "What is Synkerr?",
      ans: "Synkerr is a social networking platform dedicated to connecting individuals with similar interests and goals. It's place where people can forge meaningful connections, join in personalized community, form teams, and engage in various hyperlocal events⚡",
    },
    {
      title: "How does Synkerr work?",
      ans: "Synkerr works by allowing users to create profiles, search for other users based on shared interests or professional backgrounds, join groups, participate in discussions, and collaborate on projects or initiatives.",
    },
    {
      title: "Who can join Synkerr?",
      ans: "Synkerr is open to professionals, entrepreneurs, freelancers, small businesses, and individuals interested in networking, collaboration, and professional development.",
    },
    {
      title: "What features does Synkerr offer?",
      ans: " Synkerr offers a range of features including profile customization, team building, community creation, messaging, collaboration tools, event listings, and more.",
    },
    {
      title: "Can I use Synkerr for buisness networking?",
      ans: "Yes, Synkerr is an ideal platform for business networking, allowing users to connect with potential clients, partners, investors, and industry peers.",
    },
    {
      title: "Can I join communities on Synkerr?",
      ans: " Yes, Synkerr offers communities on various topics, industries, and interests. You can join existing groups or create your own to connect with like-minded individuals.",
    },
    {
      title: "Can I promote events or initiatives in Synkerr?",
      ans: "Yes, users can promote events, webinars, workshops, or other initiatives on Synkerr by creating event listings and sharing them with their network.",
    },
    {
      title: "Is Synkerr available as a mobile app?",
      ans: "Synkerr is available as a mobile app for both iOS and Android devices, enabling users to access the platform while on the move.",
    },
  ];

  const toggled = useState(null);

  return (
    <div className="bg-black">
      <div className="flex flex-col justify-center items-center  h-max lg:gap-30 sm:gap-10 py-0">
        <div className=" bg-gradient-to-br  from-purple-700 via-black to-purple-500 p-0.5 rounded-3xl ">
          <div className="block w-auto px-16 py-5  rounded-3xl shadow hover:bg-gray-100 bg-gradient-to-br  from-black via-gray-950 to-indigo-950 ">
            <span className=" text-center text-white lg:text-3xl sm:text-2xl font-bold">
              Frequently Asked Questions
            </span>
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="xyz  ">
            <div className="flex flex-wrap justify-center gap-10 py-10">
              {datas.map((data, index) => (
                <Accordian index={index} data={data} toggled={toggled} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;