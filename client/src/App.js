import React, { useEffect, useState, useRef } from "react";
import { ProgressBar, Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import uploader from "./utils/Uploader";

import "./App.css"

const chunkSize = 1048576 * 3; //its 3MB, increase the number measure in mb
function App() {
    const defaultChunkSize = useRef(1048576 * 3);

    const [showProgress, setShowProgress] = useState(false);
    const [progress, setProgress] = useState(0);
    const [chunkCount, setChunkCount] = useState(0);
    const [filename, setFilename] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [file, setFile] = useState({});
    const [counter, setCounter] = useState(0);
    const [beginChunkSize, setBeginChunkSize] = useState(0);
    const [endChunkSize, setEndChunkSize] = useState(chunkSize);

    const onSubmit = async (e) => {
        e.preventDefault();

        uploader().send(file);
        // setShowProgress(true)
        // const chunk = file.slice(beginChunkSize, endChunkSize);
        // console.log(chunk);
    }

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileSize(selectedFile.size)

        const count = selectedFile.size % defaultChunkSize.current === 0
                    ? selectedFile.size / defaultChunkSize.current
                    : Math.floor(selectedFile.size / defaultChunkSize.current) + 1
        setChunkCount(count)

        setFilename(uuidv4())
        setFile(selectedFile)
        // console.log(selectedFile.size)
    }

    return (
        <div className="App">
            <Form onSubmit={onSubmit}>

                <FormGroup controlId="file">
                    <FormLabel>파일 업로드</FormLabel>
                    <FormControl type="file" onChange={onFileChange} />
                </FormGroup>
                {showProgress ? <ProgressBar animated={true} label={progress} /> : null}
                <Button type="submit">제출</Button>
            </Form>
        </div>
    );
}

export default App;
