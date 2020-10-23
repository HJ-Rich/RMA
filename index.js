//생성 버튼 눌렀을 때 작동
document.getElementById('createKV').addEventListener('click', () => {
    let company = prompt("회사명을 입력하세요");
    let description = prompt("설명을 입력하세요");
    alert(company);
    alert(description);
});

//호출 버튼 눌렀을 때 작동 : 저장되어 있는 모든 키 밸류를 보여줌.
document.getElementById('readKV').addEventListener('click', () => {
    chrome.storage.sync.get(null, function (result) {
        for (const [key, value] of Object.entries(result)) {
            alert(`${key}: ${value}`);
        }
    });
});