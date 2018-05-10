/**
 *
 */
function prepareForCopy(input_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Output";
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);
  var range = in_sheet.getDataRange();
  var values = range.getValues();

  var r;
  var c;

  for ( r = 0; r < range.getLastRow(); r++){
    for ( c = 0 ; c < range.getLastColumn(); c++){
      if (
        values[r][c][0] == " "           // if first char of this cell is space
        && values[r][c][1] == "\""                     //  and follwed by quote
        && values[r][c][values[r][c].length - 1] == " "  // and ending is space
        && values[r][c][values[r][c].length - 2] == "\"" //  and quote
      ) {
        values[r][c] = values[r][c].slice(2, values[r][c].length - 2); // slice away the quotes
      }
     values[r][c] = values[r][c].replace(/\s\s\s+"|"\s\s\s+/g, "");   // /"/g, "\"&CHAR(34)&\""); // remove the quotation mark

      // I don't know how this works
      // I don't know why this works
      // But it works to make sure that the user can copy the Output into JIRA without quotation marks lingering
      // resource: https://webapps.stackexchange.com/a/104802/185466
      in_sheet.getRange(r+1,c+1).setFormula("=SUBSTITUTE(SUBSTITUTE(\""+ values[r][c] +"\",CHAR(13)&CHAR(10),CHAR(13)), CHAR(10), CHAR(13))");
    };
  };
}

/**
 * This function takes in a sheet object and applies standard cell formatting
 */
function sheetFormatting(sheet) {
  sheet.getRange("D1:D100").setWrap(true); //Word Wrap Description
  sheet.getRange("B1:B100").setWrap(true);
  sheet.getRange("F1:F100").setWrap(true);
  sheet.getRange("H1:H100").setWrap(true);

  /* Finally resize the delimiter columns to a width of 20 pixels */
  sheet.setColumnWidth(1, 20); // 1 refers to the first column
  sheet.setColumnWidth(3, 20); // then further delimiters are on odd columns
  sheet.setColumnWidth(5, 20);
  sheet.setColumnWidth(7, 20);
  sheet.setColumnWidth(9, 20);

  /* set standard widths for non-delimeter columns
   * these are reasonable widths for viewing while page Zoom = 100%
   */
  sheet.setColumnWidth(2, 100); // 100 pixels for *Step Name* column
  sheet.setColumnWidth(4, 300); // 300 pixels for *Description* column
  sheet.setColumnWidth(6, 200); // 200 pixels for *Expected Results* column
  sheet.setColumnWidth(8, 150); // 150 pixels for *Notes* column
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
  var element;
  var element_without_star;
  var element_without_plus;
  var element_without_underscore;
  var element_without_star_plus;
  var element_without_plus_underscore;
  var element_without_underscore_star;
  var splitArray = text.split(" ");

  for (i = 0; i < splitArray.length; i++){
    element = splitArray[i];

    // *Create* -> Create ... *+Create+* -> +Create+ ... etc
    element_without_star = element.replace(/\*\b|\b\*/g, "");
    // +Create+ -> Create ... _+Create+_ -> _Create_ ... etc
    element_without_plus = element.replace(/\+\b|\b\+/g, "");
    // _Create_ -> Create ... *_Create_* -> *Create* ... etc
    element_without_underscore = element.replace(/\_\b|\b\_/g, "");

    // *+Create+* -> Create ... *+_Create_+* -> _Create_ ... etc
    element_without_star_plus = element.replace(/\*\+|\+\*/g, "");
    // +_Create_+ -> Create ... _+*Create*+_ -> *Create* ... etc
    element_without_plus_underscore = element.replace(/\+\_|\_\+/g, "");
    // _*Create*_ -> Create ... *_+Create+_* -> +Create+ ... etc
    element_without_underscore_star = element.replace(/\_\*|\*\_/g, "");

    /* if "Create" (splitArray[i]) is in b_list, do BOLD */
    if (
      b_list.indexOf(element) > -1
      || b_list.indexOf(element_without_underscore) > -1
      || b_list.indexOf(element_without_plus) > -1
      || b_list.indexOf(element_without_plus_underscore) > -1
    ) {
      splitArray[i] = splitArray[i].replace(splitArray[i], "*" + splitArray[i] + "*");
    }

    /* if "Create" (splitArray[i]) is in u_list, do UNDERLINE */
    if (
      u_list.indexOf(splitArray[i]) > -1
      || u_list.indexOf(element_without_underscore) > -1
      || u_list.indexOf(element_without_star) > -1
      || u_list.indexOf(element_without_underscore_star) > -1
    ) {
      splitArray[i] = splitArray[i].replace(splitArray[i], "+" + splitArray[i] + "+");
    }

    /* if "Create" (splitArray[i]) is in i_list, do ITALICS */
    if (
      i_list.indexOf(splitArray[i]) > -1
      || i_list.indexOf(element_without_star) > -1
      || i_list.indexOf(element_without_plus) > -1
      || i_list.indexOf(element_without_star_plus) > -1
    ) {
      splitArray[i] = splitArray[i].replace(splitArray[i], "_" + splitArray[i] + "_");
    }
  }

  /* the single-quote at the front tells Google Sheets to
   * parse cell as plain-text rather than formula */
  return "'" + splitArray.join(" ");
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
