define(["showHideDiv", "loadHtmlContent"], function (showHide, loadHtml) {
    return {
        getNewContent: function (topMenuItemID, newContainerID, dataUrl) {

            var topMenuButton = document.getElementById(topMenuItemID);
            var container = null;

            var mainTopSection = document.getElementById('main-top-section');
            var donateFormContainer = document.getElementById('donate-form-container');

            function showDotationForm() {
                topMenuButton.setAttribute('class', 'default');
                showHide.showHideMethod(donateFormContainer, mainTopSection);
            }

            function init() {
                var btns = document.getElementsByClassName('donate-button-2');
                for (var b = 0; b < btns.length; b++) {
                    btns[b].addEventListener('click', showDotationForm, false);
                }
            }

            // create what-we-do-container just once
            if (document.getElementById(newContainerID) == null) {
                container = document.createElement('div');
                container.setAttribute('id', newContainerID);
                mainTopSection.appendChild(container);
                container.style.display = "none";

                loadHtml.loadHtmlContent(dataUrl, container, init);
                if (container.style.display === "none") {
                    showHide.showHideMethod(container, mainTopSection);

                    var topMenuItemsParent = document.getElementById('top-menu-items');
                    for (var childItem in topMenuItemsParent.childNodes) {
                        if (topMenuItemsParent.childNodes[childItem].nodeType === 1) {
                            for (var i = 0; i < topMenuItemsParent.childNodes[childItem].childNodes.length; i++) {
                                if (topMenuItemsParent.childNodes[childItem].childNodes[i].nodeType === 1) {
                                    for (var e = 0; e < topMenuItemsParent.childNodes[childItem].childNodes[i].childNodes.length; e++) {
                                        if (topMenuItemsParent.childNodes[childItem].childNodes[i].childNodes[e].nodeType === 1) {
                                            topMenuItemsParent.childNodes[childItem].childNodes[i].childNodes[e].setAttribute('class', 'default');
                                        }
                                    }
                                }
                            }
                        }
                    }
                    topMenuButton.setAttribute('class', 'nav-selected');
                }
            } else {
                var elements = document.getElementsByClassName('nav-selected');
                for (var j = 0; j < elements.length; j++) {
                    elements[j].setAttribute("class", "default");
                }
                topMenuButton.setAttribute('class', 'nav-selected');
                showHide.showHideMethod(document.getElementById(newContainerID), mainTopSection);
            }
        }
    };
});
