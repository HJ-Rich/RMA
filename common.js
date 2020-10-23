// RMA : Remember My Application
// Developed by dev_rich 2020.10.23 ~
// manifest.json에 선언한 url에 매칭되는 주소에 접속할마다 해당 HTML문서 맥락에서 수행되는 js

// 사이트를 구분하여 공고 목록을 리턴해주는 함수
function getSourceByHost() {
    let site = location.host.split('.')[1];
    let returnObject = new Object();

    switch (site) {
        case 'work': returnObject = document.querySelectorAll('tr[id^="list"]'); break;
        case 'saramin': break;
        case 'jobkorea': break;
        case 'incruit': break;
        default: break;
    }

    return returnObject;
}

// storage에 저장된 필터 규칙에 매칭되는 공고가 발견될 경우 CSS처리
chrome.storage.sync.get(null, (result) => {

    let source = getSourceByHost();

    for (const [key, value] of Object.entries(result)) {
        source.forEach(e => {
            let pattern = new RegExp(`${key}`);
            if (pattern.test(e.innerText)) {
                e.style.opacity = "0.3";
            }
        });
    }

});





//스토리지에 변화가 생겼을 경우 필터 적용을 위한 새로고침
chrome.storage.onChanged.addListener(function (changes, namespace) {
    location.reload();
});