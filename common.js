// RMA : Remember My Application
// Developed by dev_rich 2020.10.23 ~
// manifest.json에 선언한 url에 매칭되는 주소에 접속할마다 해당 HTML문서 맥락에서 수행되는 js


// 사이트를 구분하여 공고 목록을 리턴해주는 함수
function getSourceByHost() {
    let site = location.host.split('.')[1];
    let returnObject = new Object();

    switch (site) {
        case 'work': returnObject = document.querySelectorAll('tr[id^="list"]'); break;
        case 'saramin': returnObject = document.querySelectorAll('.item_recruit'); break;
        case 'jobkorea': returnObject = document.querySelectorAll('tr.devloopArea'); break;
        case 'incruit': returnObject = document.querySelectorAll('div.n_job_list_table_a.list_full_default tbody tr'); break;
        default: break;
    }

    return returnObject;
}

// storage에 저장된 필터 규칙에 매칭되는 공고가 발견될 경우 CSS처리
function setCSS() {

    let source = getSourceByHost();
    if (source.length !== 0) {
        chrome.storage.sync.get(null, (result) => {

            for (const [key, value] of Object.entries(result)) {
                for (let i = 0; i < source.length; i++) {
                    let pattern = new RegExp(`${key.replaceAll('㈜', '(주)').replaceAll('㈔', '(사)').replaceAll('(', '&#40;').replaceAll(')', '&#41;')}`);
                    if (pattern.test(source[i].innerText.trim().replaceAll('㈜', '(주)').replaceAll('㈔', '(사)').replaceAll('(', '&#40;').replaceAll(')', '&#41;'))) {
                        source[i].style.opacity = "0.2";
                        let span = document.createElement('span');
                        span.setAttribute('style', 'position:absolute;font-size:1.5rem;margin-top:-8%;margin-left:25%;font-weight:550;color:#b7aeae');
                        if (location.host.split('.')[1] === 'incruit') span.setAttribute('style', 'position:absolute;font-size:1.5rem;margin-left:35%;margin-top:-5%;font-weight:550;color:#b7aeae');
                        span.innerText = `${key} : ${value}`;
                        source[i].after(span);
                    }
                }
            }

        });
    }

}

setCSS();



//스토리지에 변화가 생겼을 경우 필터 적용을 위한 새로고침
chrome.storage.onChanged.addListener(function (changes, namespace) {
    location.reload();
});