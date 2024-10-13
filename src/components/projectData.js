import { FaNodeJs, FaReact, FaPython } from 'react-icons/fa';
import { SiMysql, SiTypescript, SiExpress, SiDocker } from 'react-icons/si';

const projectData = [
  {
    id: 1,
    technologies: [
      { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
      { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> }
    ]
  },
  {
    id: 2,
    technologies: [
      { name: 'Python', icon: <FaPython color="#3776AB" /> },
      { name: 'Shell', icon: <SiDocker color="#2496ED" /> } // Pode mudar esse ícone se quiser algo mais específico
    ]
  },
  {
    id: 3,
    technologies: [
      { name: 'React', icon: <FaReact color="#61DAFB" /> },
      { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
      { name: 'Express', icon: <SiExpress color="#000000" /> },
      { name: 'MySQL', icon: <SiMysql color="#4479A1" /> }
    ]
  }
];

export default projectData;
