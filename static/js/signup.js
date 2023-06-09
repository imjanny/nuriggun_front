

async function handleSignUp() {
    const email = document.getElementById("email").value
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    
    if (password === password2) {
        const response = await fetch(`${backend_base_url}/user/signup/`, {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "nickname": nickname,
                "password": password,
            })
        })
        
        if (response.status == 201) {
            alert("이메일로 인증링크가 전송되었습니다")
            window.location.replace(`${frontend_base_url}/index.html`);
        } else {
            const response_json = await response.json()
            let errorMessages = ''

            if (response_json.email) {
                errorMessages += response_json.email[0] + '\n'
            }
            if (response_json.password) {
                errorMessages += response_json.password[0] + '\n'
            }
            if (response_json.nickname) {
                errorMessages += response_json.nickname[0] + '\n'
            }
            alert(errorMessages)  
        }
    } else {
        alert("비밀번호가 일치하지 않습니다")
    } 
}