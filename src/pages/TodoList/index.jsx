
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./todoStyle.css";

const taskSchema = yup.object({
    id: yup.string(),
    name: yup.string().required("Please insert a name"),
    description: yup.string().required("Please insert a description"),
    date: yup.string().matches(/\d{2}\/\d{2}\/\d{4}/i, " date must be dd/mm/yyyy")
})

const editedSchema = yup.object({
    editId: yup.string(),
    editName: yup.string().required("Please insert a name"),
    editDescription: yup.string().required("Please insert a description"),
    editDate: yup.string().matches(/\d{2}\/\d{2}\/\d{4}/i, " date must be dd/mm/yyyy")
});


const TodoList = () => {

    const [tasks, setTasks] = useState([]);
    const [editLayer, setEditLayer] = useState(false);

    const { control: controlCreate, register: registerCreate, reset: resetCreate, handleSubmit: handleSubmitCreate, setValue: setValueCreate, formState: { errors: errorsCreate } } = useForm({
        resolver: yupResolver(taskSchema)
    });

    const { control: controlEdit, register: registerEdit, reset: resetEdit, handleSubmit: handleSubmitEdit, setValue: setValueEdit, getValues, formState: { errors: errorsEdit } } = useForm({
        resolver: yupResolver(editedSchema)
    });

    function onSubmit(taskSchema) {
        if(tasks.length > 0) {
            taskSchema.id = parseInt(tasks[tasks.length -1].id) + 1;
        } else {
            taskSchema.id = 0;
        }
        toString(taskSchema.id);
        setTasks([...tasks, taskSchema]);
        resetCreate();
    }

    function onEdit() {
        const id = getValues("editId");
        const tasks = JSON.parse(localStorage.getItem("array"));
        tasks[id].name = getValues("editName");
        tasks[id].description = getValues("editDescription");
        tasks[id].date = getValues("editDate");
        localStorage.setItem("array", JSON.stringify(tasks));
        setEditLayer(false);
        setTasks([...tasks]);
        resetEdit();
    }
    
    const editTask = (id) => {
        const toChange = (tasks.find((item) => item.id === id));
        setEditLayer(true);
        setValueEdit("editId", toChange.id)
        setValueEdit("editName", toChange.name);       
        setValueEdit("editDescription", toChange.description);       
        setValueEdit("editDate", toChange.date);
    }
    
    function deleteTask(id) {
        const newList = tasks.filter((task) => parseInt(task.id) !== parseInt(id));
        setTasks(newList);
    }
    
    useEffect(() => {
        localStorage.setItem("array", JSON.stringify(tasks));
    }, [tasks])

    useEffect(() => {
        if(editLayer === true) {
            const modal = document.getElementById("edit-screen");
    
            modal.addEventListener("click", function(e) {
                if(e.target === this)
                    setEditLayer(false); 
            });
        } 
    }, [editLayer])


    return(
        <div id="todo-list">
            <div id="todo-form">
                <h1>Create your task</h1>
                <form className="task" onSubmit={handleSubmitCreate(onSubmit)}>
                    <label htmlFor="todo-name">Name: </label>
                    <span className="error">{!editLayer && errorsCreate?.name?.message}</span>
                    <input type="text" id="todo-name" {...registerCreate("name")}/>
                    <label htmlFor="todo-description">Description: </label>
                    <span className="error">{!editLayer && errorsCreate?.description?.message}</span>
                    <textarea id="todo-description" cols="30" rows="10" {...registerCreate("description")}></textarea>
                    <label htmlFor="todo-deadline">Deadline: </label>
                    <span className="error">{!editLayer && errorsCreate?.date?.message}</span>
                    <input type="text" id="todo-deadline" placeholder="dd/mm/yyyy" {...registerCreate("date")}/>
                    <button id="todo-button">Create</button>
                </form>
            </div>
            <div id="tasks-list">
                <h2>Tasks List</h2>
                {tasks.length > 0 ? tasks.map((item) => (
                    <li className="index-name" key={item.id}>
                        <p className="name">Name: {item.name}</p>
                        <p className="description">Description: {item.description}</p>
                        <p className="deadline">Deadline: {item.date}</p>
                        <div id="task-div-buttons">
                            <button type="button" id="edit-task" onClick={() => editTask(item.id)}>Edit</button>
                            <button type="button" id="delete-task" onClick={() => deleteTask(item.id)}>Delete</button>
                        </div>
                    </li>
                )) : (
                    <div id="empty-list">
                        <p>Empty List...</p>
                    </div>
                )}
            </div>
                {editLayer ? (
                    <div id="edit-screen">
                        <div id="edit-screen-content">
                            <h1>Edit your form</h1>
                            <form className="task-edit" onSubmit={handleSubmitEdit(onEdit)}>
                                <label htmlFor="todo-edit-name">Name: </label>
                                <span className="error">{errorsEdit?.editName?.message}</span>
                                <input type="text" id="todo-edit-name" {...registerEdit("editName")}/>
                                <label htmlFor="todo-edit-description">Description: </label>
                                <span className="error">{errorsEdit?.editDescription?.message}</span>
                                <textarea id="todo-edit-description" cols="30" rows="10" {...registerEdit("editDescription")} ></textarea>
                                <label htmlFor="todo-edit-deadline">Deadline: </label>
                                <span className="error">{errorsEdit?.editDate?.message}</span>
                                <input type="text" id="todo-edit-deadline" placeholder="dd/mm/yyyy" {...registerEdit("editDate")}/>
                                <button id="todo-button">Save</button>
                            </form>
                        </div>
                    </div>
                ) : <div></div>
                }
        </div>
    );
}

export default TodoList;