var STEP_MISSING = "STEP_MISSING";
var STEP_MISSING_MESSAGE = "Please make sure there is a 'Step' column";

var DESCRIPTION_MISSING = "DESCRIPTION_MISSING";
var DESCRIPTION_MISSING_MESSAGE = "Please make sure there is a 'Description' column";

var EXPECTED_RESULTS_MISSING = "EXPECTED_RESULTS_MISSING";
var EXPECTED_RESULTS_MISSING_MESSAGE = "Please make sure there is an 'Expected Results' column";

var NOTES_MISSING = "NOTES_MISSING";
var NOTES_MISSING_MESSAGE = "Please make sure there is a 'Notes' column";

var KEYWORDS_FONTSIZES = [
  [24, 24, 24, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 18, 10],
  [10, 10, 10, 10, 18, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10]
];

var KEYWORDS_BACKGROUNDS =  [
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#000000", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]
];

var KEYWORDS_FONT_COLORS = [
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#ffffff", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#ffffff", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#ffffff", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
];

var KEYWORDS_FONT_LINES = [
  ["none", "none", "underline", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none"]
];

var KEYWORDS_FONT_STYLES = [
  ["normal", "italic", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"]
];


var KEYWORDS_FONT_WEIGHTS = [
  ["bold", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"],
  ["normal", "normal", "normal", "normal", "normal", "normal"]
];



var KEYWORDS_VALUES = [["*Bold*", "_Italics_", "+Underline+", "", "", ""],
  ["Click", "Click", "Smile", "", "", ""],
  ["Save", "", "Click", "", "", ""],
  ["Add", "", "Save", "", "IMPORTANT: ", "Enter"],
  ["Button", "", "", "", "* don't leave any empty cells between words in any column ... e.g: -->>", ""],
  ["Finish", "", "", "", "", "Select"],
  ["Create", "", "", "", "* also try to include only 1 word per cell (e.g. \"Add\" rather than \"Add Button\")", ""],
  ["OK", "", "", "", "", ""],
  ["File", "", "", "", "", ""],
  ["Modify", "", "", "", "", ""],
  ["Select", "", "", "", "", ""],
  ["Open", "", "", "", "", ""],
  ["Login", "", "", "", "", ""],
  ["Sign-in", "", "", "", "", ""],
  ["Navigate", "", "", "", "", ""],
  ["Enter", "", "", "", "", ""],
  ["Ensure", "", "", "", "", ""],
  ["Exit", "", "", "", "", ""]
];



var KEYWORDS_WRAPS = [
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"],
    ["true", "true", "true", "true", "true", "true"]
];
