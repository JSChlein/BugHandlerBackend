function redirect(report) {
    console.log(report);
    let docId = report.getAttribute('data-docId')
    console.log(report.getAttribute('data-docId'));
    window.location = '/report/info?docId=' + docId;
}