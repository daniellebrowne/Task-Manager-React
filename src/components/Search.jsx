import { useState, useEffect, useRef } from 'react';

const Search = ({ searchQuery, setSearchQuery, tasks }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const searchRef = useRef(null);

    // Close popup 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter tasks based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTasks([]);
            return;
        }

        const results = tasks.filter(task =>
            task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.status.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredTasks(results);
        setShowPopup(results.length > 0 || searchQuery.trim() !== '');
    }, [searchQuery, tasks]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-container" ref={searchRef}>
            <input
                type="text"
                id="searchBar"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for tasks..."
                onFocus={() => searchQuery && setShowPopup(true)}
                aria-label="Search tasks"
                aria-haspopup="true"
                aria-expanded={showPopup}
            />

            {showPopup && (
                <div className="search-popup" role="dialog" aria-modal="true">
                    {filteredTasks.length > 0 ? (
                        <ul className="search-results">
                            {filteredTasks.map(task => (
                                <li key={task.id} className="search-result-item">
                                    <div className="task-info">
                                        <h4>{task.task}</h4>
                                        <div className="task-meta">
                                            <span>Priority: {task.priority}</span>
                                            <span>Status: {task.status}</span>
                                        </div>
                                        <div className="task-due">Due: {task.due}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-results">
                            {searchQuery ? "No matching tasks found" : "Type to search"}
                        </div>
                    )}
                    <button
                        className="close-popup"
                        onClick={() => setShowPopup(false)}
                        aria-label="Close search results"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Search;