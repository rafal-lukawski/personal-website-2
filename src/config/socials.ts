import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rafal-lukawski/",
    icon: FaLinkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/rlukawski",
    icon: FaGithub,
  },
  {
    name: "Email",
    url: "mailto:rafal@lukawski.eu",
    icon: FaEnvelope,
  },
  // {
  //   name: "+48 570 116 416",
  //   url: "tel:+48570116416",
  //   icon: FaPhone,
  // },
];
