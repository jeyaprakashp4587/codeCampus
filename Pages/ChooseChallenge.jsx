import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, pageView } from "../constants/Colors";
import web from "../Json/WebChallenge.json";
import { useData } from "../Context/Contexter";
import HeadingText from "../utils/HeadingText";
import TopicsText from "../utils/TopicsText";
import ParagraphText from "../utils/PragraphText";
import Ripple from "react-native-material-ripple";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Button from "../utils/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Divider, Menu, SegmentedButtons } from "react-native-paper";
import { faBars, faL } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";

const ChooseChallenge = ({ navigation }) => {
  // level list
  const Levels = [
    {
      name: "Newbie",
      bgcolor: "#009900",
    },
    {
      name: "Junior",
      bgcolor: "#cca300",
    },
    {
      name: "Expert",
      bgcolor: "#cc6600",
    },
    {
      name: "Legend",
      bgcolor: "#990000",
    },
  ];
  // challenges array
  const newbieLevel = [
    {
      challenge_id: 1,
      title: "Create a Simple HTML Page",
      description:
        "Create an HTML page with a heading, paragraph, and an image.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "The page must have a heading using <h1> tag.",
        "Include at least one paragraph using <p> tag.",
        "Add an image using <img> tag with a valid URL.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?webpage",
    },
    {
      challenge_id: 2,
      title: "Create a Navigation Bar",
      description:
        "Create a navigation bar with links to Home, About, and Contact pages.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <nav> tag to create the navigation bar.",
        "Include links to Home, About, and Contact using <a> tags.",
        "Style the navigation bar using basic CSS.",
      ],
      sample_image: "https://source.unsplash.com/featured/300x200?navbar",
    },
    {
      challenge_id: 3,
      title: "Create a Simple Form",
      description:
        "Create a form with input fields for name, email, and a submit button.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <form> tag to create the form.",
        "Include input fields for name and email using <input> tags.",
        "Add a submit button using <button> tag.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?form",
    },
    {
      challenge_id: 4,
      title: "Create a CSS Styled Button",
      description: "Create a button and style it using CSS.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <button> tag to create the button.",
        "Style the button with background color, padding, and border using CSS.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?button",
    },
    {
      challenge_id: 5,
      title: "Create a Responsive Grid Layout",
      description:
        "Create a responsive grid layout with three columns that adjusts to one column on smaller screens.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use CSS Grid to create the layout.",
        "Ensure the layout has three columns on larger screens.",
        "Adjust to one column layout on smaller screens using media queries.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?grid",
    },
    {
      challenge_id: 6,
      title: "Create a Simple CSS Animation",
      description: "Create a div that changes color using CSS animations.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <div> tag to create the element.",
        "Apply a CSS animation to change the background color.",
        "The animation should last for 2 seconds and repeat indefinitely.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?animation",
    },
    {
      challenge_id: 7,
      title: "Create a Sticky Footer",
      description:
        "Create a webpage with a footer that sticks to the bottom of the page.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <footer> tag to create the footer.",
        "Ensure the footer stays at the bottom of the page even if there is little content.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?footer",
    },
    {
      challenge_id: 8,
      title: "Create a Responsive Image Gallery",
      description:
        "Create a responsive image gallery with at least four images.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <img> tags to add images.",
        "Ensure the images adjust in size based on screen width.",
        "Use CSS to style the gallery layout.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?gallery",
    },
    {
      challenge_id: 9,
      title: "Create a Modal Popup",
      description:
        "Create a modal popup that appears when a button is clicked.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use HTML and CSS to create the modal structure.",
        "Use JavaScript to handle the button click event and show the modal.",
        "Include a close button inside the modal to hide it.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?modal",
    },
    {
      challenge_id: 10,
      title: "Create a Simple Todo List",
      description:
        "Create a simple todo list application using HTML, CSS, and JavaScript.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use <input> tags to add new todo items.",
        "Display the todo items in a list.",
        "Allow users to mark items as completed.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?todo",
    },
    {
      challenge_id: 11,
      title: "Create a Responsive Header",
      description:
        "Create a responsive header with a logo and navigation menu.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
      ],
      rules: [
        "Use <header> tag to create the header.",
        "Include a logo and navigation menu.",
        "Ensure the header adjusts on smaller screens.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?header",
    },
    {
      challenge_id: 12,
      title: "Create a Simple Calculator",
      description:
        "Create a simple calculator with basic arithmetic operations.",
      level: "newbie",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use HTML to create the calculator structure.",
        "Use CSS to style the calculator.",
        "Use JavaScript to handle the arithmetic operations.",
      ],
      // sample_image: "https://source.unsplash.com/featured/300x200?calculator",
    },
  ];

  // junior level
  const juniorLevel = [
    {
      challenge_id: 31,
      title: "Create a Simple Calculator",
      description:
        "Create a simple calculator using HTML, CSS, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to perform basic arithmetic operations.",
        "Style the calculator using CSS.",
        "Include buttons for numbers and basic operations (addition, subtraction, multiplication, division).",
      ],
      sample_image: "https://i.ibb.co/FbzrmZk/The-Calculator.jpg",
      level: "Junior",
    },
    {
      challenge_id: 32,
      title: "Create a To-Do List",
      description:
        "Create a to-do list application using HTML, CSS, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to add, delete, and mark items as complete.",
        "Style the to-do list using CSS.",
        "Include input fields and buttons for managing the to-do list.",
      ],
      sample_image: "https://i.ibb.co/xJqcKy9/To-Do-List-Inspiration.jpg",
      level: "Junior",
    },
    {
      challenge_id: 33,
      title: "Create a Simple Quiz",
      description:
        "Create a simple quiz application using HTML, CSS, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to manage quiz questions and scoring.",
        "Style the quiz using CSS.",
        "Include at least five questions and provide feedback on answers.",
      ],
      sample_image:
        "https://i.ibb.co/PQC5Jbb/Browse-thousands-of-UX-Question-Game-UX-Question-Game-images-for-design-inspiration.jpg",
      level: "Junior",
    },
    {
      challenge_id: 34,
      title: "Create a Weather App",
      description:
        "Create a simple weather app that fetches data from a weather API.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to fetch and display weather data from an API.",
        "Style the weather app using CSS.",
        "Include fields to enter a city name and display the current weather.",
      ],
      sample_image:
        "https://i.ibb.co/Bsv2kKk/Weather-Web-App-Design-Template-Weather-Web-UI-Design-Uizard.jpg",
      level: "Junior",
    },
    {
      challenge_id: 35,
      title: "Create a Countdown Timer",
      description: "Create a countdown timer using HTML, CSS, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to manage the countdown timer.",
        "Style the timer using CSS.",
        "Include input fields to set the countdown duration.",
      ],
      sample_image: "https://i.ibb.co/G2sKt6G/Daily-UI-014-Countdown-Timer.jpg",
      level: "Junior",
    },
    {
      challenge_id: 36,
      title: "Create a Random Quote Generator",
      description:
        "Create a random quote generator using HTML, CSS, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to display random quotes.",
        "Style the quote generator using CSS.",
        "Include a button to generate a new quote.",
      ],
      sample_image: "https://i.ibb.co/c6YxjrK/advice.jpg",
      level: "Junior",
    },
    {
      challenge_id: 37,
      title: "Create a Tip Calculator",
      description: "Create a tip calculator using HTML, CSS, and JavaScript.",
      level: "Junior",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to calculate the tip based on the total bill amount and tip percentage.",
        "Style the tip calculator using CSS.",
        "Include input fields for the bill amount and tip percentage.",
      ],
      sample_image: "https://i.ibb.co/FbzrmZk/The-Calculator.jpg",
    },
    {
      challenge_id: 38,
      title: "Create a Pomodoro Timer",
      description: "Create a Pomodoro timer using HTML, CSS, and JavaScript.",
      level: "Junior",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
      ],
      rules: [
        "Use JavaScript to manage the Pomodoro timer intervals.",
        "Style the timer using CSS.",
        "Include buttons to start, stop, and reset the timer.",
      ],
      sample_image:
        "https://i.ibb.co/c346PTN/Pomotroid-A-Simple-Configurable-and-Visually-Pleasing-Pomodoro-Timer.jpg",
      level: "Junior",
    },
  ];

  // --- expert level
  const expertLevel = [
    {
      challenge_id: 40,
      title: "Create a Responsive E-commerce Product Page",
      description:
        "Build a responsive product page for an e-commerce site using HTML, CSS, Bootstrap, and JavaScript.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
      ],
      rules: [
        "Use Bootstrap to create a responsive layout.",
        "Use JavaScript to implement product image zoom functionality.",
        "Style the page using CSS and ensure it is fully responsive.",
      ],
      sample_image:
        "https://i.ibb.co/VTzVybg/E-Commerce-website-e-commerce-Product-Page.jpg",
      level: "Expert",
    },
    {
      challenge_id: 44,
      title: "Create a Personal Portfolio Website",
      description:
        "Build a personal portfolio website using HTML, CSS, JavaScript, Bootstrap, and React.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to build the website components.",
        "Use Bootstrap to create a responsive layout.",
        "Include sections like About, Projects, Contact, and a blog.",
      ],
      sample_image:
        "https://i.ibb.co/NnSN6Fn/Bazil-Portfolio-Awwwards-Honorable-Mention.jpg",
      level: "Expert",
    },
    {
      challenge_id: 45,
      title: "Create a Recipe App",
      description:
        "Build a recipe app that fetches recipes from an API using HTML, CSS, JavaScript, Bootstrap, and React.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to manage the state of the recipes.",
        "Use Bootstrap to create a responsive layout.",
        "Fetch recipe data from an API and display it in the app.",
      ],
      sample_image: "https://i.ibb.co/KWkV7Pm/Food-App-Design-full.jpg",
      level: "Expert",
    },
    {
      challenge_id: 46,
      title: "Create a Chat Application",
      description:
        "Build a real-time chat application using HTML, CSS, JavaScript, and React.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to build the chat application interface.",
        "Use WebSockets or a similar technology for real-time communication.",
        "Style the application using CSS and ensure it is fully responsive.",
      ],
      sample_image: "https://i.ibb.co/09kn2PJ/Chat-Messenger-Web-App.jpg",
      level: "Expert",
    },
    {
      challenge_id: 47,
      title: "Create a Movie Search App",
      description:
        "Build a movie search app using HTML, CSS, JavaScript, Bootstrap, and React that fetches data from a movie API.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to build the movie search interface.",
        "Use Bootstrap to create a responsive layout.",
        "Fetch movie data from an API and display it in the app.",
      ],
      sample_image: "https://i.ibb.co/8zVS8ZB/Filmoon-Movie-Website-Design.jpg",
      level: "Expert",
    },
    {
      challenge_id: 48,
      title: "Create a Fitness Tracker App",
      description:
        "Build a fitness tracker app using HTML, CSS, JavaScript, Bootstrap, and React.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to manage the state of the fitness data.",
        "Use Bootstrap to create a responsive layout.",
        "Include features like tracking exercises, setting goals, and viewing progress.",
      ],
      sample_image: "https://i.ibb.co/ynKhsBr/Fitness-Tracking-Exercises.jpg",
      level: "Expert",
    },
    {
      challenge_id: 49,
      title: "Create a Social Media Dashboard",
      description:
        "Build a social media dashboard using HTML, CSS, JavaScript, Bootstrap, and React that displays data from various social media platforms.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "Bootstrap",
          icon: <FontAwesome5 name="bootstrap" size={35} color="#563d7c" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to build the dashboard interface.",
        "Use Bootstrap to create a responsive layout.",
        "Fetch data from various social media APIs and display it in the dashboard.",
      ],
      sample_image:
        "https://i.ibb.co/XyqZQpw/Coz-Meet-Social-Media-Dashboard.jpg",
      level: "Expert",
    },
  ];

  // legent
  const legendLevel = [
    {
      challenge_id: 41,
      title: "Create a Spotify Clone using React JS",
      description:
        "Create a Music App like Spotify using HTML, CSS, JavaScript, and React.",
      technologies: [
        {
          name: "HTML",
          icon: <FontAwesome5 name="html5" size={35} color="#EF6C33" />,
        },
        {
          name: "CSS",
          icon: <FontAwesome5 name="css3" size={35} color="#0874C5" />,
        },
        {
          name: "JavaScript",
          icon: <Ionicons name="logo-javascript" size={35} color="#E2A534" />,
        },
        {
          name: "React",
          icon: <FontAwesome5 name="react" size={35} color="#4CC1E0" />,
        },
      ],
      rules: [
        "Use React to create the UI and Front end technologie",
        "Style the blog using CSS and ensure it is fully responsive.",
        "Use JavaScript for Implement playing Audio",
      ],
      sample_image:
        "https://i.ibb.co/gwc8g9v/Spotify-Redesign-Dark-Version.jpg",
      level: "Legend",
    },
  ];
  //

  const { selectedChallengeTopic, setSelectedChallenge } = useData();
  const [Challenges, setChallenges] = useState();
  useEffect(() => {
    switch (selectedChallengeTopic) {
      case "Web Development":
        setChallenges(juniorLevel);
        break;
      case "App Development":
        // setselectedChallengeTopic("")
        break;
      case "Problem Solving":
        break;

      default:
        break;
    }
    // console.log(selectedChallengeTopic);
    setChallenges(newbieLevel);
  }, []);
  //  handle level
  const [difficultyInfo, setDifficultyInfo] = useState("Newbie");
  const HandleSelectLevel = (levelName) => {
    setDifficultyInfo(levelName);
    setVisible(false);
    switch (levelName) {
      case "Newbie":
        setChallenges(newbieLevel);
        break;
      case "Junior":
        setChallenges(juniorLevel);
        break;
      case "Expert":
        setChallenges(expertLevel);
        break;
      case "Legend":
        setChallenges(legendLevel);
        break;
      default:
        setChallenges(newbieLevel);
        break;
    }
  };
  //
  // for show levels
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  //
  return (
    <View style={pageView}>
      <HeadingText text={selectedChallengeTopic} />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TopicsText text="Choose Difficulty Level" fszie={20} mb={1} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <FontAwesomeIcon
                icon={faBars}
                color={Colors.mildGrey}
                size={20}
              />
            </TouchableOpacity>
          }
        >
          {Levels.map((level, index) => (
            <Menu.Item
              key={index}
              rippleColor="orange"
              onPress={() => HandleSelectLevel(level.name)}
              title={level.name}
              style={{ backgroundColor: Colors.mildGrey }}
            />
          ))}
        </Menu>
      </View>
      <FlatList
        data={Challenges}
        showsVerticalScrollIndicator={false}
        style={{
          alignSelf: "center",
          borderWidth: 0,
          width: "100%",
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              // borderWidth: 1,
              flexDirection: "column",
              rowGap: 10,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 2,
              marginTop: 15,
              marginHorizontal: 5,
              marginBottom: 5,
            }}
            key={index}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ParagraphText
                text={item.title}
                fsize={18}
                padding={5}
                widht="70%"
              />
              <ParagraphText
                text={item.level ? item.level : difficultyInfo}
                fsize={15}
                padding={5}
                color="orange"
              />
            </View>
            {item?.level == "newbie" ? null : (
              <Image
                source={{
                  uri: item.sample_image,
                }}
                style={{
                  width: "100%",
                  height: 250,
                  alignSelf: "center",
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            )}
            <Text
              style={{
                color: Colors.veryDarkGrey,
                lineHeight: 24,
                letterSpacing: 1,
              }}
            >
              {item.description}
            </Text>
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", columnGap: 20 }}>
                {item.technologies.map((i, index) =>
                  React.cloneElement(i.icon, { size: 20, key: index })
                )}
              </View>
              <View>
                <Feather
                  name="check-circle"
                  size={20}
                  color={Colors.mildGrey}
                />
              </View>
            </View>
            <LinearGradient
              colors={["#003399", "#6699ff", "#003399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10, overflow: "hidden" }}
            >
              <Button
                text="View Challenge"
                bgcolor="transparent"
                radius={0.2}
                elevation={0.1}
                textColor="white"
                function={() => {
                  navigation.navigate("challengeDetail");
                  setSelectedChallenge(item);
                }}
              />
            </LinearGradient>
          </View>
        )}
      />
    </View>
  );
};

export default ChooseChallenge;

const styles = StyleSheet.create({});
