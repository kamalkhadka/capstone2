import { useState } from "react";

const useFormData = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((formData) => ({...formData, [name]: value}));
    };

    return [formData, handleChange, setFormData];
}

export default useFormData;