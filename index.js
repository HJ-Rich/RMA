//페이지가 로드완료되었을 때
document.addEventListener('DOMContentLoaded', () => {

    //storage 에 있는 값들을 key : value 로 가져와서 datalist에 추가해주기
    chrome.storage.sync.get(null, function (result) {
        for (const [key, value] of Object.entries(result)) {
            document.querySelector('datalist').innerHTML += `<option data-key="${key} data-value="${value}" value="${key} : ${value}"></option>`;
        }
    });

    //datalist 이벤트
    document.querySelector('input[list="myDatalist"]')
        //새로운 값을 입력했을 때
        .addEventListener('change', function () {

            // 값이 storage에 이미 존재하는지 체크
            let target = this;
            chrome.storage.sync.get(null, function (result) {
                let existCheck = false;
                for (const [key, value] of Object.entries(result)) {
                    if (`${key}` === target.value.split(' :')[0]) existCheck = true;
                }

                // 존재하면 삭제 시나리오
                if (existCheck) {
                    if (confirm(`${target.value} 규칙을 삭제하시겠습니까?`)) {
                        chrome.storage.sync.remove(target.value.split(' :')[0], () => {
                            alert(`${target.value} 제거 완료`);
                            location.reload();
                        });
                    }
                }

                // 부재하면 생성 시나리오
                else if (target.value) {
                    let company = target.value;
                    let description = prompt(`${company} 에 대한 설명을 입력해주세요`);
                    if (description) {
                        chrome.storage.sync.set({ [company]: `${description}` }, function () {
                            alert(`'${company}' 회사에 대한 규칙 '${description}' 등록 완료`);
                            location.reload();
                        });
                    } else alert('설명이 입력되지 않았습니다');
                }

                // 완료 후 초기화
                target.value = ``;
            });

        });

});



// Create : 새로운 필터 규칙 생성
document.getElementById('createKV').addEventListener('click', () => {
    //회사명 입력
    let company = prompt("회사명을 입력하세요");
    if (!company) {
        alert('사명이 입력되지 않았습니다');
        return;
    }

    //설명 입력
    let description = prompt(`${company} 에 대한 설명을 입력해주세요`);
    if (!description) {
        alert('설명이 입력되지 않았습니다');
        return;
    }

    //회사명, 설명을 키 밸류로 하는 규칙 등록
    chrome.storage.sync.set({ [company]: description }, function () {
        location.reload();
        alert(`'${company}' 회사에 대한 규칙 '${description}' 등록 완료`);
    });

});

// Read : 필터 갯수 체크
document.getElementById('readKV').addEventListener('click', () => {
    chrome.storage.sync.get(null, function (result) {
        let kvArray = Object.entries(result);

        // 필터 없으면 알려주고 리턴
        if (kvArray.length === 0) {
            alert('아직 필터가 존재하지 않습니다');
            return;
        }

        // 필터 갯수와 모든 키 밸류 쌍 얼럿
        alert(`${kvArray.length}개의 필터가 존재합니다.`);
    });
});


// Clear : 모든 필터 제거
document.getElementById('clearKV').addEventListener('click', () => {

    chrome.storage.sync.get(null, function (result) {

        // 필터 없으면 알려주고 리턴
        let kvArray = Object.entries(result);
        if (kvArray.length === 0) {
            alert('아직 필터가 존재하지 않습니다');
            return;
        }

        // 필터 갯수를 알려주며 컨펌 후 제거
        if (confirm(`${kvArray.length}개의 필터가 제거됩니다. 진행하시겠습니까?`)) {
            chrome.storage.sync.clear(function () {
                location.reload();
                alert('제거 완료');
            });
        }

    });

});
