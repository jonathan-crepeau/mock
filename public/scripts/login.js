console.log('login.js ready to go!');

/* GAME PLAN
1 - Select the Form
2 - Listen for submit & prevent default
3 - Get form values
4 - Validate values
5 - Submit request if valid
6 - Redirect to Login on success
*/

// 1. Select the Form
const form = document.getElementById('loginForm');

// 2. Listen for submit
form.addEventListener('submit', handleLogin);

function handleLogin(event) {
    // 2. Prevent page refresh 
    event.preventDefault();
    isFormValid = true;

    // 3. Select form elements
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');

    // 3. Select form VALUES (specifically)
    const userData = {
        email: userEmail.value,
        password: userPassword.value,
    };

    // 4. Validate Values
    const formInputs = [...form.elements];
    formInputs.forEach((input) => {
        if (input.type !== 'submit' && input.value === '') {
            isFormValid = false;
            input.classList.add('inputError');
            input.insertAdjacentHTML('afterend', `
            <div class="alert pt-0">
                <p>Please ${input.placeholder}</p>
            </div>
            `);
        }
        else if (input.type === 'password' && input.value.length < 7) {
            isFormValid = false;
            input.classList.add('inputError');
            input.insertAdjacentHTML('afterend', `
            <div class="alert pt-0">
                <p>Password must be at least 7 characters</p>
            </div>
            `);
        }

        
    });

    if (isFormValid) {
        console.log('Submitting User Data -->', userData);

    //     $.ajax({
    //         method: 'POST',
    //         url: '/api/login',
    //         contentType: 'application/json; charset=utf-8',
    //         data: JSON.stringify(userData),
    //         success: response => console.log(response),
    //         error: error => console.log(error),
    //     });
    };
};