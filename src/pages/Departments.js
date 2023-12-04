import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
import { FaTrash } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [parentFaculties, setParentFaculties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialDepartments, setInitialDepartments] = useState([]);
    const [editedDepartments, setEditedDepartments] = useState([]);
    const [newDepartments, setNewDepartments] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8080/api/departments`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            setDepartments(response.data);
            const responseFaculties = await axios.get(`http://localhost:8080/api/faculties`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            setParentFaculties(responseFaculties.data);
            // Clone departments
            const clonedDepartments = JSON.parse(JSON.stringify(response.data));
            setInitialDepartments(clonedDepartments);

            setIsLoading(false);
        };
        fetch();
    }, []);

    const handleChange = (e, departmentId) => {
        const { name, value } = e.target;
        const index = departments.findIndex((dep) => dep.id === departmentId);
        const list = [...departments];
        list[index][name] = value;
        setDepartments(list);

        // Add departmentId to editedDepartments if it's not there already
        if (!editedDepartments.includes(departmentId)) {
            setEditedDepartments([...editedDepartments, departmentId]);
        }
    };

    const handleCancel = () => {
        setDepartments([...initialDepartments]);
        setEditMode(false);
    };
    const handleSave = async () => {
        // Validate fields before saving
        if (departments.some(department => department.name.trim() === "")) {
            alert("Поле не может быть пустым");
            return false;
        }

        // Check for duplicate department names
        const names = departments.map(department => department.name).filter(name => name && name.trim());
        if (new Set(names).size !== names.length) {
            alert("Название отдела не может повторяться");
            return;
        }

        // Process edited departments
        for (const departmentId of editedDepartments) {
            const department = departments.find((department) => department.id === departmentId);
            if (department.id) {
                // Edited existing department - PATCH request
                await axios.patch(`http://localhost:8080/api/departments/${department.id}`, department);
            }
        }
        // Process new departments
        for (const newDepartment of newDepartments) {
            if (newDepartment.name.trim() !== "") {
                const response = await axios.post(`http://localhost:8080/api/departments`, newDepartment);
                // Update id of the new department here with the id from the response, if your server provides it
                newDepartment.id = response.data.id;
            } else {
                alert("Поле не может быть пустым");
            }
        }
        setNewDepartments([]); // Reset newDepartments
        setEditedDepartments([]); // Reset editedDepartments

        // Refetching departments to reflect changes
        const response = await axios.get(`http://localhost:8080/api/departments`);
        setDepartments(response.data);

        return true;
    };

    const handleAdd = () => {
        // no need for id generation in front end
        const newDepartment = { name: "", parentFaculty: parentFaculties[0] };  // Adding the default parentFaculty here
        setDepartments([...departments, newDepartment]);
        setNewDepartments([...newDepartments, newDepartment]); // add new department to newDepartments.
    };

    const handleDelete = async (departmentId) => {
        await axios.delete(`http://localhost:8080/api/departments/${departmentId}`);
        setDepartments(departments.filter((department) => department.id !== departmentId));
        setInitialDepartments(initialDepartments.filter((department) => department.id !== departmentId));
        // If you have separate state for showing departments, apply filter there too.
    };
    return (
        <div className="table-container">
            <table className="tableStyle">
                <thead>
                <tr>
                    <th className="tableHeaderStyle">Название подразделения</th>
                    <th className="tableHeaderStyle">Главный факультет</th>
                </tr>
                </thead>
                {
                    !isLoading &&
                    <tbody>
                    {departments.map((department, index) => (
                        <tr key={department.id || `department-${index}`}>
                            {editMode ?
                                <>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        type="text"
                                        name="name"
                                        value={department.name}
                                        onChange={e => handleChange(e, department.id)}
                                    />
                                </td>
                                <td className={editMode ? "tableDataStyle tableDataStyleWithButton" : "tableDataStyle"}>
                                    <select defaultValue={department.parentFaculty.name} onChange={e => handleChange(e, department.id)} className="selectStyle">
                                        {parentFaculties.map((fac, index) => (
                                            <option key={index} value={fac.name}>
                                                {fac.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleDelete(department.id)} className="deleteButton">
                                        <FaTrash color="red" />
                                    </button>
                                </td>
                                </> :
                                <>
                                    <td className="tableDataStyle">{department.name}</td>
                                    <td className="tableDataStyle">{department.parentFaculty.name}</td>
                                </>
                            }
                        </tr>
                    ))}
                    </tbody>
                }
            </table>
            {isLoading &&
                <div className='loader-container'>
                    <BeatLoader color={"#123abc"} loading={isLoading} size={15} />
                </div>
            }
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
};

export default Departments;