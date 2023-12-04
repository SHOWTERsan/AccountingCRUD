import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
import { FaTrash } from "react-icons/fa";

const Faculties = () => {
    const [faculties, setFaculties] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [initialFaculties, setInitialFaculties] = useState([]);
    const [editedFaculties, setEditedFaculties] = useState([]);
    const [newFaculties, setNewFaculties] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8080/api/faculties`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            const facultiesFromServer = response.data;
            setFaculties(facultiesFromServer);

            // Clone faculties
            const clonedFaculties = JSON.parse(JSON.stringify(facultiesFromServer));
            setInitialFaculties(clonedFaculties);

            setIsLoading(false);
        };
        fetch();
    }, []);

    const handleChange = (e, facultyId) => {
        const { name, value } = e.target;
        const index = faculties.findIndex((faculty) => faculty.id === facultyId);
        const list = [...faculties];
        list[index][name] = value;
        setFaculties(list);

        // Add facultyId to editedFaculties if it's not there already
        if (!editedFaculties.includes(facultyId)) {
            setEditedFaculties([...editedFaculties, facultyId]);
        }
    };

    const handleCancel = () => {
        setFaculties([...initialFaculties]);
        setEditMode(false);
    };

    const handleAdd = () => {
        // no need for id generation in front end
        const newFaculty = { name: "" };
        setFaculties([...faculties, newFaculty]);
        setNewFaculties([...newFaculties, newFaculty]); // add new faculty to newFaculties.
    };
    const handleDelete = async (facultyId) => {
        await axios.delete(`http://localhost:8080/api/faculties/${facultyId}`);
        setFaculties(faculties.filter((faculty) => faculty.id !== facultyId));
        setInitialFaculties(initialFaculties.filter((faculty) => faculty.id !== facultyId));
        // If you have separate state for showing faculties, apply filter there too.
    };
    const handleSave = async () => {
        // Validate fields before saving
        if (faculties.some(faculty => faculty.name.trim() === "")) {
            alert("Поле не может быть пустым");
            return false;
        }

        // Check for duplicate faculty names
        const names = faculties.map(faculty => faculty.name).filter(name => name && name.trim());
        if (new Set(names).size !== names.length) {
            alert("Название факультета не может повторяться");
            return;
        }

        for (const facultyId of editedFaculties) {
            const faculty = faculties.find((faculty) => faculty.id === facultyId);
            if (faculty.id) {
                // Edited existing faculty - PATCH request
                await axios.patch(`http://localhost:8080/api/faculties/${faculty.id}`, faculty);
            }
        }
        // Process new faculties
        for (const newFaculty of newFaculties) {
            if (newFaculty.name.trim() !== "") {
                const response = await axios.post(`http://localhost:8080/api/faculties`, newFaculty);
                // Update id of the new faculty here with the id from the response, if your server provides it
                newFaculty.id = response.data.id;
            } else {
                alert("Поле не может быть пустым");
            }
        }
        setNewFaculties([]); // Reset newFaculties
        setEditedFaculties([]); // Reset editedFaculties
        return true;
    };
    return (
        <div className="table-container">
            <table className="tableStyle">
                <thead>
                <tr>
                    <th className="tableHeaderStyle">Название факультета</th>
                </tr>
                </thead>
                {
                    !isLoading &&
                    <tbody>
                    {faculties.map((faculty, index) => (
                        <tr key={faculty.id || `faculty-${index}`}>
                            <td className={editMode ? "tableDataStyle tableDataStyleWithButton" : "tableDataStyle"}>
                                {editMode ?
                                    <>
                                        <input
                                            className="inputStyle"
                                            type="text"
                                            name="name"
                                            value={faculty.name}
                                            onChange={e => handleChange(e,faculty.id)}
                                        />
                                        <button onClick={() => handleDelete(faculty.id)} className="deleteButton">
                                            <FaTrash color="red" />
                                        </button>
                                    </> :
                                    faculty.name}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                }
            </table>
            <div className="button-group">
                <button className="buttonStyle" onClick={async () => {
                    const isSuccess = await handleSave();
                    if (isSuccess) setEditMode(!editMode);
                }}>{editMode ? "Сохранить" : "Редактировать"}</button>
                {editMode && <button className="addButtonStyle" onClick={handleAdd}>Добавить</button>}
                {editMode && <button className="buttonStyle" onClick={handleCancel}>Отменить</button>}
            </div>
        </div>
    );
}

export default Faculties;