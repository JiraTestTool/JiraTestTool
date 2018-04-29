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
      if (values[r][c][0] == " "
          && values[r][c][1] == "\""
          && values[r][c][values[r][c].length - 1] == " "
          && values[r][c][values[r][c].length - 2] == "\"")
      { // if first char of this cell is space and follwed by quote and ending is quote then space
        values[r][c] = values[r][c].slice(2, values[r][c].length - 2);
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
 * Helper for jiraMarkup().
 * @param  text   {String} the plain-text of the current cell.
 * @param  list   {Array}  the list of keywords for the desired formatting.
 * @param  format {String} the formatting character, either * for BOLD or _ for ITALICS or + for UNDERLINED.
 * @return        {String} "text" with "format" surrounding each keyword within "list".
 */
function textFormatting(text, b_list, i_list, u_list){
  var i;

  var splitArray = text.split(" ");
  Logger.log(splitArray);

  for (i = 0; i < splitArray.length; i++){
    var element = splitArray[i];
    var element_without_star = element.replace(/\*\b|\b\*/g, "");       // *Create* -> Create ... *+Create+* -> +Create+ ... etc
    var element_without_plus = element.replace(/\+\b|\b\+/g, "");       // +Create+ -> Create ... _+Create+_ -> _Create_ ... etc
    var element_without_underscore = element.replace(/\_\b|\b\_/g, ""); // _Create_ -> Create ... *_Create_* -> *Create* ... etc

    var element_without_star_plus = element.replace(/\*\+|\+\*/g, "");       // *+Create+* -> Create ... *+_Create_+* -> _Create_ ... etc
    var element_without_plus_underscore = element.replace(/\+\_|\_\+/g, ""); // +_Create_+ -> Create ... _+*Create*+_ -> *Create* ... etc
    var element_without_underscore_star = element.replace(/\_\*|\*\_/g, ""); // _*Create*_ -> Create ... *_+Create+_* -> +Create+ ... etc

    /* if "Create" (splitArray[i]) is in b_list, do BOLD */
    if (b_list.indexOf(element) > -1 ||
        b_list.indexOf(element_without_underscore) > -1 ||
        b_list.indexOf(element_without_plus) > -1 ||
        b_list.indexOf(element_without_plus_underscore) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "*" + splitArray[i] + "*");
//          Logger.log(element);
          Logger.log("......do BOLD \"*\"");

    }

    /* if "Create" (splitArray[i]) is in u_list, do UNDERLINE */
    if (u_list.indexOf(splitArray[i]) > -1 ||
        u_list.indexOf(element_without_underscore) > -1 ||
        u_list.indexOf(element_without_star) > -1 ||
        u_list.indexOf(element_without_underscore_star) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "+" + splitArray[i] + "+");
//          Logger.log(element);
          Logger.log("......do UNDERLINE \"+\"");
    }

    /* if "Create" (splitArray[i]) is in i_list, do ITALICS */
    if (i_list.indexOf(splitArray[i]) > -1 ||
        i_list.indexOf(element_without_star) > -1 ||
        i_list.indexOf(element_without_plus) > -1 ||
        i_list.indexOf(element_without_star_plus) > -1) {

          splitArray[i] = splitArray[i].replace(splitArray[i], "_" + splitArray[i] + "_");
//          Logger.log(element);
          Logger.log("......do ITALICS \"_\"");
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
