



$("#submitBtn").click(handleSignupSubmit);

function handleSignupSubmit() {
  event.preventDefault();

  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  }

  console.log(userData);

  $.ajax({
    method: "POST",
    url: '/api/submitForm',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(userData),
    success : function(result) {
      console.log(result); // result is an object which is created from the returned JSON
    }
  })
}
