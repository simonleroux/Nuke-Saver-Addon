var storage;

// check if the browser is Chrome or Firefox and set storage accordingly
if (typeof browser !== 'undefined')
    storage = browser.storage;
else if (typeof chrome !== 'undefined')
    storage = chrome.storage;
// if not using any of the supported browsers
else { }

// read the options and protect page depending on the options
storage.sync.get({
    findAndListUsersPage: true,
    userConfigurationPage: true,
    deviceAssociationPage: true,
    disableWarning: false
}, (items) => {

    if (!items.disableWarning && (!items.findAndListUsersPage || !items.userConfigurationPage || !items.deviceAssociationPage))
        displayWarning();
    if (items.findAndListUsersPage)
        protectFindAndListUsersPage();
    if (items.userConfigurationPage)
        protectUserConfigurationPage();
    if (items.deviceAssociationPage)
        protectDeviceAssociationPage();
});

function displayWarning() {
    var body = document.getElementsByTagName('body')[0];
    var content = document.getElementsByClassName('content')[0];
    var warningBox = document.createElement('div');
    // warningBox.style.height = '50px';
    warningBox.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    warningBox.style.fontFamily = '\'Segoe UI\', Tahoma, sans-serif';
    warningBox.style.fontSize = '1.5rem';
    warningBox.style.paddingLeft = '5px';
    warningBox.style.paddingBottom = '2px';
    warningBox.innerHTML = '<b>Warning:</b> You are currently not fully protected by the Nuke Saver extension! Please review your options.';
    body.insertBefore(warningBox, content);
}

function protectFindAndListUsersPage() {

    // this is the button at the top of find and list users page
    var topButton = document.getElementById('8tbllink');

    if (topButton && topButton.title === 'Delete Selected')
        topButton.remove();
        //topButton.style.display = 'none';

    // this is the button at the top of find and list users page for cucm 9.1.1 (9.x?)
    var oldTopButton = document.getElementById('4tbllink');

    if (oldTopButton && oldTopButton.title === 'Delete Selected')
        oldTopButton.remove();
        //oldTopButton.style.display = 'none';

    // this is the button at the bottom of find and list users page, there are two ways to get the element
    // var botButton = document.getElementById('8tbl');
    var bottomButton = document.getElementsByName("Delete Selected");

    for (let button of bottomButton) {
        if (button)
            button.remove();
            //button.style.display = 'none';
    }

}

function protectUserConfigurationPage() {

    // this is the button at the top of user configuration page
    var topButton = document.getElementById('2tbllink');

    if (topButton && topButton.title === 'Delete')
        topButton.remove();
        //topButton.style.display = 'none';

    // this is the button at the bottom of user configuration page, there are two ways to get the element
    // var botButton = document.getElementById('2tbl');
    var bottomButton = document.getElementsByName("Delete");

    for (let button of bottomButton) {
        if (button)
            button.remove();
            //button.style.display = 'none';
    }

}

function protectDeviceAssociationPage() {

    // this is the button at the top of device association page
    var topButton = document.getElementById('6tbllink');

    if (topButton)
        if (topButton.title === 'Remove All Associated Devices' || topButton.title === 'Remove All Associated')
            topButton.remove();
            //topButton.style.display = 'none';

    // this is the button at the bottom of device association page, we have two ways to get it
    // var bottomButton = document.getElementById('6tbl');
    var bottomButton1 = document.getElementsByName("Remove All Associated Devices");
    var bottomButton2 = document.getElementsByName("Remove All Associated");

    for (let button of bottomButton1) {
        if (button)
            button.remove();
            //button.style.display = 'none';
    }
    for (let button of bottomButton2) {
        if (button)
            button.remove();
            //button.style.display = 'none';
    }

}
