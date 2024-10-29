import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

import './SkillChart.css';

const SkillChart = ({highlightedSkill, displayedSkills, skillValues, width}) => {
    return (
        <div className="skills-chart">
            <BarChart
                xAxis={[
                    {
                        disableTicks: true,
                        valueFormatter: (value) => {
                            if(Math.floor(value) != value){
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
                        id: "coding-skills-barCategories",
                        data: displayedSkills.map(({skillName}) => skillName),
                        scaleType: "band",
                        colorMap: {
                            type: 'ordinal',
                            colors: displayedSkills.map(skill => skill.skillName === highlightedSkill ? '#ff8800' : '#28a4c4')
                        }
                    }
                ]}
                series={[{
                    data: displayedSkills.map((skill) => skillValues.findIndex((element) => element === skill.experienceLevel) + 1),
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
                width={width}
                height={displayedSkills.length * 50}
            />
        </div>
    )
}

export default SkillChart;