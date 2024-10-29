import React, {useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './Home.css';
import skills from './skills.json';
import { BarChart } from '@mui/x-charts/BarChart';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Typography from '@mui/material/Typography';
import SkillChart from './SkillChart.js';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

const Home = () => {

    const [mySkills, setMySkills] = useState([]);
    const [searchedSkill, setSearchedSkill] = useState("");
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [expanded, setExpanded] = useState(false);

    const skillValues = [
        "Novice",
        "Entry-Level",
        "Mid-Level",
        "Senior",
        "Expert"
    ]

    function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
    }

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const sortedSkills = skills.sort(function (a, b) {
            if(skillValues.indexOf(a.experienceLevel) < skillValues.indexOf(b.experienceLevel)) {
                return 1;
            } else if (skillValues.indexOf(a.experienceLevel) > skillValues.indexOf(b.experienceLevel)) {
                return -1;
            }
            else if(a.skillName < b.skillName) {
                return -1;
            }
            else if (a.skillName > b.skillName) {
                return 1;
            } else {
                return 0;
            }
        });
        setMySkills(sortedSkills);
    }, []);

    useEffect(() => {
        if(mySkills.find((skill) => skill.skillName === searchedSkill))
        {
            if(mySkills.find((skill) => skill.skillName === searchedSkill).skillType === "Coding Language") {
                setExpanded("panel1");
            } else if (mySkills.find((skill) => skill.skillName === searchedSkill).skillType === "Library") {
                setExpanded("panel2");
            } else if (mySkills.find((skill) => skill.skillName === searchedSkill).skillType === "Software Application") {
                setExpanded("panel3");
            } else {
                setExpanded(false);
            }
        }
    }, [searchedSkill])

    return(
        <div className="homepage">
            <div className="welcome" id="welcome">
                Welcome to <span className="name-highlight">Jacob Tufts</span>'s Interactive Resume!
            </div>
            <div>
                <div className="heading" id="executive-summary">
                    Executive Summary
                </div>
                <div className="content">
                    An agile software developer and stakeholder champion, as well as a lifelong learner. Spirited speaker for both the creative and logical sides of the mind. Offers six years of professional experience and freelance experience with React and Angular, in addition to a flexible, team-oriented approach to software development. 
                </div>
            </div>
            <div>
                <div className="heading" id="skills">
                    Skills
                </div>
                <div className="content">
                    <div>
                        Key Skills
                    </div>
                    <div className='key-skills-chart'>
                        <BarChart
                            xAxis={[
                                {
                                    disableTicks: true,
                                    valueFormatter: (value) => {
                                        if(Math.floor(value) !== value){
                                            return "";
                                        } else if (Math.floor(value) > 0) {
                                            return skillValues[Math.floor(value) - 1];
                                        } else {
                                            return ""
                                        }
                                    }
                                }
                            ]}
                            yAxis={[
                                {
                                    id: "key-skills-barCategories",
                                    data: mySkills.filter((skill) => skill.isExpertSkill).map((skill) => skill.skillName),
                                    scaleType: "band",
                                    colorMap: {
                                        type: 'ordinal',
                                        colors: mySkills.filter((skill) => skill.isExpertSkill).map(skill => '#14d4f4')
                                    }
                                }
                            ]}
                            series={[{
                                data: mySkills.filter((skill) => skill.isExpertSkill).map((skill) => skillValues.findIndex((element) => element === skill.experienceLevel) + 1),
                                valueFormatter: (value) => {
                                    if(Math.floor(value) != value){
                                        return "";
                                    } else if (Math.floor(value) > 0) {
                                        return skillValues[Math.floor(value) - 1];
                                    } else {
                                        return ""
                                    }
                                }
                            }]}
                            layout="horizontal"
                            width={windowDimensions.width * 0.8}
                            height={450}
                        />
                    </div>
                </div>
                <div className="search">
                    Don't see a specific technology in the key skills? Search for it here: 
                    <Select
                        id="skill-select"
                        value={searchedSkill}
                        onChange={(e) => {setSearchedSkill(e.target.value)}}
                        style={{marginLeft: '10px', minWidth: '225px'}}
                    >
                        {mySkills.toSorted(function(a, b) {
                        if(a.skillName < b.skillName) {
                            return -1;
                        } else if (a.skillName > b.skillName) {
                            return 1;
                        } else {
                            return 0;
                        }}).map((skill) => {
                            return (
                                <MenuItem value={skill.skillName}>{skill.skillName}</MenuItem>
                            )
                        })}
                    </Select>
                </div>
                <div>
                        <Accordion expanded={expanded === "panel1"} onChange={() => {expanded === "panel1" ? setExpanded(false) : setExpanded("panel1")}}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>
                                    Coding Languages
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillChart
                                    highlightedSkill={searchedSkill}
                                    displayedSkills={mySkills.filter((skill) => skill.skillType === "Coding Language")}
                                    skillValues={skillValues}
                                    width={windowDimensions.width * 0.8}
                                />
                            </AccordionDetails>
                        </Accordion>
                </div>
                <div>
                        <Accordion expanded={expanded === "panel2"} onChange={() => {expanded === "panel2" ? setExpanded(false) : setExpanded("panel2")}}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <Typography>
                                    Libraries
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillChart
                                    highlightedSkill={searchedSkill}
                                    displayedSkills={mySkills.filter((skill) => skill.skillType === "Library")}
                                    skillValues={skillValues}
                                    width={windowDimensions.width * 0.8}
                                />
                            </AccordionDetails>
                        </Accordion>
                </div>
                <div>
                        <Accordion expanded={expanded === "panel3"} onChange={() => {expanded === "panel3" ? setExpanded(false) : setExpanded("panel3")}}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                <Typography>
                                    Software Applications
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillChart
                                    highlightedSkill={searchedSkill}
                                    displayedSkills={mySkills.filter((skill) => skill.skillType === "Software Application")}
                                    skillValues={skillValues}
                                    width={windowDimensions.width * 0.8}
                                />
                            </AccordionDetails>
                        </Accordion>
                </div>
            </div>
            <div>
                <div className="heading" id="employment-history">
                    Employment and Education History
                </div>
                <div>
                    <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                          flex: 0.2,
                        },
                      }}>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                Feb 2024 - July 2024
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <Accordion expanded={expanded === "panel4"} onChange={() => {expanded === "panel4" ? setExpanded(false) : setExpanded("panel4")}}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDownwardIcon />}
                                                aria-controls="panel4-content"
                                                id="panel4-header"
                                            >
                                                <Typography>
                                                    Allstate - Software Developer (Contract) (Feb 2024 - Jun 2024)
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ul>Developed for, debugged, and maintained multiple websites as part of the Site Reliability team, using ReactJS and Java</ul>
                                                <ul>Spearheaded machine learning initiative for the purpose of detecting abnormal amounts of website errors automatically</ul>
                                                <ul>Modified SQL databases to adapt to ongoing changes to product requirements</ul>
                                                <ul>Collaborated with UI/UX team to identify potential pain points for website users</ul>
                                                <ul>Leveraged tools such as Jenkins, VersionOne and GitHub to coordinate deployments and Source Control with other website developers</ul>
                                                <ul>Pivoted between additional software development assignments as needed</ul>
                                            </AccordionDetails>
                                    </Accordion>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                July 2023 - Dec 2023
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <Accordion expanded={expanded === "panel5"} onChange={() => {expanded === "panel5" ? setExpanded(false) : setExpanded("panel5")}}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDownwardIcon />}
                                                aria-controls="panel5-content"
                                                id="panel5-header"
                                            >
                                                <Typography>
                                                    Ford Motor Company - Software Developer (Contract) (July 2023 - Dec 2023)
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ul>Used ReactJS, NodeJS, and CSS to support, maintain and improve a foreign version of the company's EMP (Electronic Management Platform) Website</ul>
                                                <ul>Utilized SQL knowledge in tandem with IntelliJ DataGrip to manually make changes to a database necessary for the website's functionality</ul>
                                                <ul>Leveraged tools such as CloudFoundry and RabbitMQ to diagnose and resolve issues with EMP's Email Notification system</ul>
                                            </AccordionDetails>
                                    </Accordion>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                July 2018 - Feb 2023
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <Accordion expanded={expanded === "panel6"} onChange={() => {expanded === "panel6" ? setExpanded(false) : setExpanded("panel6")}}>
                                            <AccordionSummary
                                                expandIcon={<ArrowDownwardIcon />}
                                                aria-controls="panel6-content"
                                                id="panel6-header"
                                            >
                                                <Typography>
                                                    Nexient - Developer II
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ul>Utilized ReactJS, Javascript, HTML5, CSS3, ES6, NodeJS, other skills as needed</ul>
                                                <ul>Coded, tested and debugged deliverable software applications</ul>
                                                <ul>Interfaced with clients including Numo, Home Depot, and Williams-Sonoma</ul>
                                                <ul>Williams-Sonoma (~100 People) - Worked on two iterations of a large website, adapted them to rapidly changing project requirements; coordinated with multiple project teams.</ul>
                                                <ul>Home Depot (15 People) - Aided existing UX team in month-long push toward working release of internal application; Identified, detailed, and presented potential API issue to whole team</ul>
                                                <ul>Numo (10 People) - Refactored a web application from Vue to React that aggregated data from a GIS API and displayed real estate trends by state, city, and zip code in the form of a dashboard, with design improvements for maintainability, readability, and efficiency</ul>
                                            </AccordionDetails>
                                    </Accordion>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                May 2018
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>Graduated from University of Michigan - Dearborn, with a B.S. in Computer Science</div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                Summer 2017
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <Accordion expanded={expanded === "panel7"} onChange={() => {expanded === "panel7" ? setExpanded(false) : setExpanded("panel7")}}>
                                        <AccordionSummary
                                                expandIcon={<ArrowDownwardIcon />}
                                                aria-controls="panel7-content"
                                                id="panel7-header"
                                        >
                                            <Typography>
                                                    Blue Care Network - Summer Intern
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            Leveraged Java, SQL, Visual Basic macros with a focus on data retrieval
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                Summer 2016
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <Accordion expanded={expanded === "panel8"} onChange={() => {expanded === "panel8" ? setExpanded(false) : setExpanded("panel8")}}>
                                        <AccordionSummary
                                                expandIcon={<ArrowDownwardIcon />}
                                                aria-controls="panel8-content"
                                                id="panel8-header"
                                        >
                                            <Typography>
                                                    Blue Care Network - Summer Intern
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            Leveraged Visual Basic macros with a focus on visual presentation of data
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                Fall 2014
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>Enrolled in University of Michigan - Dearborn</div>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </div>
            </div>
            <div>
                <div className="heading" id="contact-information">
                    Contact Information
                </div>
                <div className="contact">
                    E-Mail: <a className="email-link" href="mailto:jtufts@umich.edu">jtufts@umich.edu</a>
                </div>
                <div className="contact">
                    Cell Phone: +1(734)419-1185
                </div>
            </div>
        </div>
    )
}

export default Home;