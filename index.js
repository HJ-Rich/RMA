// Create : 새로운 필터 규칙 생성
document.getElementById('createKV').addEventListener('click', () => {
    let company = prompt("회사명을 입력하세요");
    if (!company) {
        alert('사명이 입력되지 않았습니다');
        return;
    }
    let description = prompt("설명을 입력하세요");
    if (!description) {
        alert('설명이 입력되지 않았습니다');
        return;
    }

    chrome.storage.sync.set({ [company]: description }, function () {
        alert(`'${company}' 회사에 대한 규칙 '${description}' 등록 완료`);
    });

});

// Read : 모든 필터 규칙 보기
document.getElementById('readKV').addEventListener('click', () => {
    chrome.storage.sync.get(null, function (result) {
        let kvArray = Object.entries(result);
        if (kvArray.length === 0) {
            alert('아직 필터가 존재하지 않습니다');
            return;
        }
        alert(kvArray.length);
        for (const [key, value] of Object.entries(result)) {
            alert(`${key}: ${value}`);
        }
    });
});


// Update : 필터 규칙 수정


// Delete : 필터 규칙 제거


// Clear : 모든 필터 제거
document.getElementById('clearKV').addEventListener('click', () => {
    // 현재 생성된 필터 갯수 구하기
    chrome.storage.sync.get(null, function (result) {
        let kvArray = Object.entries(result);
        if (kvArray.length === 0) {
            alert('아직 필터가 존재하지 않습니다');
            return;
        }
    });

    // 필터 갯수를 알려주며 다시 한 번 컨펌 후 제거
    if (confirm(`모든 필터가 제거됩니다. 진행하시겠습니까?`)) {
        chrome.storage.sync.clear(function () { alert('제거 완료') });
    }
});
