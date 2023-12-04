import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
import { FaTrash } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";

const Corps = () => {
    const [corps, setCorps] = useState([]);
    const [parentFaculties, setParentFaculties] = useState([]);
    const [initialCorpus, setInitialCorpus] = useState([]);
    const [editedCorpus, setEditedCorpus] = useState([]);
    const [newCorpus, setNewCorpus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:8080/api/corps`, {
                headers: { 'ngrok-skip-browser-warning': 'true' },
            });
            setCorps(response.data);
            const responseFaculties = await axios.get(`http://localhost:8080/api/faculties`, {
                headers: { 'ngrok-skip-browser-warning': 'true' },
            });
            setParentFaculties(responseFaculties.data);
            const clonedCorpus = JSON.parse(JSON.stringify(response.data));
            setInitialCorpus(clonedCorpus);
            setIsLoading(false);
        };
        fetch();
    }, []);

    const handleChange = (e, corpusId) => {
        const { name, value } = e.target;
        const list = [...corps];
        const index = list.findIndex((corpus) => corpus.id === corpusId);
        list[index][name] = value;
        setCorps(list);
        if (!editedCorpus.includes(corpusId)) {
            setEditedCorpus([...editedCorpus, corpusId]);
        }
    };

    const handleCancel = () => {
        setCorps([...initialCorpus]);
        setEditMode(false);
    };

    const handleSave = async () => {
        for (const corpusId of editedCorpus) {
            const corpus = corps.find(corpus => corpus.id === corpusId);
            await axios.patch(`http://localhost:8080/api/corps/${corpus.id}`, corpus);
        }
        for (const corpus of newCorpus) {
            const response = await axios.post(`http://localhost:8080/api/corps`, corpus);
            corpus.id = response.data.id;
        }
        setNewCorpus([]);
        setEditedCorpus([]);
        const response = await axios.get(`http://localhost:8080/api/corps`);
        setCorps(response.data);
        return true;
    };

    const handleAdd = () => {
        const corpus = { name: "", location: "", parentFaculty: parentFaculties[0] };
        setCorps([...corps, corpus]);
        setNewCorpus([...newCorpus, corpus])
    };

    const handleDelete = async (corpusId) => {
        await axios.delete(`http://localhost:8080/api/corps/${corpusId}`);
        setCorps(corps.filter((corpus) => corpus.id !== corpusId));
        setInitialCorpus(initialCorpus.filter((corpus) => corpus.id !== corpusId));
    };

    return (
        <div className="table-container">
            <table className="tableStyle">
                <thead>
                <tr>
                    <th className="tableHeaderStyle">Название подразделения</th>
                    <th className="tableHeaderStyle">Местоположение</th>
                    <th className="tableHeaderStyle">Главный факультет</th>
                </tr>
                </thead>
                {
                    !isLoading &&
                    <tbody>
                    {corps.map((corpus, index) => (
                        <tr key={corpus.id || `corpus-${index}`}>
                            {editMode ?
                                <>
                                    <td className="tableDataStyle">
                                        <input
                                            className="inputStyle"
                                            type="text"
                                               name="name"
                                               value={corpus.name}
                                               onChange={e => handleChange(e, corpus.id)}
                                        />
                                    </td>
                                    <td className="tableDataStyle">
                                        <input
                                            className="inputStyle"
                                            type="text"
                                               name="location"
                                               value={corpus.location}
                                               onChange={e => handleChange(e, corpus.id)}
                                        />
                                    </td>
                                    <td className={editMode ? "tableDataStyle tableDataStyleWithButton" : "tableDataStyle"}>
                                        <select
                                            defaultValue={corpus.parentFaculty.name}
                                            onChange={e => handleChange(e, corpus.id)}
                                        >
                                            {parentFaculties.map((fac, index) => (
                                                <option key={index} value={fac.name}>
                                                    {fac.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleDelete(corpus.id)} className="deleteButton">
                                            <FaTrash color="red" />
                                        </button>
                                    </td>
                                </> :
                                <>
                                    <td className="tableDataStyle">{corpus.name}</td>
                                    <td className="tableDataStyle">{corpus.location}</td>
                                    <td className="tableDataStyle">{corpus.parentFaculty.name}</td>
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

export default Corps;