/**
 * A special function that is necessary for install as Add-On
 */
function onInstall() {
  onOpen();
}

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  createStandaloneMenu();
  createAddonMenu();
  showSidebar();
}

/**
 * Append a "JIRA TOOLS" menu into the top level of the menu bar
 */
function createStandaloneMenu() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {
      name: 'Import JIRA Markup from Input cell "A1"...',
      functionName: 'call_copypasta_with_input'
    },
    /*{ -- Removed due to Quote Mechanism changed from https://jira/jira/browse/TTB-813
      name: 'Apply Quote Tag after first line...',
      functionName: 'call_applyQuoteTagAfterFirstLine'
    },*/
    {
      name: 'Generate JIRA Markup...',
      functionName: 'call_jiraMarkup_with_input'
    },
    {
      name: 'Post-process brackets...',
      functionName: 'call_bold_brackets_with_output'
    },
    {
      name: 'Setup Input/Output/Keywords Sheets...',
      functionName: 'call_setupSheets'
    },
    {
      name: 'Reset Input sheet...',
      functionName: 'call_resetSheet_with_input'
    },
    {
      name: 'Show Sidebar...',
      functionName: 'showSidebar'
    }
  ];
  spreadsheet.addMenu('JIRA TEST TOOL', menuItems);
}

/**
 * Include "Jira Test Tool" in the "Add-ons" menu
 */
function createAddonMenu() {
  SpreadsheetApp.getUi().createAddonMenu()
    // Pre-Process
    .addItem('Import JIRA Markup from Input cell "A1"...', 'call_copypasta_with_input')
    //Removed due to Quote Mechanism changed from https://jira/jira/browse/TTB-813
    //.addItem('Apply Quote Tag after first line...', 'applyQuoteTagAfterFirstLine') 
    // Process
    .addSeparator()
    .addItem('Generate JIRA Markup...', 'call_jiraMarkup_with_input')
    // Post-Process
    .addSeparator()
    .addItem('Post-process brackets...', 'call_bold_brackets_with_output')
    // Set Up
    .addSeparator()
    .addItem('Setup Input/Output/Keywords Sheets...', 'call_setupSheets')
    .addItem('Reset Input sheet...', 'call_resetSheet_with_input')
    .addItem('Show Sidebar...', 'showSidebar')
    .addToUi();
}


/**
 *
 * Sidebar title, content & size.
 *
 */
function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('sidebar')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setTitle('JIRA TEST TOOL')
        .setWidth(300);

    // Open sidebar
    SpreadsheetApp.getUi().showSidebar(html);
}

/**
 *
 */
function call_jiraMarkup_with_input() {
  var message = "";
  try {
    var result = jiraMarkup("Input");
    switch (result) {
      case STEP_MISSING:
        message = STEP_MISSING_MESSAGE;
        break;
      case DESCRIPTION_MISSING:
        message = DESCRIPTION_MISSING_MESSAGE;
        break;
      case EXPECTED_RESULTS_MISSING:
        message = EXPECTED_RESULTS_MISSING_MESSAGE;
        break;
      case NOTES_MISSING:
        message = NOTES_MISSING_MESSAGE;
        break;
      default:
        break;
    }
  }
  catch (e) {
    Logger.log(e);
    var message = "";
    switch (e.name) {
      case "TypeError":
        message = "Hmm... something is wrong with the 'Input' sheet... please fix the input and try again.\\n\\n";
        message += "Try to write a more verbose test case.\\n";
        message += "Consider \"Step 1\" rather than just \"1\"";
        break;
      default:
        message = "Hmm... something is wrong with the 'Input' sheet... please fix the input and try again.";
        break;
    }
    message += "\\n\\n>error message: \\n";
    message += ">" + e.name + " - " + e.message;
  };
  if (message != "") {
    Browser.msgBox(message);
  }
};


/**
 *
 */
function call_setupSheets() {
  try {
    setupSheets();
  }
  catch (e) {
    Logger.log(e);
    var message = "Sorry, JTT failed to setup the 'Input' 'Output' and 'Keywords' sheets.";
    message += "\\n\\n>error message: \\n";
    message += ">" + e.name + " - " + e.message;
    Browser.msgBox(message);
  };
};


/**
 *
 */
function call_resetSheet_with_input() {
  try {
    resetSheet("Input");
  }
  catch (e) {
    Logger.log(e);
    var message = "Uh oh... try again...";
    message += "\\n\\n>error message: \\n";
    message += ">" + e.name + " - " + e.message;
    Browser.msgBox(message);
  };
};

/**
 *
 */
function call_copypasta_with_input() {
  try {
    copypasta("Input");
  }
  catch (e) {
    Logger.log(e);
    try { copypasta("Input"); } // try again
    catch (e) {
      Logger.log(e);
      var message = "Oops... make sure cell 'A1' on the 'Input' sheet has JIRA markup data and try again...";
      message += "\\n\\n>error message: \\n";
      message += ">" + e.name + " - " + e.message;
      Browser.msgBox(message);
    };
  };
};

/**
 *
 */
function call_bold_brackets_with_output() {
  try {
    boldBrackets("Output");
  }
  catch (e) {
    Logger.log(e);
    var message = "Uh oh... try again...";
    message += "\\n\\n>error message: \\n";
    message += ">" + e.name + " - " + e.message;
    Browser.msgBox(message);
  };
};


/**
 *
 */
function call_applyQuoteTagAfterFirstLine() {
  try {
    applyQuoteTagAfterFirstLine();
  }
  catch (e) {
    Logger.log(e);
    var message = "Uh oh... try again...";
    message += "\\n\\n>error message: \\n";
    message += ">" + e.name + " - " + e.message;
    Browser.msgBox(message);
  };
};
