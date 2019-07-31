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
    findAndListEndUsersPage: true,
    endUserConfigurationPage: true,
    deviceAssociationPage: true,
    disableWarning: false
}, (items) => {

    if (!items.disableWarning && (!items.findAndListEndUsersPage || !items.endUserConfigurationPage || !items.deviceAssociationPage))
        displayWarning();
    protectDeviceAssociationPage(items.deviceAssociationPage);
    protectFindAndListUsersPage(items.findAndListEndUsersPage);
    protectUserConfigurationPage(items.endUserConfigurationPage);
});

function displayWarning() {
    var body = document.getElementsByTagName('body')[0];
    var content = document.getElementsByClassName('content')[0];
    var warningBox = document.createElement('div');
    warningBox.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    warningBox.style.fontFamily = '\'Segoe UI\', Tahoma, sans-serif';
    warningBox.style.fontSize = '1.5rem';
    warningBox.style.paddingLeft = '5px';
    warningBox.style.paddingBottom = '2px';
    warningBox.innerHTML = '<b>Warning:</b> You are currently not fully protected by the Nuke Saver extension! Please review your options.';
    body.insertBefore(warningBox, content);
}

function protectFindAndListUsersPage(protectEndUser) {

    // protect find and list application users page even if end user protection is disabled
    if (!protectEndUser && (document.documentElement.textContent || document.documentElement.innerText).indexOf('Find and List Application Users') == -1)
        return

    // this is the button at the top of find and list users page
    var topButton = document.getElementById('8tbllink');

    if (topButton && topButton.title === 'Delete Selected')
        topButton.remove();

    // this is the button at the top of find and list users page for cucm 9.1.1 (9.x?)
    var oldTopButton = document.getElementById('4tbllink');

    if (oldTopButton && oldTopButton.title === 'Delete Selected')
        oldTopButton.remove();

    // this is the button at the bottom of find and list users page
    var bottomButton = document.getElementsByName("Delete Selected");

    for (let button of bottomButton) {
        if (button)
            button.remove();
    }

}

function protectUserConfigurationPage(protectEndUser) {

    // protect application user configuration page even if end user protection is disabled
    if (!protectEndUser && (document.documentElement.textContent || document.documentElement.innerText).indexOf('Application User Configuration') == -1)
        return

    // this is the button at the top of user configuration page
    var topButton = document.getElementById('2tbllink');

    if (topButton && topButton.title === 'Delete')
        topButton.remove();

    // this is the button at the bottom of user configuration page
    var bottomButton = document.getElementsByName("Delete");

    for (let button of bottomButton) {
        if (button)
            button.remove();
    }

}

function protectDeviceAssociationPage(enabled) {

    if (!enabled)
        return

    // this is the button at the top of device association page
    var topButton = document.getElementById('6tbllink');

    if (topButton)
        if (topButton.title === 'Remove All Associated Devices' || topButton.title === 'Remove All Associated')
            topButton.remove();

    // this is the button at the bottom of device association page
    var bottomButton1 = document.getElementsByName("Remove All Associated Devices");
    var bottomButton2 = document.getElementsByName("Remove All Associated");

    for (let button of bottomButton1) {
        if (button)
            button.remove();
    }
    for (let button of bottomButton2) {
        if (button)
            button.remove();
    }

}
