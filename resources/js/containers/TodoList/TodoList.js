import React, { Component } from "react";
import "./TodoList.css";

import "axios";

import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";

class TodoList extends Component {
    constructor() {
        super();

        this.state = {
            tasks: [],
            task: {
                title: "",
                due_date: ""
            },
        };

        this.taskFormChangedHandler = this.taskFormChangedHandler.bind(this);
        this.addTaskHandler = this.addTaskHandler.bind(this);
        this.taskUpdateHandler = this.taskUpdateHandler.bind(this);
        this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
    }

    componentDidMount() {
        axios.post("/api/tasks", { user_id: userID }).then((response) => {
            this.setState({
                tasks: response.data.tasks,
            });
        });
    }

    taskFormChangedHandler(event) {
        console.log(event.target.id);
        var data = this.state;
        data['task'][event.target.id] = event.target.value;
        console.log(data);
        this.setState(data);
    }


    // Handler for task addition.
    addTaskHandler(event) {
        event.preventDefault();

        let params = { title: this.state.task.title, due_date: this.state.task.due_date, done: 0, user_id: userID };
        console.log('sdf');
        axios.post("/api/task/add/", params).then((response) => {
            if (response.data.success) {
                axios
                    .post("/api/tasks", { user_id: userID })
                    .then((response) => {
                        this.setState({
                            tasks: response.data.tasks,
                            task: { title: "" , due_date: ""},
                        });
                    });
            }
        });
    }

    taskUpdateHandler(event) {
        let id = event.currentTarget.getAttribute("id");
        let url = "/api/task/update/" + id;

        axios
            .post(url)
            .then((response) => {
                axios
                    .post("/api/tasks", { user_id: userID })
                    .then((response) => {
                        console.log(response.data);
                        this.setState({
                            tasks: response.data.tasks,
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteTaskHandler(event) {
        let id = event.currentTarget.getAttribute("id");
        let url = "/api/task/delete/" + id;

        axios
            .post(url)
            .then((response) => {
                axios
                    .post("/api/tasks", { user_id: userID })
                    .then((response) => {
                        this.setState({
                            tasks: response.data.tasks,
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="wrapper">
                <AddTaskForm
                    changed={this.taskFormChangedHandler}
                    submitted={this.addTaskHandler}
                    title={this.state.task.title}
                    due_date={this.state.task.due_date}
                />

                <TaskList
                    tasks={this.state.tasks}
                    marker={this.taskUpdateHandler}
                    delete={this.deleteTaskHandler}
                />
            </div>
        );
    }
}

export default TodoList;
