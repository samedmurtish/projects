let mainText = document.querySelector('.taskList');

let taskLabelValue = '',
    taskDateValue;

let taskList = [],
    completedTaskList = [],
    deletedTaskList = [];

let totalText = '';
let taskObject = {
    title: '',
    date: ''
};

let currentPage = 0; // 0 - all tasks | 1 - completed tasks | 2 - deleted tasks

let currentPageListIndex = 0;

let title = {
    left: '',
    main: '',
    right: ''
}
const titleTemplate = ["Completed Tasks", "Tasks", "Deleted Tasks"]

if (localStorage.getItem("lastPage") != null) {
    currentPage = localStorage.getItem("lastPage");
    currentPage = Number(currentPage);
} else
    currentPage = 0;
updateTitle();

function updateTitle() {
    if (currentPage != 0)
        document.querySelector('.top-grid').classList.add('top-grid-hide');
    else
        document.querySelector('.top-grid').classList.remove('top-grid-hide');

    switch (currentPage) {
        case 0:
            title = {
                left: titleTemplate[0],
                main: titleTemplate[1],
                right: titleTemplate[2]
            }
            break;
        case 1:
            title = {
                left: titleTemplate[1],
                main: titleTemplate[0],
                right: titleTemplate[2]
            }
            break;
        case 2:
            title = {
                left: titleTemplate[1],
                main: titleTemplate[2],
                right: titleTemplate[0]
            }
            break;
    }

    document.querySelector('.tabInfoTitle').innerHTML = `
        <button class="title-left">${title.left}</button>
        <span class="title-main">${title.main}</span>
        <button class="title-right">${title.right}</button>`;

    document.querySelector('.title-left').addEventListener('click', () => {
        if (currentPage == 1 || currentPage == 2)
            currentPage = 0;
        else if (currentPage == 0)
            currentPage = 1;
        updateTitle();
        updateList(currentPage);
    })
    document.querySelector('.title-right').addEventListener("click", () => {
        if (currentPage == 0 || currentPage == 1)
            currentPage = 2;
        else if (currentPage == 2)
            currentPage = 1;
        updateTitle();
        updateList(currentPage);
    })
    localStorage.setItem("lastPage", currentPage);
}

if (localStorage.key("userTaskList"))
    loadList();

function saveList() {
    taskList.forEach((value, index) => {
        let taskDate = value.date;
        let taskTitle = value.title;
        let taskDeleteFrom = value.deleteFrom;
        localStorage.setItem(`dateIndex${index}`, taskDate);
        localStorage.setItem(`titleIndex${index}`, taskTitle);
        localStorage.setItem(`deleteFromIndex${index}`, taskDeleteFrom);
    });
    localStorage.setItem("itemCounter", taskList.length);

    completedTaskList.forEach((value, index) => {
        let taskDate = value.date;
        let taskTitle = value.title;
        let taskDeleteFrom = value.deleteFrom;
        localStorage.setItem(`completedTaskDateIndex${index}`, taskDate);
        localStorage.setItem(`completedTaskTitleIndex${index}`, taskTitle);
        localStorage.setItem(`completedTaskDeleteFromIndex${index}`, taskDeleteFrom);
    });
    localStorage.setItem("completedListItemCounter", completedTaskList.length);

    deletedTaskList.forEach((value, index) => {
        let taskDate = value.date;
        let taskTitle = value.title;
        let taskDeleteFrom = value.deleteFrom;
        localStorage.setItem(`deletedTaskDateIndex${index}`, taskDate);
        localStorage.setItem(`deletedTaskTitleIndex${index}`, taskTitle);
        localStorage.setItem(`deletedTaskDeleteFromIndex${index}`, taskDeleteFrom);
    });
    localStorage.setItem("deletedListItemCounter", deletedTaskList.length);
}

function loadList() {
    let newObject = {
        title: '',
        date: ''
    }
    const itemCounter = localStorage.getItem(`itemCounter`);
    const completedItemCounter = localStorage.getItem(`completedListItemCounter`);
    const deletedItemCounter = localStorage.getItem(`deletedListItemCounter`);

    for (let a = 0; a < itemCounter; a++) {
        let taskDate = localStorage.getItem(`dateIndex${a}`);
        let taskTitle = localStorage.getItem(`titleIndex${a}`);
        let taskDeleteFrom = localStorage.getItem(`deleteFromIndex${a}`);
        newObject = {
            title: taskTitle,
            date: taskDate,
            deleteFrom: taskDeleteFrom
        }
        taskList.push(newObject);
    }
    for (let a = 0; a < completedItemCounter; a++) {
        let taskDate = localStorage.getItem(`completedTaskDateIndex${a}`);
        let taskTitle = localStorage.getItem(`completedTaskTitleIndex${a}`);
        let taskDeleteFrom = localStorage.getItem(`completedTaskDeleteFromIndex${a}`);
        newObject = {
            title: taskTitle,
            date: taskDate,
            deleteFrom: taskDeleteFrom
        }
        completedTaskList.push(newObject);
    }
    for (let a = 0; a < deletedItemCounter; a++) {
        let taskDate = localStorage.getItem(`deletedTaskDateIndex${a}`);
        let taskTitle = localStorage.getItem(`deletedTaskTitleIndex${a}`);
        let taskDeleteFrom = localStorage.getItem(`deletedTaskDeleteFromIndex${a}`);
        newObject = {
            title: taskTitle,
            date: taskDate,
            deleteFrom: taskDeleteFrom
        }
        deletedTaskList.push(newObject);
    }
    updateList(currentPage);
}

function addToList() {
    let currentDate;

    const dateMom = moment();
    const date = dateMom.format('YYYY-MM-DD');
    taskLabelValue = document.getElementById("taskTitle");
    taskDateValue = document.getElementById("taskDate");
    taskName = taskLabelValue.value;

    let taskNameWordList = [];

    let word = '';

    for (let wordCheckIndex = 0; wordCheckIndex <= taskName.length; wordCheckIndex++) {

        word += taskName[wordCheckIndex];

        if (taskName[wordCheckIndex] == ' ' || wordCheckIndex == taskName.length - 1) {
            if (word[0] == ' ')
                word.substring(1, 1);
            taskNameWordList.push(word);
            word = '';
        }
    }

    taskNameWordList.forEach((value) => {
        if (value.length > 20) {
            console.log('value: ' + value);
            taskLabelValue.value = '';
            taskDateValue.value = '';
            taskName = '';
            taskNameWordList = [];
            return;
        }
    });


    if (taskName == '')
        return;
    /*
        for (let firstCheck = 0; firstCheck < taskName.length; firstCheck++) {
            if (taskName.length > 19) {
                if (taskName[firstCheck] == ' ') {
                    for (let secondCheck = firstCheck + 1; secondCheck < 1000; secondCheck++) {
                        if (secondCheck == firstCheck + 1 && taskName[secondCheck] == ' ')
                            continue;

                        if (secondCheck >= 20) {
                            taskLabelValue.value = '';
                            taskDateValue.value = '';
                            return;
                        } else if (taskName[secondCheck] == ' ')
                            break;
                    }
                    break;
                } else if (firstCheck == 20) {
                    taskLabelValue.value = '';
                    taskDateValue.value = '';
                    return;
                }
            }
        }*/

    if (taskDateValue.value == '') {
        currentDate = date;
    } else
        currentDate = taskDateValue.value;

    taskObject = {
        title: taskLabelValue.value,
        date: currentDate
    };
    taskLabelValue.value = '';
    taskDateValue.value = '';
    taskList.push(taskObject);
    updateList(currentPage);
}

function completeTask(itemIndex) {
    taskList.forEach((value, index) => {
        if (index == itemIndex) {
            let completedTaskObject = {};
            completedTaskObject = {
                title: value.title,
                date: value.date,
                deleteFrom: 0
            }
            completedTaskList.push(completedTaskObject);
        }
    });
}

function deleteTask(itemIndex) {
    if (currentPage == 0)
        taskList.forEach((value, index) => {
            if (index == itemIndex) {
                let deletedTaskObject = {};
                deletedTaskObject = {
                    title: value.title,
                    date: value.date,
                    deleteFrom: 0
                }
                deletedTaskList.push(deletedTaskObject);
            }
        });
    else if (currentPage == 1)
        completedTaskList.forEach((value, index) => {
            if (index == itemIndex) {
                let deletedTaskObject = {};
                deletedTaskObject = {
                    title: value.title,
                    date: value.date,
                    deleteFrom: 1
                }
                deletedTaskList.push(deletedTaskObject);
            }
        });
}

function returnTask(itemIndex, deleteFrom) {
    if (deleteFrom == "completedTask") {
        completedTaskList.forEach((value, index) => {
            if (index == itemIndex) {
                taskList.push(value);
            }
        })
    } else {
        deletedTaskList.forEach((value, index) => {
            if (index == itemIndex) {
                if (value.deleteFrom == 0)
                    taskList.push(value)
                else if (value.deleteFrom == 1)
                    completedTaskList.push(value);
            }
        })
    }
}

function updateList(currentPageListIndex) {
    /*
    let mainGrid = document.querySelector('.task-list-overflow');
        const scrollBarActivityClassName = "setScrollBar";

        if (taskList.length <= 6)
            mainGrid.classList.add(scrollBarActivityClassName);
        else
            mainGrid.classList.remove(scrollBarActivityClassName);
    */
    totalText = '';
    if (currentPageListIndex == 0 && taskList.length == 0 ||
        currentPageListIndex == 1 && completedTaskList.length == 0 ||
        currentPageListIndex == 2 && deletedTaskList.length == 0) {
        totalText = `<p style="display:flex; justify-content: center;">List Empty.</p>`;
        document.querySelector('.task-list-overflow').classList.add('hide-scroll-bar');
    } else
        document.querySelector('.task-list-overflow').classList.remove('hide-scroll-bar');
    mainText.innerHTML = totalText;
    if (currentPageListIndex == 0)
        for (let id = 0; id < taskList.length; id++) {
            totalText += `
                         <div id="${id}" class="sortTask">
                             <div class="taskSorter">
                             </div>
                             <div class="taskContent">
                                 <div class="taskName">
                                     <span style="color:rgb(202, 202, 202); font-weight: bold">${id + 1}</span> -
                                     ${taskList[id].title}
                                 </div>
                                 <span class="taskDate">
                                     ${taskList[id].date}
                                 </span>
                                 <div class="taskButtons">
                                     <button class="taskButton removeTaskButton" onclick="

                                     deleteTask(${id});
                                     taskList.splice(${id}, 1);
                                     updateList(${currentPage});

                                     ">
                                         Delete Task
                                     </button>

                                     <button class="taskButton completeTaskButton" onclick="

                                     completeTask(${id});
                                     taskList.splice(${id}, 1);
                                     updateList(${currentPage});

                                     ">
                                         Complete Task
                                     </button>
                                 </div>
                             </div>
                         </div>`;
        }
    else if (currentPageListIndex == 1)
        for (let id = 0; id < completedTaskList.length; id++) {
            totalText += `
                             <div id="${id}" class="sortTask">
                                 <div class="taskSorter">
                                 </div>
                                 <div class="taskContent">
                                     <div class="taskName">
                                         <span style="color:lime; font-weight: bold;
                                         ">${id + 1}</span> -
                                         <span style="color:lime">
                                         ${completedTaskList[id].title}
                                         </span>
                                     </div>
                                     <span class="taskDate">
                                         ${completedTaskList[id].date}
                                     </span>
                                     <div class="taskButtons">
                                        <button class="taskButton removeTaskButton" onclick="

                                            deleteTask(${id});
                                            completedTaskList.splice(${id}, 1);
                                            updateList(${currentPage});

                                        ">
                                            Delete Task
                                        </button>
                                        
                                        <button class="taskButton returnTaskButton" onclick="

                                            returnTask(${id}, 'completedTask');
                                            completedTaskList.splice(${id}, 1);
                                            updateList(${currentPage});

                                        ">
                                            Return Task
                                        </button>
                                     </div>
                                 </div>
                             </div>`;
        }
    else if (currentPageListIndex == 2)
        for (let id = 0; id < deletedTaskList.length; id++) {
            totalText += `
                         <div id="${id}" class="sortTask">
                         <div class="taskSorter">
                         </div>
                         <div class="taskContent">
                             <div class="taskName">
                                 <span style="color:rgb(255, 63, 63); font-weight: bold;
                                 ">${id + 1}</span> -
                                 <span style="color:rgb(255, 63, 63)">
                                 ${deletedTaskList[id].title}
                                 </span>
                             </div>
                             <span class="taskDate">
                                 ${deletedTaskList[id].date}
                             </span>
                             <div class="taskButtons">
                                 <button class="taskButton removeTaskButton" onclick="

                                    deletedTaskList.splice(${id}, 1);
                                    updateList(${currentPage});

                                 ">
                                     Delete Forever
                                 </button>
                                 <button class="taskButton returnTaskButton" onclick="

                                    returnTask(${id});
                                    deletedTaskList.splice(${id}, 1);
                                    updateList(${currentPage});

                                 ">
                                     Return Task
                                 </button>
                             </div>
                         </div>
                     </div>`;
        }
    mainText.innerHTML = totalText;
    saveList();
}