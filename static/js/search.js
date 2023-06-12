const backend_base_url = "http://127.0.0.1:8000";

function searchRedirect() {
    const searchKeyword = document.getElementById("feed-search").value;
    window.location.href = `../base/index.html?search=${encodeURIComponent(searchKeyword)}`;
}

async function searchFilter() {
    const input_value = document.getElementById("feed-search").value;
  
    const response = await fetch(`${backend_base_url}/search/?search=${input_value}`, {
      method: 'GET'
    });
  
    // 응답 처리 및 화면 업데이트 코드
    // ...
  }