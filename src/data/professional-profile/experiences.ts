import { Experience } from '../../types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-tomtom',
    role: 'Software Engineer',
    company: 'TomTom',
    location: 'Madrid, Spain',
    period: 'Dec 2024 - Present',
    type: 'Full-time',
    description: 'Architecting developer SDKs, Android navigation architectures and automated agentic testing pipelines for enterprise navigation systems.',
    highlights: [
      'Architected, implemented and published a new entry point and comprehensive public documentation for the TomTom Navigation SDK for Android, significantly reducing integration time, code complexity and developer effort for enterprise customers.',
      'Designed, implemented and validated agentic workflows that automatically implement and build apps from scratch using the SDK to test documentation completeness and accelerate bug detection across both preview and released versions.',
      'Designed and automated CI/CD pipelines for automated testing, maintenance and continuous publishing of the SDK, drastically reducing manual maintenance overhead.',
      'Built and maintain the official open-source TomTom Example App using Kotlin and Jetpack Compose to demonstrate industry best practices for SDK integration.'
    ],
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Agentic AI / LLMs', 'CI/CD', 'GitHub Actions', 'Gradle'],
    links: [
      {
        label: 'TomTom',
        url: 'https://www.tomtom.com/'
      },
      {
        label: 'Maps and Navigation SDK for Android',
        url: 'https://docs.tomtom.com/navigation/android/introduction/introduction'
      },
      {
        label: 'TomTom Example App',
        url: 'https://github.com/tomtom-international/tomtom-example-app'
      },
    ]
  },
  {
    id: 'exp-hpe-architect',
    role: 'Solution Architect - Entitlement Servers',
    company: 'Hewlett Packard Enterprise',
    location: 'Madrid, Spain',
    period: 'Dec 2023 - Dec 2024',
    type: 'Full-time',
    description: 'Led engineering teams delivering high-impact entitlement server platforms, platform monitoring engines and multiplatform device testing suites for major telecom operators.',
    highlights: [
      'Led a team of engineers in delivering a high-impact project for a major telecommunications company.',
      'Created a common, extensible and reusable testing library for all entitlement servers projects simulating iOS and Android device behaviors, reducing the testing phase duration by 80% and minimizing customer dependence.',
      'Developed a comprehensive real-time monitoring system in Python (Pandas, PyPlot), Bash scripts and SMTP servers providing instant platform health, analytics and operational efficiency.'
    ],
    technologies: ['Python', 'Pandas', 'PyPlot', 'Bash', 'Entitlement Servers', 'DHCP', 'Telecommunications', 'SMTP'],
    links: [
      {
        label: 'Hewlett Packard Enterprise',
        url: 'https://www.hpe.com/'
      }
    ]
  },
  {
    id: 'exp-hpe-consultant',
    role: 'Technology Consultant I',
    company: 'Hewlett Packard Enterprise',
    location: 'Madrid, Spain',
    period: 'Oct 2021 - Dec 2023',
    type: 'Full-time',
    description: 'Designed and deployed mission-critical software solutions and automated testing infrastructures for global telecommunication leaders.',
    highlights: [
      'Designed, created and delivered custom software solutions for major telecommunications clients.',
      'Engineered an automated, multi-platform, reusable and extensible Python testing tool, slashing functional verification times from days/weeks to a few minutes (70% to 80% time saved on average).'
    ],
    technologies: ['Python', 'Test Automation', 'Software Architecture', 'Telecommunications', 'Linux', 'Bash'],
    links: [
      {
        label: 'Hewlett Packard Enterprise',
        url: 'https://www.hpe.com/'
      }
    ]
  },
  {
    id: 'exp-plenoptika',
    role: 'Software Engineer and Data Scientist',
    company: 'Plenoptika Europe',
    location: 'Madrid, Spain',
    period: 'May 2021 - July 2022',
    type: 'Full-time',
    description: 'Developed cloud-native machine learning engines and scalable microservices addressing global vision care and eyeglass prescription accessibility.',
    highlights: [
      'Developed a machine learning engine addressing the global shortage of eye care professionals by simplifying and accelerating the eyeglass prescription process.',
      'Engineered full-stack cloud services on AWS (CloudFormation, CodeCommit, CodePipeline, API Gateway, Cognito, Lambda, RDS, S3, EC2) with Python, Jupyter Notebooks and REST/OpenAPI.'
    ],
    technologies: ['Python', 'Machine Learning', 'AWS (Lambda, S3, RDS, EC2, API Gateway)', 'CloudFormation', 'REST API', 'Postman', 'Swagger'],
    links: [
      {
        label: 'Plenoptika',
        url: 'https://plenoptika.com/'
      }
    ]
  },
  {
    id: 'exp-medic',
    role: 'Software Engineer',
    company: 'MEDIC',
    location: 'Madrid, Spain',
    period: 'Sep 2019 - May 2021',
    type: 'Part-time',
    description: 'Engineered hardware-software calibration systems and low-level computer vision modules for visual simulation devices (SimVis).',
    highlights: [
      'Developed a high-precision calibration system for the SimVis visual simulation device using C++ and Qt.',
      'Built software and firmware modules covering Bluetooth communications, image processing pipelines, low-level camera control and physical calibration cradle design.'
    ],
    technologies: ['C++', 'Qt', 'Computer Vision', 'Image Processing', 'Bluetooth', 'Camera Control', 'Hardware Calibration'],
    links: [
      {
        label: 'MEDIC',
        url: 'https://medicuam.com/'
      }
    ]
  },
  {
    id: 'exp-camping',
    role: 'Commercial Department & Customer Service',
    company: 'Camping Valle Enmedio',
    location: 'Peguerinos (Ávila), Spain',
    period: 'Jun - Sept 2017 & 2018',
    type: 'Seasonal',
    description: 'Met customer needs following the highest quality standards of the establishment with an excellent client satisfaction rating.',
    highlights: [
      'Managed front-desk client relations, guest check-in/out and commercial operations.',
      'Maintained consistent quality standards achieving an "Excellent" guest satisfaction rating across both summer campaigns.'
    ],
    technologies: ['Customer Service', 'Commercial Operations', 'Quality Assurance', 'Hospitality'],
    hideInOverview: true,
    links: [
      {
        label: 'Camping Valle Enmedio',
        url: 'https://vallenmedio.com/'
      }
    ]
  },
  {
    id: 'exp-lifeguard',
    role: 'Swimming Pool Lifeguard',
    company: 'Community Facilities',
    location: 'El Escorial (Madrid), Spain',
    period: 'Jul - Sept 2016',
    type: 'Seasonal',
    description: 'Supervision of the correct operation, water safety and emergency protocols of pool facilities with zero incidents during the campaign.',
    highlights: [
      'Ensured safety vigilance and standard adherence across pool and leisure facilities.',
      'Maintained a 100% incident-free safety record throughout the operational season.'
    ],
    technologies: ['First Aid', 'Water Safety', 'Facility Supervision', 'Emergency Response'],
    hideInOverview: true
  }
];
