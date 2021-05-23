function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#showImage')
                .attr('src', e.target.result)
                .width(500)
                .height(400);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function encodeImageBase64(callback) {
    var re = /(?:\.([^.]+))?$/;
    var fileInput = document.getElementById("fileInput");
    var reader = new FileReader();
    let name = fileInput.files[0].name;
    let ext = re.exec(name)[0];

    reader.readAsDataURL(fileInput.files[0]);

    reader.onload = function() {
        let res = {
            Encoding: reader.result.split(/,(.+)/)[1],
            Extension: ext
        }
        callback(res);
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
}

function submitFormData() {
    let Title = document.getElementById("title").value;
    let Description = document.getElementById("description").value
    encodeImageBase64((res) => {
        let reqObj = {
            Title: Title,
            Description: Description,
            EncodedImage: res.Encoding,
            ImageExtension: res.Extension
        }

        if (!res || !Title || !Description) {
            return
        }

        let jsonString = JSON.stringify(reqObj);

        fetch('/report/applikation/new', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: jsonString
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.location = '/report/api?docId=' + data.id;
            });
    });



}
window.submitFormData = submitFormData;
window.encodeImageBase64 = encodeImageBase64;
window.readURL = readURL;