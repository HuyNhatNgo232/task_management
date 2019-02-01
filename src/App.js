import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
      taskEditing: null,
      filterName: '',
      filterStatus: -1,
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    };
  }

  onAddingTask = () => {
    // if (this.state.isDisplayForm && this.state.taskEditing !== null) {
    //   this.setState({
    //     isDisplayForm: true,
    //     taskEditing: null
    //   })
    // } else {
    //   this.setState({
    //     isDisplayForm: true,
    //     taskEditing: null
    //   })
    // }
    this.props.onToggleForm()
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  // onUpdateStatus = (id) => {
  //   var { tasks } = this.state;
  //   var index = this.findIndex(id);
  //   if (index !== -1) {
  //     tasks[index].status = !tasks[index].status
  //     this.setState({
  //       tasks: tasks
  //     })
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //   }
  // }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    this.onCloseForm();
  }

  onEdit = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id)
    var taskEditing = tasks[index]
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm()
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });

    return result;
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filterName: filterName,
      filterStatus: filterStatus
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    });
  }

  render() {
    var { 
      taskEditing, 
      // filterName, 
      // filterStatus, 
      // keyword, 
      sortBy, 
      sortValue 
    } = this.state;
 
    // tasks = tasks.filter((task) => {
    //   if (filterStatus === -1) {
    //     return task
    //   } else {
    //     return task.status === (filterStatus === 1 ? true : false)
    //   }
    // });



    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1
    //   })
    // }

    // if(sortBy === "name"){
    //   tasks.sort((a, b) => {
    //     if(a.name > b.name) return sortValue;
    //     else if(a.name < b.name) return sortValue;
    //     else return 0;
    //   })
    // }else{
    //   tasks.sort((a, b) => {
    //     if(a.status > b.status) return -sortValue;
    //     else if(a.status < b.status) return sortValue;
    //     else return 0;
    //   })
    // }

    var { isDisplayForm } = this.props;

    var elementTaskForm = isDisplayForm
      ? <TaskForm
        task={taskEditing}
      />
      : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Task Management</h1><hr />
        </div>
        <div className="row">
          {/* Form */}
          {elementTaskForm}
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onAddingTask}>
              <span className="fa fa-plus mr-5"></span> Adding Task
            </button>
            {/* Search - Sort */}
            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            {/* List */}
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isDisplayForm: state.isDisplayForm
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
