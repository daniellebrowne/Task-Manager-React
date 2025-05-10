import { useState } from 'react';

const DayView = ({ date, tasks = [] }) => {  
    const [isOpen, setIsOpen] = useState(false);

    // Date formatting utilities
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    // Parse date string consistently (DD-MM-YYYY format)
    const parseTaskDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    // Filter tasks for this specific day
    const dayTasks = tasks.filter(task => {
        try {
            const taskDate = parseTaskDate(task.due);
            return taskDate.toDateString() === date.toDateString();
        } catch (error) {
            console.error("Error parsing task date:", error);
            return false;
        }
    });

    // Check for overdue tasks
    const hasOverdue = dayTasks.some(task => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const taskDue = parseTaskDate(task.due);
            return taskDue < today && task.status !== 'Completed';
        } catch (error) {
            console.error("Error checking overdue status:", error);
            return false;
        }
    });

    return (
        <details
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            className={`day-view ${hasOverdue ? 'overdue' : ''}`}
        >
            <summary className="day-summary">
                <span className="day-title">
                    {dayName} - {formattedDate}
                </span>
                {hasOverdue && (
                    <span className="overdue-indicator">Overdue</span>
                )}
            </summary>

            <div className="tasks">
                {dayTasks.length > 0 ? (
                    <ul className="task-list">
                        {dayTasks.map((task) => (
                            <li
                                key={task.id}  // Changed to use task.id instead of index
                                className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}
                            >
                                <div className="task-content">
                                    <h3 className="task-title">{task.task}</h3>
                                    <div className="task-details">
                                        <p><strong>Priority:</strong> {task.priority}</p>
                                        <p><strong>Due:</strong> {task.due}</p>
                                        <p><strong>Status:</strong> {task.status}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-tasks">No tasks for this day</p>
                )}
            </div>
        </details>
    );
};

export default DayView;