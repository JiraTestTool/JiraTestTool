# Excel2Jira
convert formatted JIRA test case steps to Excel and back to JIRA again.

A project for Tapestry Solutions in SLO.

Authors:
Michael Fekadu, Jonathan Devera, Chris Toh 



### How To Use
1. Open [ConvertTableToJIRAMarkup.xlsm](/ConvertTableToJIRAMarkup.xlsm)
2. Click ```Sheet4```
3. Click ```Developer >> Macros >> ConvertToJiraTable >> Run```
4. **Notice the Message Box**
5. Try ```CTRL+V``` in a JIRA comment box, then click preview


### Things To Know
* I have been writing the code in [ConvertTableToJIRA.vb](/ConvertTableToJIRA.vb) and copying the contents of that file into ```Module1``` of [ConvertTableToJIRAMarkup.xlsm](/ConvertTableToJIRAMarkup.xlsm)
  * you can find ```Module1``` by clicking ```Developer >> View Code >> Modules >> Module1```
* Note that the program currently just puts formatted text into your clipboard. The design requirements want the formatted text to appear within a Spreadsheet. That step is a trivial for-loop of updating Cells once we have the properly formatted text stored in a variable. Also, Excel suffers from a noticable decrease in performance when updating Cells in a Spreadsheet, so it is best to save that step until the end. 

### Task Description
Develop a Test Step Editor Tool

The following JIRA Markup Language will be incorporated in the test step editor tool:

- [x] **Bold**
- [ ] *Italics*
- [ ] __ Underline __
- [ ] "Quotes"
- [ ] Colors
- [ ] VP Insertion / Conversion
- [ ] Bar Delimiters for tables '|'
- [ ] 2-way compatibility (user can paste a test case into the editor and make it human readable)

If time is still allotted for the effort, we can also incorporate 'nice-to-have' features.
???

Release Plan:

Agenda	Completion Date	Complete ?

Finish Reqs for V1	Feb. 16	

Initial Design	Mar. 7	

Initial Prototype	April 6	

Final Prototype	April 13	

Release	April 27
