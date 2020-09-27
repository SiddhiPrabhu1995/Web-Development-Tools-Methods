import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function timer() {
            savedCallback.current();
        }

        let id = setInterval(timer, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;