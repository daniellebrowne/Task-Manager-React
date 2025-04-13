import PropTypes from 'prop-types'; 

const WeekNavigation = ({ startDate, setStartDate }) => {
    const navigateWeek = (days) => {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + days);
        setStartDate(newDate);
    };

    return (
        <div className="week-navigation" role="navigation" aria-label="Week navigation">
            <button
                onClick={() => navigateWeek(-7)}
                aria-label="Previous week"
            >
                Previous Week
            </button>
            <button
                onClick={() => navigateWeek(7)}
                aria-label="Next week"
            >
                Next Week
            </button>
        </div>
    );
};


WeekNavigation.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    setStartDate: PropTypes.func.isRequired
};

export default WeekNavigation;