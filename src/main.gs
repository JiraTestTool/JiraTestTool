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
      name: 'Apply Quote Tag after first line...',
      functionName: 'applyQuoteTagAfterFirstLine'
    },
    {
      name: 'Generate JIRA Markup...',
      functionName: 'call_jiraMarkup_with_input'
    },
    {
      name: 'Post-process brackets...',
      functionName: 'call_bold_brackets_with_output'
    },
    {
      name: 'Import JIRA Markup from Input cell "A1"...',
      functionName: 'call_copypasta_with_input'
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
  spreadsheet.addMenu('JIRA TOOLS', menuItems);
}

/**
 * Include "Jira Test Tool" in the "Add-ons" menu
 */
function createAddonMenu() {
  SpreadsheetApp.getUi().createAddonMenu()
    // Pre-Process
    .addItem('Import JIRA Markup from Input cell "A1"...', 'call_copypasta_with_input')
    .addItem('Apply Quote Tag after first line...', 'applyQuoteTagAfterFirstLine')
    // Process
    .addSeparator()
    .addItem('Generate JIRA Markup...', 'call_jiraMarkup_with_input')
    // Post-Process
    .addSeparator()
    .addItem('Post-process brackets...', 'call_bold_brackets_with_output')
    // Set Up
    .addSeparator()
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
        .setTitle('JIRA TOOLS')
        .setWidth(300);

    // Open sidebar
    SpreadsheetApp.getUi().showSidebar(html);
}

/**
 *
 */
function call_jiraMarkup_with_input() {
  try {
    jiraMarkup("Input");
  }
  catch (e) {
    Logger.log(e);
    /* TODO: catch specific error messages
     * (consider switch-case-statement within catch-block) */
    var message = "Hmm... something is wrong with the 'Input' sheet... please fix the input and try again";
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
    /* TODO: catch specific error messages
     * (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
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
      /* TODO: catch specific error messages
       * (consider switch-case-statement within catch-block) */
      var message = "Oops... make sure cell 'A1' on the 'Input' sheet has JIRA markup data and try again...";
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
    /* TODO: catch specific error messages
     * (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
    Browser.msgBox(message);
  };
};
