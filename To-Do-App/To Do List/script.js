document.addEventListener
("DOMContentLoaded", () => {
    //accesing the element
    const taskInput = document.getElementById
    ("new-task");
    const addTaskButton = document.getElementById("add-task-button");
    const apiurl = "https://jsonplaceholder.typicode.com/todos";
    const taskList = document.getElementById("task-list");

    //EventListener to add an element
    addTaskButton.addEventListener("click", function () {
        let taskText = taskInput.value.trin();
        if(taskText !== ""){
            addTaskButton(taskText);
            taskInput.value = "";
        }
    });
    
    //function to add that element
    function addTask(taskText){
        const newTask = {title: taskText,completed: false};
        fetch(apiurl, {
            method: "post",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
        .then((response) => response.json())
        .then((task) =>  {console.log(task);
         displayTask(task.title, task.id);
        })
        .catch((error) => console.error("Failed during task", error));
    }

    //Display an Element
    function displayTask(title, id){
        const li = document.createElement("li");
        li.setAttribute("data-id", id);
        const span = document.childElement
        ("span");
        span.textContent = title;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () =>
        editTask(span, id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Edit";
        deleteBtn.className = "edit-btn";
        deleteBtn.addEventListener("click", () =>
        deleteTask(id, li));


        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    }

    function editTask(span, id) {
        const newTaxt = prompt("Edit Task", span. textContent);
        if(newText !== null && newText !== ""){
            const updateTask = {title: newText,completed: false}
            fetch(`${apiurl}/${id}`, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            }).then((response) => {
                console.log(response);
                if(response.ok === false){
                    throw new Error("Failed to edit");
                }
                return response.json();
            }).then(() => {
                span.textContent = newText;
            }).catch(error => console.error("error in editing task",error));;
        }

    }

    function deleteTask(id,li){
        fetch(`${apiurl}/${id}`,{
            method: "DELETE",
        }).then((response) =>{
            if(response.ok === true) {
                taskList.removeChild(li);
            } else {
                throw new Error("failed to delete task");
            }
        }).catch(error => console.error("error in deleting task",error));
    }

});