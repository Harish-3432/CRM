import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import { getTask } from "../Services/Services";
// import { Circles } from "react-loader-spinner";
import TaskForm from "./TaskForm";
import FilterTask from "./FilterTask";
import { deleteTask } from "../Services/Services";
// import { fetchTask } from "../store/Slices/taskSlices";
// import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "./NoDataFound";


export default function Tasks() {
  const [taskData, setTaskData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [editInputToggle, setEditInputToggle] = useState(false);
  const [rowIndex, setRowIndex] = useState();
  const [editDataSave, setEditDataSave] = useState({ task: "" });
  const [previousTask, setPreviousTask] = useState();
  const [searchedValue, setSearchedValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [complete_count, setComplete_count] = useState([]);
  // const [pending_count, setPending_count] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);


  // const dispatch = useDispatch();
  // var tableData = useSelector((state)=>state?.task?.task)
  // var state = useSelector((state)=>state?.task)



  const filerProductList = taskData?.filter((item) => {
    if (filterValue === "completed") {
      return item.status === "completed";
    } else if (filterValue === "pending") {
      return item.status === "pending";
    } else {
      return item;
    }
  });


    useEffect(() => {
        // let completed_task = tableData?.filter((item) => {
        //  return item.status === "completed";
      //    });
      // dispatch(fetchTask(setComplete_count(completed_task.length)))
      // state.error && toast.error("error")

    getTask()
      .then((res) => {
        setDataLoaded(true)
        setTaskData(res.data);
        let completed_task = res.data?.filter((item) => {
          return item.status === "completed";
        });
        setComplete_count(completed_task.length);

        // let pending_task = res.data?.filter((item) => {
        //   return item.status === "pending";
        // });
        // setPending_count(pending_task.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataLoaded, fetch]);


  const handleCheck = (item) => {
    toast.success("Task Completed", { autoClose: 200 });
    axios
      .patch("http://localhost:4300/tasks/" + item.id, {
        status: "completed",
      })
      .then((res) => {
        setFetch(!fetch);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (item) => {
    toast.error("Task deleted", { autoClose: 200 });
    deleteTask(item.id)
      .then((res) => {
        setFetch(!fetch);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  




  const handleEdit = (index, item) => {
    toast.success("Edit Mode", { autoClose: 200 });
    setPreviousTask(item);
    setEditInputToggle(true);
    setRowIndex(index);
  };

  const handleCancel = () => {
    setEditInputToggle(false);
  };

  const handleEditChange = (e) => {
    const { task, value } = e.target;
    switch (task) {
      case task:
        setEditDataSave((prev) => ({ ...prev, task: value }));
        break;
      default:
        break;
    }
  };

  const handleEditSave = () => {
    toast.success("Saved", { autoClose: 200 });
    axios
      .put("http://localhost:4300/tasks/" + previousTask.id, {
        task: editDataSave.task ? editDataSave.task : previousTask.task,
        status: editDataSave.status ? editDataSave.status : previousTask.status,
      })
      .then((res) => {
        setEditInputToggle(false);
        setFetch(!fetch);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    setSearchedValue(e.target.value);
  };

  const handleFilterValueChanged = (eve) => {
    setFilterValue(eve);
  };

  

  return (
    <>
      <div className="task-container">
        <div className="task-table">
          <div className="btn-container-table">
            <button
              className="btn-task btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add Task
            </button>
          </div>

          {/* toggle && toggle ? (
            <TaskForm setToggle={setToggle} />
          ) : ( */}
            <>
              <div className="data_show">
              <div className="search-task">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
                <div>
                  <FilterTask filterValueSelected={handleFilterValueChanged} />
                </div>
                <h4>All Tasks : {taskData?.length} </h4>
                <h4 style={{ color: "green" }}>
                  Completed Tasks : {complete_count}
                </h4>
                <h4 style={{ color: "#ffd43b" }}>
                  Pending Tasks : {taskData.length-complete_count}
                </h4>
              </div>

              {/* { state && state.loading ? 
             (<Circles
             height="50"
             width="50"
             color="#4fa94d"
             ariaLabel="circles-loading"
             wrapperStyle={{
             }}
             wrapperClass=""
             visible={true}
           />)
           :
              ( */}
              <table className="table-main">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>Sr. No.</th>
                    <th style={{ width: "250px" }}>Task</th>
                    <th style={{ width: "150px" }}>Mark</th>
                    <th style={{ width: "150px" }}>status</th>
                    <th style={{ width: "30px" }}>Edit</th>
                    <th style={{ width: "30px" }}>
                      {editInputToggle ? "Cancel" : "Delete"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filerProductList
                    ?.filter((item) => {
                      return item.task.toLowerCase().includes(searchedValue);
                    })
                    .map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}.</td>
                          <td
                            style={
                              item.status === "completed"
                                ? { textDecoration: "line-through" }
                                : { color: "black" }
                            }
                          >
                            {editInputToggle && rowIndex === index ? (
                              <input
                                task="task"
                                onChange={(e) => handleEditChange(e)}
                                defaultValue={item.task}
                              />
                            ) : (
                              item.task
                            )}
                          </td>
                          <td>
                            <input
                              id="check"
                              onClick={() => handleCheck(item)}
                              disabled={
                                item.status === "completed" || editInputToggle
                              }
                              checked={item.status==="completed"}
                              type="checkbox"
                            />
                          </td>
                          <td>
                            <p
                              className="label-1"
                              style={
                                item.status === "completed"
                                  ? { color: "green" }
                                  : { color: "#ffd43b" }
                              }
                              htmlFor="check"
                            >
                              {item?.status}
                            </p>
                          </td>
                          {editInputToggle && rowIndex === index ? (
                            <>
                              <td>
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    padding: "6px",
                                  }}
                                  className="btn-primary"
                                  onClick={() => handleEditSave()}
                                >
                                  <i className="fa-solid fa-check"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "red",
                                    padding: "6px",
                                  }}
                                  className="btn-delete"
                                  onClick={() => handleCancel()}
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>
                                <button
                                  disabled={item.status === "completed"}
                                  style={
                                    item.status === "completed"
                                      ? {
                                          backgroundColor: "grey",
                                          cursor: "not-allowed",
                                        }
                                      : { backgroundColor: "green" }
                                  }
                                  className="edit-btn btn-primary"
                                  onClick={() => handleEdit(index, item)}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "red",
                                    padding: "6px 4px",
                                  }}
                                  className="btn-delete"
                                  onClick={() => handleDelete(item)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                    }
                    
                </tbody>
                {taskData.length===0 && <NoDataFound/>}
              </table>
        {/* )} */}
            </>
          
        </div>
      </div>
      <div>
        {
          showForm && (
            <TaskForm setShowForm={setShowForm} setDataLoaded={setDataLoaded} />
          )
        }
      </div>
      <ToastContainer />
    </>
  );
}
