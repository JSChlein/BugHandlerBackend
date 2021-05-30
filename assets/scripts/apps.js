function deleteApp(button) {
    if (confirm("Are you sure you want to delete this?")) {
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
    } else {
        return
    }


}

function seeReport(button) {
    let appId = button.getAttribute('data-appId')
    window.location = '/report/app/reports?appId=' + appId;
}