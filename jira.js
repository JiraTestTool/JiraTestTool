// gloabal variables
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
user = "";
pass = "";
jira = undefined;

var JiraClient = require('jira-connector');

function login(idUserInput, idPassInput) {
  user = document.getElementById(idUserInput).value;
  pass = document.getElementById(idPassInput).value;
  console.log("login success");
  jira = new JiraClient( {
      host: 'jira/jira',
      basic_auth: {
          username: user,
          password: pass
      }
  });
}

//======================================================

function getMyself(){
  jira.myself.getMyself( {}, function(error, myself) {
      console.log(error);
      console.log(myself);
  });
};


function get_gold_25814() {
  jira.issue.getIssue({
      issueKey: 'GOLD-25814'
  }, function(error, issue) {
      console.log(error);
      console.log(issue.fields.summary);
      console.log(issue);
  });
}
//======================================================

const jsonButton = document.querySelector('#generate');
const buttonContainer = document.querySelector('#buttonContainer');
const display = document.querySelector('#displayContainer');
const collection = ["Another", "More", "Next", "Continue", "Keep going", "Click me", "A new one"];

const generateJson = () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      display.innerHTML = `<pre>${JSON.stringify(xhr.response)}</pre>`;
      display.innerHTML += `<br><br>Hello ${xhr.response.displayName}!`;
      changeButton();
    }
  }
  xhr.open('GET', 'https://jira/jira/rest/api/latest/myself');
  console.log("attempt authorization with user: " + user);
  xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
  xhr.send();
}

const changeButton = () => {
  const newText = Math.floor(Math.random() * 7);
  jsonButton.innerHTML = `${collection[newText]}!`;
}

jsonButton.addEventListener('click', generateJson);
