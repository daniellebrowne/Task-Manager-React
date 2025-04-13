const Filters = ({ activeFilter, setFilter }) => {
    //Filter configuration array
    const filterOptions = [
        { value: 'all', label: 'All Tasks' },
        { value: 'completed', label: 'Completed' },
        { value: 'highPriority', label: 'High Priority' }
    ];

    return (
        <div className="navigation-buttons" role="group" aria-label="Task filters">
            {filterOptions.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value)}
                    className={activeFilter === option.value ? 'active' : ''}
                    aria-pressed={activeFilter === option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default Filters;