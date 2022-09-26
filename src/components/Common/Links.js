import {
  FaRegComments,
  FaChalkboardTeacher,
  FaPhone,
  FaBook,
} from "react-icons/fa";
import { RiCheckboxBlankFill, RiGroupFill } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";

export const sidebardata = [
  {
    Icon: <FaRegComments size="20px" style={{ marginRight: "15px" }} />,
    text: "All discussions",
    link: "/AllDiscussions",
  },
  {
    Icon: <FaRegComments size="20px" style={{ marginRight: "15px" }} />,
    text: "General",
    link: "/general",
  },
  {
    Icon: <FaChalkboardTeacher size="20px" style={{ marginRight: "15px" }} />,
    text: "Proposal",
    link: "/proposal",
  },
  {
    Icon: <FaPhone size="19px" style={{ marginRight: "16px" }} />,
    text: "Support",
    link: "/support",
  },
  {
    Icon: <FaBook size="19px" style={{ marginRight: "16px" }} />,
    text: "Knowledge base",
    link: "/Knowledgebase",
  },
  {
    Icon: <RiGroupFill size="26px" style={{ marginRight: "15px" }} />,
    text: "Community Development",
    link: "/community",
  },
  {
    Icon: <CgNotes size="20px" style={{ marginRight: "15px" }} />,
    text: "Feed",
    link: "/feedback",
  },
  {
    Icon: <RiCheckboxBlankFill size="20px" style={{ marginRight: "15px" }} />,
    text: "Project Proposal",
    link: "/projectpropsal",
  },
];
