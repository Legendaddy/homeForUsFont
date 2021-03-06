import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["xls", "xlsx"];

function ImportOperation() {
    const [file, setFile] = useState(null);
    const handleChange = file => {
        setFile(file);
    };
    return (
        <FileUploader 
        handleChange={handleChange} 
        name="file" 
        types={fileTypes} 
    />
    )
};

export default ImportOperation
