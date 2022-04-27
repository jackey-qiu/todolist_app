//cal elapsted time for scheduling the timeout event
const calTime = (data) => {
    const elapst = new Date(data.starttime) - new Date();
    if (elapst < 120000 && elapst > 0) {
        return 0;
    }
    else if (elapst < 0) {
        return 10000000000;
    }
    else {
        return elapst - 120000;
    }
};

const calTimePassEvent = (data) => {
    const elapst = new Date(data.starttime) - new Date();
    if (elapst > 0) {
        return elapst + 120000;
    }
    else if (elapst < 0) {
        return 0;
    }
};

function scheduleEvent(data, idRef, idPassRef, setUrgents, setPassEvents) {
    //reset the idref to empty array for storing timeout ids

    idRef.current = [];
    idPassRef.current = [];
    data.forEach((each, i) => {
        //change the urgent states witin timeout elaps
        const id = setTimeout(
            () => {
                setUrgents(pev => { return [...pev].map((each_, i_) => (i === i_ ? true : each_)) });
            },
            calTime(each) + 1000);
        idRef.current.push(id);
    });
    data.forEach((each, i) => {
        //change the urgent states witin timeout elaps
        const id = setTimeout(
            () => {
                setPassEvents(pev => { return [...pev].map((each_, i_) => (i === i_ ? true : each_)) });
            },
            calTimePassEvent(each));
        idPassRef.current.push(id);
    });
};

export {scheduleEvent}