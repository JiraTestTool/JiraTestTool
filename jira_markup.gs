function test() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var out = ss.getSheetByName("Output");
  out.clear();
}

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
    {name: 'Generate JIRA Markup...', functionName: 'jiraMarkup'},
    {name: 'Copypasta Input from JIRA...', functionName: 'call_copypasta_with_input'},
    {name: 'Post-process brackets...', functionName: 'call_bold_brackets'},
    {name: 'Reset Input sheet...', functionName: 'resetSheet'}
  ];
  spreadsheet.addMenu('JIRA Utilities', menuItems);
}

function resetSheet(input_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Input"; // Reset Input sheet...
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);

  in_sheet.clear();
  in_sheet.setRowHeights(1, 15, 21);    // reset to default heights "21"
  in_sheet.setColumnWidths(1, 15, 100); // reset to default widths "100"

  in_sheet.appendRow(["Step Name", "Description", "Expected Results", "Notes"]);

  /* because there should at least be 1 step
   * also if row 2 is empty, the jiraMarkup() function will be sad :(
   */
  in_sheet.appendRow(["Step 1", "Click button", "Action occurs", "Remeber to notice this special case..."]);
  in_sheet.appendRow(["VP 1", "", "Verify that action occured", ""]);

  /* resonable sizes for editing */
  in_sheet.autoResizeColumn(1);
  in_sheet.setColumnWidth(2, 300);
  in_sheet.setColumnWidth(3, 300);
  in_sheet.setColumnWidth(4, 300);
}


function call_copypasta_with_input() {
  try {
    copypasta("Input");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
    Browser.msgBox(message);
  }
}

function call_bold_brackets() {
  try {
    boldBrackets("Output");
  }
  catch (e) {
    /* TODO: catch specific error messages (consider switch-case-statement within catch-block) */
    var message = "Uh oh... try again...";
    Browser.msgBox(message);
  }
}


/**
 * The actual function to format and apply markup
 */
function jiraMarkup(input_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Input";
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);
  var values = in_sheet.getDataRange().getValues();
  var out_sheet = ss.getSheetByName("Output");
  var cell = out_sheet.getRange("D1:D100"); //To set word wrap

  var result = out_sheet.getDataRange().getValues();
  var columns = in_sheet.getLastColumn();
  var rows=in_sheet.getLastRow();
  var searchRange = out_sheet.getRange(1,1, rows-1, columns-1);

  SpreadsheetApp.getActiveSpreadsheet().toast('Working...', 'Status', 3);

  /* aquire keywords all at once for quick lookup in format loop */
  var b_list = getKeywords(0); // 0 is the index of the column for BOLD
  var i_list = getKeywords(1); // 1 is the index of the column for ITALICS
  var u_list = getKeywords(2); // 2 is the index of the column for UNDERLINE

  var i, j; // declaring local vars prevents getting stuck in loop on textFormatting function call

  //Clear old sheet
  out_sheet.clear();

  for (i = 0; i < rows; i++) {
    var step;
    var desc;
    var expect;
    var notes;

    if (i != 0) {
      for (j = 0; j < columns; j++) {
        switch (j) {
          case 0:
            step = values[i][j];
            break;
          case 1:
            desc = textFormatting(values[i][j], b_list, i_list, u_list);
            /* the single-quote at the front tells Google Sheets to parse cell as plain-text rather than formula */
            desc = "'" + desc
            break;
          case 2:
            expect = textFormatting(values[i][j], b_list, i_list, u_list);
            expect = "'" + expect
            break;
          case 3:
            notes = textFormatting(values[i][j], b_list, i_list, u_list);
            notes = "'" + notes
            break;
          default:
            break;
        }
      }
      /* if `step` contains substring "VP" */
      if (step.indexOf("VP") > -1 || step.indexOf("vp") > -1 || step.indexOf("Vp") > -1) {
        step = step.replace("vp", "VP");
        step = step.replace("Vp", "VP");
        out_sheet.appendRow(["||", step, "||", desc, "||", expect, "||", notes, "||"]);
      }
      else {
        out_sheet.appendRow(["|", step, "|", desc, "|", expect, "|", notes, "|"]);
      }
    }
    else {
      out_sheet.appendRow(["||", "Step Name", "||", "Description", "||", "Expected Results", "||", "Notes", "||"]);
    }
  }

  /* Finally resize the delimiter columns to a width of 20 pixels */
  out_sheet.setColumnWidth(1, 20); // 1 refers to the first column
  out_sheet.setColumnWidth(3, 20); // then further delimiters are on odd columns
  out_sheet.setColumnWidth(5, 20);
  out_sheet.setColumnWidth(7, 20);
  out_sheet.setColumnWidth(9, 20);

  /* set standard widths for non-delimeter columns
   * these are reasonable widths for viewing while page Zoom = 100%
   */
  out_sheet.setColumnWidth(2, 100); // 100 pixels for *Step Name* column
  out_sheet.setColumnWidth(4, 300); // 300 pixels for *Description* column
  out_sheet.setColumnWidth(6, 200); // 200 pixels for *Expected Results* column
  out_sheet.setColumnWidth(8, 150); // 150 pixels for *Notes* column

  cell.setWrap(true); //Word Wrap Description
  cell = out_sheet.getRange("B1:B100");
  cell.setWrap(true);
  cell = out_sheet.getRange("F1:F100");
  cell.setWrap(true);
  cell = out_sheet.getRange("H1:H100");
  cell.setWrap(true);
}

/**
 * Helper for jiraMarkup().
 * @param  text   {String} the plain-text of the current cell.
 * @param  list   {Array}  the list of keywords for the desired formatting.
 * @param  format {String} the formatting character, either * for BOLD or _ for ITALICS or + for UNDERLINED.
 * @return        {String} "text" with "format" surrounding each keyword within "list".
 */
function textFormatting(text, b_list, i_list, u_list){
  var i;
  var splitArray = text.split(" ");

//  Logger.log(splitArray);

  for (i = 0; i < splitArray.length; i++){
    var element = splitArray[i];
    var element_without_star = element.replace(/\*\b|\b\*/g, "");       // *Create* -> Create ... *+Create+* -> +Create+ ... etc
    var element_without_plus = element.replace(/\+\b|\b\+/g, "");       // +Create+ -> Create ... _+Create+_ -> _Create_ ... etc
    var element_without_underscore = element.replace(/\_\b|\b\_/g, ""); // _Create_ -> Create ... *_Create_* -> *Create* ... etc

    var element_without_star_plus = element.replace(/\*\+|\+\*/g, "");       // *+Create+* -> Create ... *+_Create_+* -> _Create_ ... etc
    var element_without_plus_underscore = element.replace(/\+\_|\_\+/g, ""); // +_Create_+ -> Create ... _+*Create*+_ -> *Create* ... etc
    var element_without_underscore_star = element.replace(/\_\*|\*\_/g, ""); // _*Create*_ -> Create ... *_+Create+_* -> +Create+ ... etc

    /* if "Create" is in b_list, do BOLD */
    if (b_list.indexOf(element) > -1 ||
        b_list.indexOf(element_without_underscore) > -1 ||
        b_list.indexOf(element_without_plus) > -1 ||
        b_list.indexOf(element_without_plus_underscore) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "*" + splitArray[i] + "*");
//          Logger.log(element);
          Logger.log("......do BOLD \"*\"");

    }
    /* if "Create" is in i_list, do BOLD */
    if (i_list.indexOf(splitArray[i]) > -1 ||
        i_list.indexOf(element_without_star) > -1 ||
        i_list.indexOf(element_without_plus) > -1 ||
        i_list.indexOf(element_without_star_plus) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "_" + splitArray[i] + "_");
//          Logger.log(element);
          Logger.log("......do ITALICS \"_\"");
    }
    /* if "Create" is in u_list, do BOLD */
    if (u_list.indexOf(splitArray[i]) > -1 ||
        u_list.indexOf(element_without_underscore) > -1 ||
        u_list.indexOf(element_without_star) > -1 ||
        u_list.indexOf(element_without_underscore_star) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "+" + splitArray[i] + "+");
//          Logger.log(element);
          Logger.log("......do UNDERLINE \"+\"");
    }
  }

//  Logger.log(splitArray.join(" "));

  return splitArray.join(" ");
}


/**
 * Helper for jiraMarkup().
 * @param   col   {Integer} the desired column within the "Keywords" sheet. 0 = BOLD, 1 = ITALICS, 2 = UNDERLINED.
 * @return        {Array}   list of words from the desired column of the "Keywords" sheet.
 */
function getKeywords(col) {
  var i;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Keywords");
  var values = sheet.getDataRange().getValues();

  var words = [];
  for(i = 1;i < values.length;i++){
    if (values[i][col] != "")
      words[i - 1] = values[i][col];
    else
      break;
  }
  return words;
}
