// 상단 네비바, 푸터 가져오기
document.addEventListener("DOMContentLoaded", function () {

    // 네비바, 푸터를 삽입할 위치
    const navbar = document.querySelector("#navbar");
    const footer = document.querySelector("#footer");

    if (navbar) {
        // base-nav.html 파일을 가져와서 네비게이션바 위치에 삽입
        fetch("/nav.html")
            .then(response => response.text())
            .then(data => {
                navbar.innerHTML = data;
            })
            .then(() => {

                // nav.html이 로드된 후에 profile_intro 태그와 기타 작업을 수행
                const payload = localStorage.getItem("payload")
                const payload_parse = JSON.parse(payload)
                const profile_intro = document.getElementById("profile_intro");

                if (profile_intro) {
                    const payload = localStorage.getItem("payload");
                    const payload_parse = JSON.parse(payload);
                    const profileImage = payload_parse.profile_img ? `${backend_base_url}${payload_parse.profile_img}` : `${noProfileImage}`;

                    profile_intro.innerHTML = `
                    <a href="${frontend_base_url}/user/profile_page.html?user_id=${payload_parse.user_id}">
                    <span><img class="user-profile-image" src="${profileImage}" alt="" style="width:30px; height:30px;"></span>
                    ${payload_parse.nickname}님
                    </a>`

                    let navbarRight = document.getElementById("navbar-right");
                    let newLi = document.createElement("li");
                    newLi.setAttribute("class", "nav-item");

                    let logoutBtn = document.createElement("a");
                    logoutBtn.setAttribute("class", "nav-link btn");
                    logoutBtn.innerText = "로그아웃";
                    logoutBtn.setAttribute("href", "#");

                    logoutBtn.setAttribute("onclick", "confirmLogout()");

                    newLi.appendChild(logoutBtn);

                    navbarRight.appendChild(newLi);
                }

                let loginbtn = document.getElementById("login-btn");
                let signupbtn = document.getElementById("signup-btn");
                let createbtn = document.getElementById('create-article')
                let createnotebtn = document.getElementById('create-note')
                if (loginbtn) {
                    loginbtn.style.display = "none";
                    signupbtn.style.display = "none";
                    createbtn.style.display = "block";
                    createnotebtn.style.display = "block";
                }


                // 새로운 받은 쪽지 수 알림
                const token = localStorage.getItem("access");
                const newMessagesURL = `${backend_base_url}/user/messages/inbox/`;
                fetch(newMessagesURL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        const newMessageCount = data.unread_count;

                        if (newMessageCount !== 0) {
                            const messageCountElement = document.getElementById("new-message-count");
                            messageCountElement.innerText = `New ${newMessageCount}`;
                        }
                    })
                    .catch(error => {
                        console.error("새로운 받은 쪽지 수 알림", error);
                    });
            })

            .catch(error => {
                console.error("Error fetching navigation bar:", error);
            });
    }

    if (footer) {
        // base-footer.html 파일을 가져와서 푸터 위치에 삽입
        fetch("/footer.html")
            .then(response => response.text())
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(error => {
                console.error("Error fetching footer:", error);
            });
    }
});


//로그아웃
function confirmLogout() {
    if (confirm("로그아웃하시겠습니까?")) {
        handleLogout();
    }
}
async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.replace('/index.html')
}


// 글 작성열기
function OpenArticle() {
    window.location.href = "/article/create_article.html";
}