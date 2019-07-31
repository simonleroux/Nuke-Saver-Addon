var storage;

// check if the browser is Chrome or Firefox and set storage accordingly
if (typeof browser !== 'undefined')
    storage = browser.storage;
else if (typeof chrome !== 'undefined')
    storage = chrome.storage;
// if not using any of the supported browsers
else { }

// saves options to storage
function save_options() {

    var findAndListUsersPage_protected = document.getElementById('findAndListUsersPage').checked;
    var userConfigurationPage_protected = document.getElementById('userConfigurationPage').checked;
    var deviceAssociationPage_protected = document.getElementById('deviceAssociationPage').checked;
    var warning_disable = document.getElementById('disableWarning').checked;

    storage.sync.set({
        findAndListEndUsersPage: findAndListUsersPage_protected,
        endUserConfigurationPage: userConfigurationPage_protected,
        deviceAssociationPage: deviceAssociationPage_protected,
        disableWarning: warning_disable
    }, () => {
        // update status to let user know options were saved.
        var statusDiv = document.getElementById('statusDiv');
        var status = document.getElementById('status');
        //statusDiv.style.height = '30px';
        status.style.display = 'unset';
        setTimeout(() => {
            status.style.display = 'none';
            statusDiv.style.height = '0';
        }, 1500);
    });
}

// restores checkbox state using the preferences stored in storage
function restore_options() {
    storage.sync.get({
        findAndListEndUsersPage: true,
        endUserConfigurationPage: true,
        deviceAssociationPage: true,
        disableWarning: false
    }, (items) => {
        document.getElementById('findAndListUsersPage').checked = items.findAndListEndUsersPage;
        document.getElementById('userConfigurationPage').checked = items.endUserConfigurationPage;
        document.getElementById('deviceAssociationPage').checked = items.deviceAssociationPage;
        document.getElementById('disableWarning').checked = items.disableWarning;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').onclick = save_options;