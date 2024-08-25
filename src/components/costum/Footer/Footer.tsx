import React from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const featuredAreas = [
    "Tel Aviv-Jaffa area",
    "Jerusalem area",
    "Haifa area",
    "Center",
    "North",
    "South",
  ];

  const contactItems = [
    "To Tabit Site",
    "Career",
    "Privacy Policy",
    "Terms of Service",
    "Accessibility Statement",
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      icon: <Facebook size={20} />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      icon: <Instagram size={20} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      icon: <Linkedin size={20} />,
    },
  ];

  return (
    <footer className=" text-black ">
      <div className="container mx-auto bg-footerBg">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-extrabold mb-2">Featured areas</h3>
            <ul>
              {featuredAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-extrabold mb-2">Contact</h3>
            <ul>
              {contactItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-extrabold mb-2">Join Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                >
                  <span className="sr-only">{social.name}</span>
                  <span className="text-footerBg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center md:text-left">
            <img
              src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
              alt="Tabit"
              className="w-56 md:w-20 mx-auto "
            />
          </div>
        </div>
      </div>

      <div className="container  py-10 bg-black text-sm">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            <span className="text-gray-500">v4.11.1</span>
            <span className="text-white">|</span>
            <span className="text-white">
              Copyright @ 2024 Final project Team - IITC college
            </span>
          </div>
          <div className="text-gray-500">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply. (clone)
          </div>
        </div>
      </div>

      <div title="spacer" className="bg-black max-h-80 min-h-20"></div>
    </footer>
  );
};

export default Footer;
