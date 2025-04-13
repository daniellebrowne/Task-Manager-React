import { useState } from 'react';
import DayView from '../components/DayView';
import WeekNavigation from '../components/WeekNavigation';
import { initialTasks } from '../data/tasks';

export default function HighPriority() {
    const [startDate, setStartDate] = useState(new Date());

    //Extracts priority tasks from initialTasks
    const highPriorityTasks = initialTasks.filter(task => {
        const priorityNumber = parseInt(task.priority.split(' - ')[0]);
        return priorityNumber <= 3; 
    });

    //Get tasks for a specific date
    const getTasksForDate = (date) => {
        return highPriorityTasks.filter(task => {
            const taskDate = new Date(task.due.split('-').reverse().join('-'));
            return taskDate.toDateString() === date.toDateString();
        });
    };

    //Calculate week end date
    const weekEndDate = new Date(startDate);
    weekEndDate.setDate(startDate.getDate() + 6);

    return (
        <div className="container">
            <h2 className="page-title">High Priority Tasks</h2>

            <WeekNavigation startDate={startDate} setStartDate={setStartDate} />

            <div className="week-range">
                {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
                {weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>

            <div className="week-view">
                {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                    const currentDate = new Date(startDate);
                    currentDate.setDate(startDate.getDate() + dayOffset);

                    return (
                        <DayView
                            key={dayOffset}
                            date={currentDate}
                            tasks={getTasksForDate(currentDate)}
                        />
                    );
                })}
            </div>
        </div>
    );
}