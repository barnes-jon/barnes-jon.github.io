// Calendar and Todo List Code
        const currentMonthElement = document.getElementById('currentMonth');
        const calendarDaysElement = document.getElementById('calendarDays');
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');
        const selectedDateElement = document.getElementById('selectedDate');
        const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');

        let currentDate = new Date();
        let selectedDate = new Date();
        let todos = {};

        function updateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            currentMonthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

            calendarDaysElement.innerHTML = '';

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                calendarDaysElement.innerHTML += '<div></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day');
                dayElement.textContent = day;

                if (year === new Date().getFullYear() && month === new Date().getMonth() && day === new Date().getDate()) {
                    dayElement.classList.add('current');
                }

                if (year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate()) {
                    dayElement.classList.add('selected');
                }

                dayElement.addEventListener('click', () => selectDate(new Date(year, month, day)));
                calendarDaysElement.appendChild(dayElement);
            }
        }

        function selectDate(date) {
            selectedDate = date;
            updateCalendar();
            updateTodoList();
        }

        function updateTodoList() {
            const dateString = selectedDate.toDateString();
            selectedDateElement.textContent = dateString;
            todoList.innerHTML = '';

            if (todos[dateString]) {
                todos[dateString].forEach((todo, index) => {
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('todo-item');
                    todoItem.innerHTML = `
                        ${todo}
                        <button onclick="removeTodo(${index})">Remove</button>
                    `;
                    todoList.appendChild(todoItem);
                });
            }
        }

        function addTodo() {
            const todo = todoInput.value.trim();
            if (todo) {
                const dateString = selectedDate.toDateString();
                if (!todos[dateString]) {
                    todos[dateString] = [];
                }
                todos[dateString].push(todo);
                todoInput.value = '';
                updateTodoList();
            }
        }

        function removeTodo(index) {
            const dateString = selectedDate.toDateString();
            if (todos[dateString]) {
                todos[dateString].splice(index, 1);
                updateTodoList();
            }
        }

        function showApp(appName) {
            console.log(`Showing ${appName} app`);
        }

        prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });

        nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });

        updateCalendar();
        updateTodoList();
