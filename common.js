// RMA : Remember My Application
// Developed by dev_rich 2020.10.23 ~

function myAlert() {
    let host = location.host;
    alert(host);
}

//chrome.storage.sync.set( {key : value}, callback() )
//(key:value)를 인자로 값 입력
function createNewKV(k, v) {
    chrome.storage.sync.set({ k: v }, function () { });
}


//chrome.storage.sync.get( [ 'key' ] , callback(result) )
//[key, key...] 를 인자로 매핑되는 key:value들을 담은 객체를 리턴
function readValueByKey(k) {
    chrome.storage.sync.get([k], function (result) {
        console.log(result.k);
        return result.k;
    });
}

//스토리지에 변화가 생겼을 경우
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});