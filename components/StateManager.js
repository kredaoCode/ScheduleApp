import React, { useState } from 'react'

const myUseState = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [schedule, setScheduleHandler] = useState({});
  
    return {
        refreshing,
        setRefreshing,
        schedule,
        setScheduleHandler,
    }
}

export default myUseState;