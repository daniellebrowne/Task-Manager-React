import { useState, useEffect } from 'react';
import WeekNavigation from '../components/WeekNavigation';
import DayView from '../components/DayView';
import Filters from '../components/Filters';
import Search from '../components/Search';
import { initialTasks } from '../data/tasks';

// Date parsing utility
const parseTaskDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
};

const Home = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Load tasks
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        setTasks(savedTasks || initialTasks);
    }, []);

    // Save tasks
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'highPriority') {
            return parseInt(task.priority.split(' - ')[0]) <= 3;
        }
        if (filter === 'completed') {
            return task.status === 'Completed';
        }
        return true;
    });

    // Search tasks
    const searchedTasks = searchQuery
        ? filteredTasks.filter(task =>
            task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.desc && task.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
            task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filteredTasks;

    // Get tasks for specific date
    const getTasksForDate = (date) => {
        return searchedTasks.filter(task => {
            const taskDate = parseTaskDate(task.due);
            return taskDate.toDateString() === date.toDateString();
        });
    };

    // Calculate week end date
    const weekEndDate = new Date(startDate);
    weekEndDate.setDate(startDate.getDate() + 6);

    return (
        <div className="container">
            <header>
                <h1 className="header-title">Task List</h1>
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    tasks={filteredTasks}
                />
                <WeekNavigation
                    startDate={startDate}
                    setStartDate={setStartDate}
                />
            </header>

            <Filters
                activeFilter={filter}
                setFilter={setFilter}
            />

            <div className="week-range">
                {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
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
};

export default Home;