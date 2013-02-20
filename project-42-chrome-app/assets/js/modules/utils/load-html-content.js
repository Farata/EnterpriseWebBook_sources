define([], function () {
    return{
        loadContent: function (dataUrl, dataContainer, onload) {
            // get html data and load
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("text/html");
            xhr.open('GET', dataUrl, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = xhr.responseText;
                        dataContainer.innerHTML = data;
                        onload();
                    } else {
                        console.log(xhr.statusText);
                    }
                }
            }
            xhr.send(null);
        }
    }

}); 
