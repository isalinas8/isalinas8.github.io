import { Project } from '../../types';
import tomtomHackathonImg from '../../assets/images/professional-profile/tomtom-wth.jpg';
import tomtomNavSdkImg from '../../assets/images/professional-profile/map-display-premium.jpg';
import plenoptikaQuickSeeImg from '../../assets/images/professional-profile/plenoptika-quicksee.jpg';
import cajamarAgroImg from '../../assets/images/professional-profile/cajamar-agroanalysis.jpg';
import mechanicalArmImg from '../../assets/images/professional-profile/mechanical-arm.jpg';
import smartHomeImg from '../../assets/images/professional-profile/smart-home.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'proj-tomtom-hackathon',
    title: 'TomTom Hackathon: Proactive Route Recommendation',
    tagline: 'ML traffic simulation and dynamic bottleneck alleviation',
    description: 'Award-winning project (4th place out of global teams in TomTom\'s "What the Hack" 2025). Simulated dynamic urban traffic congestion scenarios using the UxSIM network simulation library in Python and trained machine learning models (XGBoost) to evaluate proactive rerouting strategies.',
    category: 'Machine Learning',
    imageUrl: tomtomHackathonImg,
    technologies: ['Python', 'XGBoost', 'UxSIM', 'Traffic Modeling', 'Machine Learning', 'NumPy'],
    metrics: 'Measurable reduction in bottleneck onset time and congestion severity vs. default routing',
    featured: true
  },
  {
    id: 'proj-smart-home',
    title: 'My Smart Home + Virtual Assistant Ecosystem',
    tagline: 'Autonomous Python domotics & voice control integration',
    description: 'Custom-engineered domotics and IoT architecture for a single-family house built with Python, Raspberry Pi, Home Assistant and Docker. Integrated bidirectional voice control and automation flows with Google Home and Amazon Alexa.',
    category: 'Full-Stack',
    imageUrl: smartHomeImg,
    technologies: ['Python', 'Raspberry Pi', 'Home Assistant', 'Docker', 'IoT', 'MQTT', 'Google Home API'],
    metrics: '100% locally automated home IoT infrastructure with voice assistant control',
    demoUrl: 'https://www.youtube.com/watch?v=VPAsRPc9y_w',
    featured: true
  },
  {
    id: 'proj-tomtom-sdk',
    title: 'TomTom Navigation SDK Android & Example App',
    tagline: 'Enterprise Android navigation architecture & Agentic testing',
    description: 'Architected the developer entry point, documentation and official open-source Jetpack Compose example app for TomTom Navigation SDK. Pioneered agentic LLM workflows that automatically test and compile apps from scratch to guarantee documentation completeness.',
    category: 'Full-Stack',
    imageUrl: tomtomNavSdkImg,
    technologies: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Agentic AI', 'CI/CD Pipelines', 'Gradle'],
    metrics: 'Official production SDK used by global automotive & enterprise customers',
    githubUrl: 'https://github.com/tomtom-international/tomtom-example-app',
    demoUrl: 'https://docs.tomtom.com/navigation/android/introduction/introduction',
    demoLabel: 'Official documentation',
    featured: true
  },
  {
    id: 'proj-plenoptika-ml',
    title: 'Plenoptika Eye Care ML Prescription Engine',
    tagline: 'Cloud-native ML platform for automated eyeglass prescriptions',
    description: 'Engineered an end-to-end machine learning platform on AWS to address the global shortage of eye care professionals. Integrated microservices, data processing pipelines and REST APIs for automated vision diagnosis.',
    category: 'Machine Learning',
    imageUrl: plenoptikaQuickSeeImg,
    technologies: ['Python', 'AWS Lambda', 'AWS RDS', 'CloudFormation', 'Postman', 'Swagger', 'Docker'],
    metrics: 'Scalable cloud serverless architecture deployed on AWS',
    featured: false
  },
  {
    id: 'proj-cajamar-agro',
    title: 'Challenge Cajamar Agro Market Analysis',
    tagline: 'Predictive data analytics for pandemic agricultural markets',
    description: 'Data analytics project analyzing supply chain dynamics, consumer purchasing patterns and economic indices in the Spanish agri-food sector during the pandemic. Built with Python, Pandas and interactive web visualizers.',
    category: 'Data Engineering',
    imageUrl: cajamarAgroImg,
    technologies: ['Python', 'Pandas', 'NumPy', 'HTML/CSS', 'Data Visualization', 'Matplotlib'],
    metrics: 'Finalist (5th Place) in Spain\'s largest data analytics datathon',
    featured: false
  },
  {
    id: 'proj-mechanical-arm',
    title: 'Mechanical Robotic Arm Controller',
    tagline: 'Embedded kinematics and servo control automation',
    description: 'Custom multi-axis robotic arm with low-level kinematics controller software written in C++ and Python, executing precision pick-and-place movements running on Raspberry Pi.',
    category: 'Robotics',
    imageUrl: mechanicalArmImg,
    technologies: ['C++', 'Python', 'Raspberry Pi', 'Robotics', 'Servo Kinematics', 'Embedded Linux'],
    metrics: 'Real-time multi-axis servo manipulation and position coordination',
    demoUrl: 'https://www.youtube.com/watch?v=IPepT4i-dv4',
    featured: false
  }
];
