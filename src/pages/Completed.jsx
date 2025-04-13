import { useState } from 'react';
import DayView from '../components/DayView';
import WeekNavigation from '../components/WeekNavigation';
import { initialTasks } from '../data/tasks';

// Date parsing utility (reusable)
const parseTaskDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
};

export default function Completed() {
    const [startDate, setStartDate] = useState(new Date());
    const completedTasks = initialTasks.filter(task =>
        task.status === 'Completed'
    );

    // Get tasks for a specific date
    const getTasksForDate = (date) => {
        return completedTasks.filter(task => {
            try {
                const taskDate = parseTaskDate(task.due);
                return taskDate.toDateString() === date.toDateString();
            } catch (error) {
                console.error("Error parsing task date:", error);
                return false;
            }
        });
    };

    // Calculate week
    const weekEndDate = new Date(startDate);
    weekEndDate.setDate(startDate.getDate() + 6);

    return (
        <div className="container">
            <h2 className="page-title" style={{ color: '#28a745' }}>
                Completed Tasks
            </h2>

            <WeekNavigation
                startDate={startDate}
                setStartDate={setStartDate}
            />

            <div className="week-range">
                {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
                {weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>

            <div className="week-view">
                {Array.from({ length: 7 }).map((_, dayOffset) => {
                    const currentDate = new Date(startDate);
                    currentDate.setDate(startDate.getDate() + dayOffset);

                    return (
                        <DayView
                            key={currentDate.toISOString()} // More stable key
                            date={currentDate}
                            tasks={getTasksForDate(currentDate)}
                        />
                    );
                })}
            </div>
        </div>
    );
}