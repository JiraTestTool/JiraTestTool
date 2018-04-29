/**
 *
 */
function onInstall() {
  onOpen();
}

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Generate JIRA Markup...', functionName: 'call_jiraMarkup_with_input'},
    {name: 'Read JIRA Markup from Input cell "A1"...', functionName: 'call_copypasta_with_input'},
    {name: 'Post-process brackets...', functionName: 'call_bold_brackets_with_output'},
    {name: 'Reset Input sheet...', functionName: 'call_resetSheet_with_input'},
  ];
  spreadsheet.addMenu('JIRA Utilities', menuItems);
}


function call_jiraMarkup_with_input() {
  try {
    jiraMarkup("Input");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Hmm... something is wrong with the 'Input' sheet... please fix the input and try again";
    Browser.msgBox(message);
  };
};

function call_resetSheet_with_input() {
  try {
    resetSheet("Input");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
    Browser.msgBox(message);
  };
};

function call_copypasta_with_input() {
  try {
    copypasta("Input");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Oops... make sure cell 'A1' on the 'Input' sheet has JIRA markup data and try again...";
    Browser.msgBox(message);
  };
};

function call_bold_brackets_with_output() {
  try {
    boldBrackets("Output");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
    Browser.msgBox(message);
  };
};
