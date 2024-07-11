import { FlatList, StyleSheet, Text, View } from "react-native";
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
      sample_image: "https://example.com/sample1.png",
    },
    {
      challenge_id: 2,
      title: "Create a Navigation Bar",
      description:
        "Create a navigation bar with links to Home, About, and Contact pages.",
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
      sample_image: "https://example.com/sample2.png",
    },
    {
      challenge_id: 3,
      title: "Create a Simple Form",
      description:
        "Create a form with input fields for name, email, and a submit button.",
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
      sample_image: "https://example.com/sample3.png",
    },
    {
      challenge_id: 4,
      title: "Create a CSS Styled Button",
      description: "Create a button and style it using CSS.",
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
      sample_image: "https://example.com/sample4.png",
    },
    {
      challenge_id: 5,
      title: "Create a Responsive Grid Layout",
      description:
        "Create a responsive grid layout with three columns that adjusts to one column on smaller screens.",
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
      sample_image: "https://example.com/sample5.png",
    },
    {
      challenge_id: 6,
      title: "Create a Simple CSS Animation",
      description: "Create a div that changes color using CSS animations.",
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
      sample_image: "https://example.com/sample6.png",
    },
    {
      challenge_id: 7,
      title: "Create a Sticky Footer",
      description:
        "Create a webpage with a footer that sticks to the bottom of the page.",
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
      sample_image: "https://example.com/sample7.png",
    },
    {
      challenge_id: 8,
      title: "Create a Responsive Image Gallery",
      description:
        "Create a responsive image gallery with at least four images.",
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
      sample_image: "https://example.com/sample8.png",
    },
    {
      challenge_id: 9,
      title: "Create a Modal Popup",
      description:
        "Create a modal popup that appears when a button is clicked.",
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
      sample_image: "https://example.com/sample9.png",
    },
    {
      challenge_id: 10,
      title: "Create a Simple Todo List",
      description:
        "Create a simple todo list application using HTML, CSS, and JavaScript.",
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
      sample_image: "https://example.com/sample10.png",
    },
    {
      challenge_id: 11,
      title: "Create a Responsive Header",
      description:
        "Create a responsive header with a logo and navigation menu.",
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
        "Include a logo image and navigation links.",
        "Ensure the header adjusts layout on smaller screens.",
      ],
      sample_image: "https://example.com/sample11.png",
    },
    {
      challenge_id: 12,
      title: "Create a CSS Flexbox Layout",
      description:
        "Create a layout using CSS Flexbox with a header, main content, and footer.",
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
        "Use Flexbox properties to layout the page.",
        "Ensure the header, main content, and footer are in the correct order.",
        "Style the layout using CSS.",
      ],
      sample_image: "https://example.com/sample12.png",
    },
    {
      challenge_id: 13,
      title: "Create a Hover Effect on Buttons",
      description: "Create a button with a hover effect using CSS.",
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
        "Apply a hover effect using CSS, such as changing the background color.",
      ],
      sample_image: "https://example.com/sample13.png",
    },
    {
      challenge_id: 14,
      title: "Create a Simple Dropdown Menu",
      description:
        "Create a dropdown menu that appears when a button is clicked.",
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
        "Use HTML and CSS to create the dropdown structure.",
        "Use JavaScript to handle the button click event and show the dropdown menu.",
        "Style the dropdown menu with CSS.",
      ],
      sample_image: "https://example.com/sample14.png",
    },
    {
      challenge_id: 15,
      title: "Create a Responsive Sidebar",
      description: "Create a sidebar that adjusts layout on smaller screens.",
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
        "Use <aside> tag to create the sidebar.",
        "Ensure the sidebar is visible on larger screens and collapses on smaller screens.",
        "Use CSS and JavaScript for the responsive behavior.",
      ],
      sample_image: "https://example.com/sample15.png",
    },
    {
      challenge_id: 16,
      title: "Create a Simple Accordion",
      description:
        "Create an accordion component that expands and collapses sections of content.",
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
        "Use HTML to structure the accordion.",
        "Use CSS to style the accordion.",
        "Use JavaScript to handle the expand/collapse behavior.",
      ],
      sample_image: "https://example.com/sample16.png",
    },
    {
      challenge_id: 17,
      title: "Create a Fixed Header",
      description:
        "Create a webpage with a header that stays fixed at the top while scrolling.",
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
        "Use <header> tag to create the header.",
        "Apply CSS to fix the header position at the top.",
        "Ensure the content scrolls beneath the header.",
      ],
      sample_image: "https://example.com/sample17.png",
    },
    {
      challenge_id: 18,
      title: "Create a Simple Slideshow",
      description:
        "Create a slideshow with at least three images that change automatically.",
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
        "Use HTML to add the images.",
        "Use CSS to style the slideshow.",
        "Use JavaScript to automatically change images every few seconds.",
      ],
      sample_image: "https://example.com/sample18.png",
    },
    {
      challenge_id: 19,
      title: "Create a Simple Table",
      description: "Create a table with rows and columns using HTML.",
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
        "Use <table> tag to create the table.",
        "Include at least three rows and three columns.",
        "Style the table with basic CSS.",
      ],
      sample_image: "https://example.com/sample19.png",
    },
    {
      challenge_id: 20,
      title: "Create a Simple Calculator",
      description:
        "Create a simple calculator that performs basic arithmetic operations.",
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
        "Use JavaScript to handle the calculations.",
      ],
      sample_image: "https://example.com/sample20.png",
    },
  ];
  // junior level
  const juniorLevel = [
    {
      challenge_id: 22,
      title: "Create a Toggleable Dropdown Menu",
      description:
        "Create a dropdown menu that can be toggled on and off using JavaScript.",
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
        "Use JavaScript to toggle the visibility of the dropdown menu.",
        "Style the dropdown menu using CSS.",
        "Ensure the dropdown works on both desktop and mobile devices.",
      ],
      sample_image: "https://example.com/sample22.png",
    },
    {
      challenge_id: 23,
      title: "Create a Modal Popup",
      description: "Create a modal popup that opens when a button is clicked.",
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
        "Use JavaScript to open and close the modal popup.",
        "Style the modal popup using CSS.",
        "Include some content inside the modal.",
      ],
      sample_image: "https://example.com/sample23.png",
    },
    {
      challenge_id: 25,
      title: "Create a Simple Carousel",
      description: "Create an image carousel using JavaScript.",
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
        "Use JavaScript to switch between images.",
        "Style the carousel using CSS.",
        "Include at least three images in the carousel.",
      ],
      sample_image: "https://example.com/sample25.png",
    },
    {
      challenge_id: 27,
      title: "Create a Lightbox Gallery",
      description: "Create an image gallery with a lightbox effect.",
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
        "Use JavaScript to create a lightbox effect when an image is clicked.",
        "Style the lightbox overlay using CSS.",
        "Include at least three images in the gallery.",
      ],
      sample_image: "https://example.com/sample27.png",
    },
    {
      challenge_id: 28,
      title: "Create an Accordion",
      description:
        "Create an accordion menu that expands and collapses sections using JavaScript.",
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
        "Use JavaScript to expand and collapse sections.",
        "Style the accordion using CSS.",
        "Include at least three sections in the accordion.",
      ],
      sample_image: "https://example.com/sample28.png",
    },
    {
      challenge_id: 29,
      title: "Create a Sticky Navigation Bar",
      description:
        "Create a navigation bar that sticks to the top of the page when scrolling.",
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
        "Use JavaScript to make the navigation bar sticky.",
        "Style the navigation bar using CSS.",
        "Ensure the navigation bar remains at the top of the page when scrolling.",
      ],
      sample_image: "https://example.com/sample29.png",
    },
    {
      challenge_id: 30,
      title: "Create a Scroll Back to Top Button",
      description:
        "Create a button that scrolls back to the top of the page when clicked.",
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
        "Use JavaScript to scroll to the top of the page when the button is clicked.",
        "Style the button using CSS.",
        "Ensure the button is visible when scrolling down the page.",
      ],
      sample_image: "https://example.com/sample30.png",
    },
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
      sample_image: "https://example.com/sample31.png",
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
      sample_image: "https://example.com/sample32.png",
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
      sample_image: "https://example.com/sample33.png",
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
      sample_image: "https://example.com/sample34.png",
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
      sample_image: "https://example.com/sample35.png",
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
      sample_image: "https://example.com/sample36.png",
    },
    {
      challenge_id: 37,
      title: "Create a Tip Calculator",
      description: "Create a tip calculator using HTML, CSS, and JavaScript.",
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
      sample_image: "https://example.com/sample37.png",
    },
    {
      challenge_id: 38,
      title: "Create a Pomodoro Timer",
      description: "Create a Pomodoro timer using HTML, CSS, and JavaScript.",
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
      sample_image: "https://example.com/sample38.png",
    },
    {
      challenge_id: 39,
      title: "Create a Password Generator",
      description:
        "Create a random password generator using HTML, CSS, and JavaScript.",
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
        "Use JavaScript to generate random passwords.",
        "Style the password generator using CSS.",
        "Include options for password length and character types.",
      ],
      sample_image: "https://example.com/sample39.png",
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
      sample_image: "https://example.com/sample40.png",
    },
    {
      challenge_id: 41,
      title: "Create a Blog with a Commenting System",
      description:
        "Create a blog with a commenting system using HTML, CSS, JavaScript, and React.",
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
        "Use React to create the blog and commenting system.",
        "Style the blog using CSS and ensure it is fully responsive.",
        "Use JavaScript to manage the state of the comments.",
      ],
      sample_image: "https://example.com/sample41.png",
    },
    {
      challenge_id: 42,
      title: "Create a Weather Dashboard",
      description:
        "Build a weather dashboard using HTML, CSS, JavaScript, Bootstrap, and React that fetches data from a weather API.",
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
        "Use React to build the dashboard and manage state.",
        "Use Bootstrap to create a responsive layout.",
        "Fetch weather data from an API and display it on the dashboard.",
      ],
      sample_image: "https://example.com/sample42.png",
    },
    {
      challenge_id: 43,
      title: "Create a Task Management App",
      description:
        "Build a task management app using HTML, CSS, JavaScript, and React.",
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
        "Use React to manage the state of the tasks.",
        "Style the app using CSS and ensure it is fully responsive.",
        "Include features like adding, editing, deleting, and marking tasks as complete.",
      ],
      sample_image: "https://example.com/sample43.png",
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
      sample_image: "https://example.com/sample44.png",
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
      sample_image: "https://example.com/sample45.png",
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
      sample_image: "https://example.com/sample46.png",
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
      sample_image: "https://example.com/sample47.png",
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
      sample_image: "https://example.com/sample48.png",
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
      sample_image: "https://example.com/sample49.png",
    },
    {
      challenge_id: 50,
      title: "Create an Expense Tracker App",
      description:
        "Build an expense tracker app using HTML, CSS, JavaScript, Bootstrap, and React.",
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
        "Use React to manage the state of the expenses.",
        "Use Bootstrap to create a responsive layout.",
        "Include features like adding, editing, deleting expenses, and viewing expense reports.",
      ],
      sample_image: "https://example.com/sample50.png",
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
      sample_image: "https://example.com/sample41.png",
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
  }, []);
  //  handle level
  const [difficultyInfo, setDifficultyInfo] = useState("newbie");
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
          {Levels.map((level) => (
            <Menu.Item
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
              rowGap: 5,
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
                text={difficultyInfo}
                fsize={15}
                padding={5}
                color="orange"
              />
            </View>
            <Text style={{ color: Colors.veryDarkGrey, lineHeight: 24 }}>
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
                {item.technologies.map((i) =>
                  React.cloneElement(i.icon, { size: 20 })
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
