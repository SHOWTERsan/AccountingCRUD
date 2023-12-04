import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Styles.css';
import BeatLoader from "react-spinners/BeatLoader";
import Pagination from "react-js-pagination";
import {FaTrash} from "react-icons/fa";

const Rooms = () => {
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [corps, setCorps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialRooms, setInitialRooms] = useState([]);
    const [editedRooms, setEditedRooms] = useState([]);
    const [newRooms, setNewRooms] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            const searchParams = new URLSearchParams(window.location.search);
            let page = searchParams.get('page') ? parseInt(searchParams.get('page'), 10) - 1 : 0;
            page = !isNaN(page) && page >= 0 ? page : 0;

            const responseRooms = await axios.get(`http://localhost:8080/api/rooms?page=${page}&size=10&sort=id,asc`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            const responseCorps = await axios.get('http://localhost:8080/api/corps', {
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            setRooms(responseRooms.data.content || []);
            setCorps(responseCorps.data);
            setTotalItemsCount(responseRooms.data.totalElements);

            const roomsFromServer = responseRooms.data.content;
            setRooms(roomsFromServer);
            // Clone faculties
            const clonedFaculties = JSON.parse(JSON.stringify(roomsFromServer));
            setInitialRooms(clonedFaculties);
            setIsLoading(false);
        };
        fetch();
    }, []);
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        fetchRooms(pageNumber-1);  // fetch rooms for the pageNumber
    };
    const fetchRooms = async (pageNumber) => {
        setIsLoading(true);
        const responseRooms = await axios.get(`http://localhost:8080/api/rooms?page=${pageNumber}&size=${itemsCountPerPage}&sort=id,asc`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
            },
        });
        setRooms(responseRooms.data.content || []);
        setTotalItemsCount(responseRooms.data.totalElements);
        setIsLoading(false);
    }
    const handleChange = (e, roomId) => {
        const { name, value } = e.target;
        const index = rooms.findIndex((room) => room.id === roomId);
        const list = [...rooms];
        list[index][name] = value;
        setRooms(list);

        // Add roomId to editedRooms if it's not there already
        if (!editedRooms.includes(roomId)) {
            setEditedRooms([...editedRooms, roomId]);
        }
    };

    const handleSelectChange = (e, roomId) => {
        const selectedIndex = e.target.options.selectedIndex;
        const selectedCorpsId = e.target.options[selectedIndex].getAttribute('data-id');


        const index = rooms.findIndex((room) => room.id === roomId);
        const list = [...rooms];
        list[index]['corps'] = selectedCorpsId; // Just putting corpsId instead of the whole corps object
        setRooms(list);

        // Add roomId to editedRooms if it's not there already
        if(!editedRooms.includes(roomId)) {
            setEditedRooms([...editedRooms, roomId]);
        }
    };

    const handleAdd = () => {
        const newRoom = { number: "", name: "",floorNumber: "", width: "", length: "", corps: ""  };
        setRooms([...rooms, newRoom]);
        setNewRooms([...newRooms, newRoom]);
    };

    const handleCancel = () => {
        setRooms([...initialRooms]);
        setEditMode(false);
    };

    const handleDelete = async (roomId) => {
        await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
        setRooms(rooms.filter((room) => room.id !== roomId));
        setInitialRooms(initialRooms.filter((room) => room.id !== roomId));
    };

    const handleSave = async () => {
        for (const roomId of editedRooms) {
            const room = rooms.find((room) => room.id === roomId);
            if (room.id) {
                await axios.patch(`http://localhost:8080/api/rooms/${roomId}`, room);
            }
        }

        // Process new rooms
        for (const newRoom of newRooms) {
            if (newRoom.number.trim() !== "" &&
                newRoom.name.trim() !== "" &&
                newRoom.width.trim() !== "" &&
                newRoom.length.trim() !== "") {
                const response = await axios.post('http://localhost:8080/api/rooms', newRoom);
                // Update id of the new room here with the id from the response, if your server provides it
                newRoom.id = response.data.id;
            } else {
                alert("All fields must be filled");
            }
        }
        setNewRooms([]); // Reset newRooms
        setEditedRooms([]); // Reset editedRooms

        // refetch the rooms
        await fetchRooms(activePage-1);
        return true;
    };

    return (
        <div className="table-container">
            <table className="tableStyle">
                <thead>
                <tr>
                    <th className="tableHeaderStyle">Номер помещения</th>
                    <th className="tableHeaderStyle" style={{width: "20%"}}>Название помещения</th>
                    <th className="tableHeaderStyle" style={{width: "10%"}}>Этаж</th>
                    <th className="tableHeaderStyle" style={{width: "10%"}}>Ширина</th>
                    <th className="tableHeaderStyle" style={{width: "10%"}}>Длина</th>
                    <th className="tableHeaderStyle">Название корпуса</th>
                </tr>
                </thead>
                <tbody>
                {!isLoading &&
                    rooms.map((room, index) => (
                        <tr key={room.id || `room-${index}`}>
                            {editMode ?
                                <>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        type="text"
                                        name="number"
                                        value={room.number}
                                        onChange={e => {
                                            if (Number.isInteger(Number(e.target.value))) {
                                                handleChange(e, room.id)
                                            }
                                        }}
                                    />
                                </td>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        style={{width: "70%"}}
                                        type="text"
                                        name="name"
                                        value={room.name}
                                        onChange={e => handleChange(e,room.id)}
                                    />
                                </td>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        type="number"
                                        name="floorNumber"
                                        value={room.floorNumber.id}
                                        onChange={e => {
                                            if (Number.isInteger(Number(e.target.value))) {
                                                handleChange(e, room.id)
                                            }
                                        }}
                                    />
                                </td>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        type="number"
                                        name="width"
                                        value={room.width}
                                        onChange={e => {
                                            if (Number.isInteger(Number(e.target.value))) {
                                                handleChange(e, room.id)
                                            }
                                        }}
                                    />
                                </td>
                                <td className="tableDataStyle">
                                    <input
                                        className="inputStyle"
                                        type="number"
                                        name="length"
                                        value={room.length}
                                        onChange={e => {
                                            if (Number.isInteger(Number(e.target.value))) {
                                                handleChange(e, room.id)
                                            }
                                        }}
                                    />
                                </td>
                                <td className={editMode ? "tableDataStyle tableDataStyleWithButton" : "tableDataStyle"}>
                                    <select defaultValue={room.corps.name} onChange={e => handleSelectChange(e,room.id)} className="selectStyle">
                                        {corps.map((corpus, index) => (
                                            <option key={index} value={corpus.name} data-id={corpus.id}>
                                                {corpus.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleDelete(room.id)} className="deleteButton">
                                        <FaTrash color="red" />
                                    </button>
                                </td>
                                </> :
                                <>
                                    <td className="tableDataStyle">{room.number}</td>
                                    <td className="tableDataStyle">{room.name}</td>
                                    <td className="tableDataStyle">{room.floorNumber.id}</td>
                                    <td className="tableDataStyle">{room.width}</td>
                                    <td className="tableDataStyle">{room.length}</td>
                                    <td className="tableDataStyle">{room.corps.name}</td>
                                </>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading &&
                <div className='loader-container'>
                    <BeatLoader color={"#123abc"} loading={isLoading} size={15} />
                </div>
            }
            {!isLoading &&
                <div className='pagination-box'>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
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

export default Rooms;