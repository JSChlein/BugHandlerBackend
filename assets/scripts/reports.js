function redirect(report) {
    console.log(report);
    let docId = report.getAttribute('data-docId')
    console.log(report.getAttribute('data-docId'));
    window.location = '/report/info?docId=' + docId;
}

function SetSolved(input) {
    let docId = input.getAttribute('data-docId')
    let bool = input.checked;


    let reqObj = {
        DocId: docId,
        Solved: bool
    }

    let jsonString = JSON.stringify(reqObj)

    fetch('/report/app/reports/solved', {
            method: 'put',
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