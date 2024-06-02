import { useRef, useState } from "react"

export const useDebounce = (defaultValue, timing = 300) => {
    const timeRef = useRef();
    const  [value, _setValue] = useState(defaultValue);
    console.log(value)

    const setValue = (value) => {
        if(timeRef.current){
            clearTimeout(timeRef.current)
        }
        timeRef.current = setTimeout(() => {
            _setValue(value);
            timeRef.current = null;
        }, timing)
    }
    return [value, setValue]
} 