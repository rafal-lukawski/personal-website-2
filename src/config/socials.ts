import { createElement } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { IconBaseProps, IconType } from "react-icons";

const UsemeIcon: IconType = (props: IconBaseProps) =>
  createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      ...props,
    },
    createElement("path", {
      d: "M6.2 4.2h3.4v9.2c0 1.5 1 2.5 2.4 2.5s2.4-1 2.4-2.5V4.2h3.4v9.5c0 3.5-2.6 6.1-5.8 6.1s-5.8-2.6-5.8-6.1V4.2z",
    }),
  );

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
    name: "Useme",
    url: "https://useme.com/pl/roles/contractor/lukawski-eu-rafal-lukawski,602686/",
    icon: UsemeIcon,
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
