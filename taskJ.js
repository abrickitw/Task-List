window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const taskEditButtons = document.querySelectorAll('.edit');

    const sanitize = (string) => {
        const regex = /[&<>"'`=\/]/g;
        const htmlEntities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return string.replace(regex, (match) => htmlEntities[match]);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value.trim();
        if (!task) {
            alert("Task can not be empty");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = sanitize(task);
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        const task_done_el = document.createElement("button");
        task_done_el.classList.add("done");
        task_done_el.innerHTML = "Done";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_actions_el.appendChild(task_done_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                input.focus();
                input.value = sanitize(task_input_el.value); // populate input field with task content
                task_edit_el.innerText = "Save";
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.value = sanitize(input.value); // update task content with edited value
                input.value = ""; // clear the main input field value
            }
        });

        task_done_el.addEventListener('click', () => {
            if (task_done_el.innerText.toLowerCase() == "done") {
                task_input_el.setAttribute("readonly", "readonly");
                task_input_el.style.textDecoration = 'line-through';
                task_done_el.innerText = "UnDone";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_done_el.innerText = "DONE";
                task_input_el.style.textDecoration = 'none';
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        })
    });

    // Loop through each task edit button and add an event listener
    taskEditButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get a reference to the task content
            const taskContent = button.previousElementSibling.querySelector('.text').value.trim();

            // Set the main input field value to the task content
           

            input.value = taskContent;

            // Set focus on the main input field
            input.focus();
        });
    });
});
