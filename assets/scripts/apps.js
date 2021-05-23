function deleteApp(button) {
    let docId = button.getAttribute('data-docId')

    let reqObj = {
        DocId: docId
    }

    let jsonString = JSON.stringify(reqObj)

    fetch('/report/allApps/delete', {
            method: 'delete',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: jsonString
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = window.location.href;
        });

}

function seeReport(button) {
    let appId = button.getAttribute('data-appId')
    window.location = '/report/all?appId=' + appId;
}