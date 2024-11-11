import { FaNodeJs, FaReact, FaJs } from 'react-icons/fa';
import { SiMysql, SiTypescript, SiExpress, SiDocker, SiLinux } from 'react-icons/si';

const projectData = [
  {
    id: 1,
    githubLink: "https://github.com/sidneyjfg/monitoramento_automatico_plugg",
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
      { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> }
    ]
  },
  {
    id: 2,
    githubLink: "https://github.com/sidneyjfg/monitoramento_automatico_fulfillment",
    technologies: [
      { name: 'JavaScript', icon: <FaJs color="#3776AB" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'Shell', icon: <SiDocker color="#2496ED" /> },
      { name: 'Linux', icon: <SiLinux color="#FCC624" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> }
    ]
  },
  {
    id: 3,
    githubLink: "https://github.com/sidneyjfg/saas-pdv",
    technologies: [
      { name: 'React', icon: <FaReact color="#61DAFB" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'Express', icon: <SiExpress color="#000000" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> }
    ]
  },
  {
    id: 4,
    technologies: [
      { name: 'React', icon: <FaReact color="#61DAFB" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'Express', icon: <SiExpress color="#000000" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> }
    ]
  }
];

export default projectData;
