import { token } from "./token.js";

const configObj = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    formSubmit();
});

function formSubmit() {
    const githubForm = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    githubForm.addEventListener("submit", event => {
        event.preventDefault();
        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`, configObj)
            .then(res => res.json())
            .then(users => {
                replaceInfo(userList, displayUsers, users);
            })
            .catch(err => console.log(err));
    });
}

function displayUsers(users, list, configObj) {
    const reposList = document.getElementById("repos-list");
    users.items.forEach(user => {
        list.innerHTML += `<li class="user-info">
                                <ul>
                                    <li id="username">${user.login}</li>
                                    <li><img src=${user.avatar_url} class="user-image"/></li>
                                    <li><a href=${user.html_url} target="_blank">Visit Profile</a></li>
                                </ul>
                            </li>`;
    });

    const userImage = document.getElementsByClassName("user-image");
    [...userImage].forEach((image, i) => {
        image.addEventListener("click", () => {
            fetch(users.items[i].repos_url, configObj)
                .then(res => res.json())
                .then(repos => {
                    replaceInfo(reposList, displayRepos, repos);
                })
                .catch(err => console.log(err));
        })
    })
}

function replaceInfo(listContainer, displayInfo, list) {
    if(listContainer.hasChildNodes()) {
        listContainer.textContent = "";
        displayInfo(list, listContainer);
    } else {
        displayInfo(list, listContainer);
    }
}

function displayRepos(repos, list) {
    repos.forEach(repo => {
        list.innerHTML += `<li class="repo-info">
                                    <ul>
                                        <li>${repo.name}</li>
                                        <li><a href="${repo.html_url}">Visit Repo</a></li>
                                    </ul>
                                </li>`
    });
}