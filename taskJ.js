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
                task_input_el.style.color = '#31BE05';
                task_done_el.innerText = "UnDone";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_done_el.innerText = "DONE";
                task_input_el.style.textDecoration = 'none';
                task_input_el.style.color = '#DEF1D7';
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



    // Define the function to get the cookies as an object
    function getCookieAsObject() {
        const cookieString = document.cookie;
        if (cookieString) {
            const cookies = cookieString
                .split(';')
                .map(cookie => cookie.trim())
                .reduce((acc, cookie) => {
                    const [name, value] = cookie.split('=');
                    return { ...acc, [name]: value };
                }, {});
            return cookies;
        } else {
            return {};
        }
    }

    // Define the function to display the cookies
    function displayCookies() {
        // Get the cookies as an object
        const cookies = getCookieAsObject();
        // Get a reference to the container element
        const container = document.querySelector('#cookies');
        // Clear the container element
        container.innerHTML = '';
        // Loop through each cookie and create a div to display its name and value

        const cookieHeader = document.createElement('h2');
        cookieHeader.textContent = 'Our cookies:';
        container.appendChild(cookieHeader);


        Object.keys(cookies).forEach((key) => {
            const cookieDiv = document.createElement('div');
            cookieDiv.textContent = `${key}: ${cookies[key]}`;
            container.appendChild(cookieDiv);
        });
    }

    // Attach an event listener to the document to listen for the "cookieShowB" event
    document.addEventListener('cookieShowB', displayCookies);

    // Attach an event listener to the form to listen for the submit event
    document.getElementById('cookie-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Dispatch the "cookieShowB" event
        document.dispatchEvent(new Event('cookieShowB'));
    });


});

