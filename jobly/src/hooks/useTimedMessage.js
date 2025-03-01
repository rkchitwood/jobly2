import { useRef, useState, useEffect } from 'react';

/** custom hook for managing flash messages */

function useTimedMessage(timeInMsec = 3000){
    const [active, setActive] = useState(false);
    const messageShownRef = useRef(false);
    useEffect(
        function showSavedMessage(){
            if(active && !messageShownRef.current){
                messageShownRef.current = true;
                setTimeout(function removeMessage(){
                    setActive(false);
                    messageShownRef.current = false;
                }, timeInMsec);
            }
        },
        [active, timeInMsec]
    );
    return [active, setActive];
}
export default useTimedMessage;