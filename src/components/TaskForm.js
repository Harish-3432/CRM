import React, { useState } from "react";
import "../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { addTask } from "../store/Slices/taskSlices";
// import { fetchTask } from "../store/Slices/taskSlices";
// import axios from 'axios';
import { addTaskk } from "../Services/Services";
// import { useDispatch } from "react";
const initialData = {
  task: "",
  status:"pending"
};

export default function TaskForm({setShowForm,setDataLoaded}) {
  const [task, setTask] = useState(initialData);
  // const dispatch = useDispatch()
  


  const handleInputChange = (e) => {
    const {task,value} = e.target;
    switch(task){
        case task:
            setTask((prev) => ({...prev,task:value}));
            break;
        default:
            break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // dispatch(
    //     addTask(task)
    //   )
    //   dispatch(
    //       fetchTask()
    //     )
        if(!task.task){
          toast.error("Enter Your Task Please")
        }else{
          addTaskk(task).then((res)=>{
            setDataLoaded(false);
            setShowForm(false);
            toast.success("Task Added",{autoClose:200});

      }).catch((err)=>{
        toast.error(err);
      })
    }
  };
  return (
    <>
      <div className="task-main-container">
        <div className="task-form-container">

          <form autoComplete="off" >
            <input
              placeholder="Enter Task"
              id="task-input"
              type="text"
              task="task"
              required
              onChange={handleInputChange}
            /><br/>
            <button 
            className="btn-task-submit" 
            onClick={
              (e)=>{
              handleSubmit(e)
            }
          } 
            type="submit">Add</button>
            <button 
            className="btn-task-submit" 
            onClick={(e)=>{
              setDataLoaded(false)
              setShowForm(false)}
              } >
              Cancel
            </button>

            

          </form>

        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
