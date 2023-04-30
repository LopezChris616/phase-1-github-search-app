document.addEventListener("DOMContentLoaded", () => {
    formSubmit();
});

function formSubmit() {
    const githubForm = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    githubForm.addEventListener("submit", event => {
        event.preventDefault();
        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
            .then(res => res.json())
            .then(users => {
                if(userList.hasChildNodes()) {
                    userList.textContent = "";
                    displayUsers(users, userList);
                } else {
                    displayUsers(users, userList);
                } 
            })
            .catch(err => console.log(err))
    });
}

function displayUsers(users, list) {
    users.items.forEach(user => {
        list.innerHTML += `<li>${user.login}
                                <ul>
                                    <li><img src=${user.avatar_url}/></li>
                                    <li><a href=${user.html_url} target="_blank">Visit Profile</a></li>
                                </ul>
                            </li>`;
    });
}