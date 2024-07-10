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

const ChooseChallenge = () => {
  const web = [
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
  const { selectedChallengeTopic } = useData();
  const [Challenges, setChallenges] = useState();
  useEffect(() => {
    switch (selectedChallengeTopic) {
      case "Web Development":
        setChallenges(web);
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
  //   console.log("challenge", Challenges);
  return (
    <View style={pageView}>
      <HeadingText text={selectedChallengeTopic} />
      <View style={{ height: 10 }} />
      <TopicsText text="Choose a Challenge & Make Fun" fszie={20} />
      {/* levels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Button text="Newbie" width={90} bgcolor="#009900" textColor="white" />
        <Button text="Junior" width={90} bgcolor="#e6b800" textColor="white" />
        <Button text="Expert" width={90} bgcolor="#ff0000" textColor="white" />
        <Button text="Legend" width={90} bgcolor="#cc0000" textColor="white" />
      </View>
      {/* levels */}
      <FlatList
        data={Challenges}
        // numColumns={2}
        showsVerticalScrollIndicator={false}
        // columnWrapperStyle={{ justifyContent: "space-between", gap: 20 }}
        style={{
          alignSelf: "center",
          borderWidth: 0,
          width: "100%",
        }}
        renderItem={({ item, index }) => (
          <Ripple
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
            <ParagraphText text={item.title} fsize={20} padding={5} />
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
              />
            </LinearGradient>
          </Ripple>
        )}
      />
    </View>
  );
};

export default ChooseChallenge;

const styles = StyleSheet.create({});
