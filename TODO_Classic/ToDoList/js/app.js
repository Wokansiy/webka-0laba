document.addEventListener('DOMContentLoaded', function () {

    let input = document.getElementById('taskInput');
    let addTaskBtn = document.getElementById('addTaskButton');
    let list = document.getElementById('taskList');
    let removeBtn = document.getElementById('removeFinishedTasksButton');

    let counter = document.getElementById('counter');
    let counterVal = 0;


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateCounter() {
        counterVal = tasks.filter(t => !t.done).length;
        counter.innerHTML = counterVal;
    }

    function createTaskElement(task) {
        let newLi = document.createElement('li');
        let newH3 = document.createElement('h3');
        let deleteBtn = document.createElement('button');
        let completeBtn = document.createElement('button');

        newH3.innerText = task.text;
        deleteBtn.innerText = "Delete";
        completeBtn.innerText = "Complete";

        newLi.appendChild(newH3);
        newLi.appendChild(deleteBtn);
        newLi.appendChild(completeBtn);
        list.appendChild(newLi);

        if (task.done) {
            newLi.classList.add('done');
            newH3.style.color = "#FF4500";
        } else {
            newH3.style.color = "#1E90FF";
        }

        completeBtn.addEventListener('click', function () {
            task.done = !task.done;

            if (task.done) {
                newLi.classList.add('done');
                newH3.style.color = '#FF4500';
            } else {
                newLi.classList.remove('done');
                newH3.style.color = '#1E90FF';
            }

            saveTasks();
            updateCounter();
        });

        deleteBtn.addEventListener('click', function () {
            list.removeChild(newLi);
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            updateCounter();
        });

        return newLi;
    }

    tasks.forEach(t => createTaskElement(t));
    updateCounter();


    addTaskBtn.addEventListener('click', function () {
        if (input.value.length >= 3 && input.value.length <= 100) {

            let task = {
                text: input.value,
                done: false
            };

            tasks.push(task);
            saveTasks();
            createTaskElement(task);
            updateCounter();

            input.value = '';

        } else {
            alert('Text can not be shorter than 3 and longer than 100 characters!');
        }
    });


    removeBtn.addEventListener('click', function () {
        tasks = tasks.filter(t => !t.done);
        saveTasks();

        list.innerHTML = '';
        tasks.forEach(t => createTaskElement(t));

        updateCounter();
    });

});
