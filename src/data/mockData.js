export const WORKSHOP_TYPES = [
  {
    id: 1,
    name: "Python Basics",
    description:
      "A comprehensive introduction to Python programming covering data types, control structures, functions, and object-oriented programming fundamentals.",
    duration: 2,
    category: "Programming",
    color: "#D4E8A0",
    icon: "🐍",
    terms_and_conditions:
      "1. Participants must bring their own laptop.\n2. Prior programming experience is not required.\n3. Attendance is mandatory for all sessions.\n4. Participants must install Python 3.x before attending.",
    enrollments: 124,
  },
  {
    id: 2,
    name: "Scilab for Engineers",
    description:
      "Learn numerical computing, signal processing, and simulation techniques using the free, open-source Scilab platform.",
    duration: 1,
    category: "Engineering",
    color: "#A0D4E8",
    icon: "⚙️",
    terms_and_conditions:
      "1. Basic mathematics knowledge is required.\n2. Scilab software will be provided.\n3. Participants should have basic familiarity with engineering concepts.",
    enrollments: 87,
  },
  {
    id: 3,
    name: "ISCP Programme",
    description:
      "Integrated Spoken Content Programme for advanced computing skills with hands-on lab sessions and mentored projects.",
    duration: 3,
    category: "Advanced",
    color: "#E8C4A0",
    icon: "🎓",
    terms_and_conditions:
      "1. Must be a final year student or above.\n2. Institution letter of recommendation required.\n3. Full attendance mandatory for certification.\n4. Participants must complete pre-workshop assignments.",
    enrollments: 56,
  },
  {
    id: 4,
    name: "OpenFOAM CFD",
    description:
      "Computational Fluid Dynamics using the open-source OpenFOAM solver and ParaView for scientific visualization.",
    duration: 2,
    category: "Simulation",
    color: "#C4A0E8",
    icon: "🌊",
    terms_and_conditions:
      "1. Fluid mechanics background is preferred.\n2. Linux command line familiarity is helpful.\n3. Minimum 8GB RAM on participant's machine required.",
    enrollments: 42,
  },
  {
    id: 5,
    name: "R for Data Science",
    description:
      "Statistical computing and data visualization using R. Covers data wrangling, ggplot2, and machine learning basics.",
    duration: 2,
    category: "Data Science",
    color: "#E8A0C4",
    icon: "📊",
    terms_and_conditions:
      "1. Basic statistics knowledge required.\n2. R and RStudio must be installed prior.\n3. Bring a dataset you want to analyze.",
    enrollments: 93,
  },
  {
    id: 6,
    name: "LaTeX for Research",
    description:
      "Professional academic document typesetting using LaTeX. Learn to write papers, theses, and presentations.",
    duration: 1,
    category: "Academic Writing",
    color: "#A0E8C4",
    icon: "📝",
    terms_and_conditions:
      "1. A text editor and LaTeX distribution must be installed.\n2. Suitable for all departments.\n3. Sample documents provided.",
    enrollments: 178,
  },
];

export const MOCK_USER = {
  id: 1,
  first_name: "Priya",
  last_name: "Sharma",
  email: "priya.sharma@iitb.ac.in",
  position: "coordinator",
  title: "Ms.",
  institute: "IIT Bombay",
  department: "computer engineering",
  phone_number: "9876543210",
  state: "IN-MH",
  location: "Mumbai",
  is_email_verified: true,
};

export const MOCK_WORKSHOPS = [
  {
    id: 1,
    workshop_type_id: 1,
    workshop_type_name: "Python Basics",
    date: "2025-09-15",
    status: 1,
    instructor_name: "Dr. Prabhu Ramachandran",
    coordinator_name: "Priya Sharma",
    tnc_accepted: true,
    comments: [
      { id: 1, author: "Dr. Prabhu Ramachandran", text: "Please ensure all participants have Python 3.10 installed.", date: "2025-08-10" },
    ],
  },
  {
    id: 2,
    workshop_type_id: 3,
    workshop_type_name: "ISCP Programme",
    date: "2025-10-05",
    status: 0,
    instructor_name: null,
    coordinator_name: "Priya Sharma",
    tnc_accepted: true,
    comments: [],
  },
  {
    id: 3,
    workshop_type_id: 5,
    workshop_type_name: "R for Data Science",
    date: "2025-11-20",
    status: 0,
    instructor_name: null,
    coordinator_name: "Priya Sharma",
    tnc_accepted: true,
    comments: [],
  },
];

export const STATS = {
  total_workshops: 342,
  workshops_this_month: 28,
  states_covered: 24,
  active_instructors: 47,
};

export const DEPARTMENTS = [
  { value: "computer engineering", label: "Computer Science" },
  { value: "information technology", label: "Information Technology" },
  { value: "civil engineering", label: "Civil Engineering" },
  { value: "electrical engineering", label: "Electrical Engineering" },
  { value: "mechanical engineering", label: "Mechanical Engineering" },
  { value: "chemical engineering", label: "Chemical Engineering" },
  { value: "aerospace engineering", label: "Aerospace Engineering" },
  { value: "biosciences and bioengineering", label: "Biosciences & BioEngineering" },
  { value: "electronics", label: "Electronics" },
  { value: "energy science and engineering", label: "Energy Science & Engineering" },
];

