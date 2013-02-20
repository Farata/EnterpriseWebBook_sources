define([], function () {
    return{
        showHideMethod: function (showDiv, parentSection) {
            // hide all childNodes in parentSection
            for (var childItem in parentSection.childNodes) {
                // if the node is an element node
                if (parentSection.childNodes[childItem].nodeType == 1) {
                    parentSection.childNodes[childItem].style.display = "none";
                }
            }
            showDiv.style.display = "block";
        }
    }
}); 