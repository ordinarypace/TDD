let Conference = Conference || {};

Conference.attendee = (firstName, lastName) => {
    let checkedIn = false;
    let first = firstName || 'None';
    let last = lastName || 'None';

    const getFullName = () => {
        return `${last}${first}`;
    };

    const isCheckedIn = () => {
        return checkedIn;
    };

    const checkIn = () => {
        checkedIn = true;
    };

    return {
        getFullName : getFullName,
        isCheckedIn : isCheckedIn,
        checkIn : checkIn
    };
};

Conference.attendeeCollection = () => {
    let attendees = [];

    const contains = (attendee) => {
        return attendees.indexOf(attendee);
    };

    const add = (attendee) => {
        if(contains(attendee) === -1){
            attendees.push(attendee);
        }
    };

    const remove = (attendee) => {
        let index = contains(attendee);
        if(index > -1){
            attendees.splice(index, 1);
        }
    };

    const getCount = () => {
        return attendees.length;
    };

    const iterate = (callback) => {
        attendees.forEach(callback);
    };

    return {
        contains : contains,
        add : add,
        remove : remove,
        getCount : getCount,
        iterate : iterate
    }
}

export default Conference;
