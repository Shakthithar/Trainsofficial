import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Users, Calendar } from 'lucide-react';
import AnimatedHeading from '../components/AnimatedHeading';

type ProjectCategory = 'all' | 'web' | 'mobile' | 'ai' | 'iot';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filterProjects = (category: ProjectCategory) => {
    setActiveCategory(category);
  };

  const openProject = (id: number) => {
    setSelectedProject(id);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen">
      {/* Projects Hero */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedHeading
              text="Student Projects"
              className="text-4xl md:text-5xl font-bold mb-6"
              delay={0.2}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-300"
            >
              Showcasing innovative solutions built by our talented students
            </motion.p>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-8 bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <CategoryButton 
              active={activeCategory === 'all'} 
              onClick={() => filterProjects('all')}
              label="All Projects"
            />
            <CategoryButton 
              active={activeCategory === 'web'} 
              onClick={() => filterProjects('web')}
              label="Web Applications"
            />
            <CategoryButton 
              active={activeCategory === 'mobile'} 
              onClick={() => filterProjects('mobile')}
              label="Mobile Apps"
            />
            <CategoryButton 
              active={activeCategory === 'ai'} 
              onClick={() => filterProjects('ai')}
              label="AI & ML"
            />
            <CategoryButton 
              active={activeCategory === 'iot'} 
              onClick={() => filterProjects('iot')}
              label="IoT & Embedded"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter(project => activeCategory === 'all' || project.category === activeCategory)
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => openProject(project.id)}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject && (
                <ProjectModal
                  project={projects.find(p => p.id === selectedProject)!}
                  onClose={closeProject}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CategoryButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ active, onClick, label }) => (
  <motion.button
    onClick={onClick}
    className={`px-5 py-2 rounded-full ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
    } transition-colors duration-200`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center text-blue-400">
          <Code size={48} />
        </div>
        
        <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1 rounded-full text-xs font-medium text-white">
          {project.category === 'web' ? 'Web App' : 
           project.category === 'mobile' ? 'Mobile App' : 
           project.category === 'ai' ? 'AI/ML' : 'IoT/Embedded'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <Users size={16} />
            <span>{project.teamSize} members</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar size={16} />
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-white">{project.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg mb-6 flex items-center justify-center text-blue-400">
        <Code size={64} />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Project Overview</h3>
        <p className="text-gray-300">{project.description}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-sm text-blue-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-300 mb-1">Team Size</h4>
          <p className="text-lg font-semibold text-white flex items-center gap-2">
            <Users size={18} className="text-blue-400" />
            {project.teamSize} Students
          </p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-300 mb-1">Year</h4>
          <p className="text-lg font-semibold text-white flex items-center gap-2">
            <Calendar size={18} className="text-blue-400" />
            {project.year}
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">Key Features</h3>
        <ul className="space-y-2">
          {project.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400 font-bold mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors duration-200"
        >
          Visit Project
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
};

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  teamSize: number;
  year: string;
  features: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "EduConnect Platform",
    shortDescription: "A comprehensive learning management system for schools and educators.",
    description: "EduConnect is a full-featured learning management system designed to bridge the gap between teachers, students, and parents. It provides tools for course management, assignment tracking, grading, and communication, all within a user-friendly interface.",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    teamSize: 5,
    year: "2024",
    features: [
      "Real-time virtual classroom with video conferencing",
      "Automated assignment grading system",
      "Interactive learning resources and quizzes",
      "Comprehensive analytics for student performance",
      "Dedicated portals for teachers, students, and parents"
    ],
    link: "https://educonnect.example.com"
  },
  {
    id: 2,
    title: "MediTrack Mobile App",
    shortDescription: "A mobile application for medication tracking and health monitoring.",
    description: "MediTrack helps users manage their medications, track health metrics, and receive timely reminders. The app includes features like medication scheduling, dosage tracking, symptom recording, and integration with healthcare providers.",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Google Cloud", "HealthKit API"],
    teamSize: 4,
    year: "2024",
    features: [
      "Personalized medication reminders and schedules",
      "Health metrics tracking (blood pressure, glucose, etc.)",
      "Prescription management and refill notifications",
      "Secure sharing of health data with healthcare providers",
      "Comprehensive health reports and analytics"
    ],
    link: "https://meditrack.example.com"
  },
  {
    id: 3,
    title: "AgroSmart AI",
    shortDescription: "An AI-powered system for precision agriculture and crop monitoring.",
    description: "AgroSmart AI uses machine learning algorithms to analyze soil conditions, weather patterns, and crop health to provide farmers with actionable insights. The system helps optimize irrigation, fertilization, and pest control to maximize crop yield while minimizing resource usage.",
    category: "ai",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React"],
    teamSize: 6,
    year: "2023",
    features: [
      "Real-time crop health monitoring using computer vision",
      "Predictive analytics for yield estimation",
      "Smart irrigation recommendations based on soil moisture and weather forecasts",
      "Pest and disease detection using image recognition",
      "Farm management dashboard with actionable insights"
    ]
  },
  {
    id: 4,
    title: "SmartHome Hub",
    shortDescription: "An IoT platform for home automation and energy management.",
    description: "SmartHome Hub integrates various IoT devices to create a centralized home automation system. It allows users to control lights, appliances, security systems, and monitor energy usage from a single interface, enhancing convenience and energy efficiency.",
    category: "iot",
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "React", "Node.js"],
    teamSize: 5,
    year: "2023",
    features: [
      "Voice-controlled home automation",
      "Energy usage monitoring and optimization",
      "Integrated security system with camera feeds",
      "Custom automation routines and schedules",
      "Remote access and control via mobile app"
    ]
  },
  {
    id: 5,
    title: "TravelBuddy",
    shortDescription: "A comprehensive travel planning and management web application.",
    description: "TravelBuddy helps users plan and organize their trips, from itinerary creation to expense tracking. It includes features for finding accommodation, local attractions, and restaurants, as well as sharing travel plans with friends and family.",
    category: "web",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Google Maps API"],
    teamSize: 4,
    year: "2023",
    features: [
      "AI-powered travel recommendations based on preferences",
      "Interactive itinerary builder with map integration",
      "Budget management and expense tracking",
      "Weather forecasting for destinations",
      "Travel document storage and organization"
    ],
    link: "https://travelbuddy.example.com"
  },
  {
    id: 6,
    title: "HealthBot Assistant",
    shortDescription: "An AI-powered chatbot for health consultations and wellness advice.",
    description: "HealthBot uses natural language processing to provide users with personalized health information, wellness tips, and preliminary symptom assessment. It helps users make informed health decisions and connects them with healthcare providers when necessary.",
    category: "ai",
    technologies: ["Python", "NLTK", "TensorFlow", "React Native", "Firebase"],
    teamSize: 3,
    year: "2022",
    features: [
      "Natural language understanding for health queries",
      "Personalized wellness recommendations",
      "Symptom checker with preliminary assessments",
      "Medication reminders and tracking",
      "Integration with telemedicine services"
    ],
    link: "https://healthbot.example.com"
  }
];

export default Projects;