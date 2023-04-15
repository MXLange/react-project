
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


const TodoList = () => {

    const [tasks, setTasks] = useState([]);

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema)
    });
    

    function onSubmit(data) {
        if (localStorage.getItem("array")) {
            setTasks(JSON.parse(localStorage.getItem("array")));
        }
        if(tasks.length > 0) {
            data.id = parseInt(tasks[tasks.length -1].id) + 1;
        } else {
            data.id = 0;
        }
        toString(data.id);
        setTasks([...tasks, data]);
        reset();
    }
    
    function editTask(item) {
        
    }
    
    function deleteTask(id) {
        const newList = tasks.filter((task) => parseInt(task.id) != parseInt(id));
        setTasks(newList);
    }
    
    useEffect(() => {
        localStorage.setItem("array", JSON.stringify(tasks));
    }, [tasks])

    return(
        <div id="todo-list">
            <div id="todo-form">
                <h1>Create your task</h1>
                <form className="task" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="todo-name">Name: </label>
                    <span className="error">{errors?.name?.message}</span>
                    <input type="text" id="todo-name" {...register("name")}/>
                    <label htmlFor="todo-description">Description: </label>
                    <span className="error">{errors?.description?.message}</span>
                    <textarea id="todo-description" cols="30" rows="10" {...register("description")}></textarea>
                    <label htmlFor="todo-deadline">Deadline: </label>
                    <span className="error">{errors?.date?.message}</span>
                    <input type="text" id="todo-deadline" placeholder="dd/mm/yyyy" {...register("date")}/>
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
                        <button type="button" id="edit-task" onClick={editTask(item.description)}>Edit</button>
                        <button type="button" id="delete-task" onClick={() => deleteTask(item.id)}>Delete</button>
                    </li>
                )) : (
                    <div id="empty-list">
                        <p>Empty List...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TodoList;