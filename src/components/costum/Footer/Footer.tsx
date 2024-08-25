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
    <footer className="bg-footerBg text-black px-4 py-8 md:px-8">
      <div className="container mx-auto">
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
    </footer>
  );
};

export default Footer;
