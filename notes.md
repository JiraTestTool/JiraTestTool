https://msdn.microsoft.com/en-us/vba/language-reference-vba/articles/calling-sub-and-function-procedures

* Calling Sub Procedures with More than One Argument
```
Sub Main()
 HouseCalc 99800, 43100
 Call HouseCalc(380950, 49500)
End Sub

Sub HouseCalc(price As Single, wage As Single)
 If 2.5 * wage <= 0.8 * price Then
 MsgBox "You cannot afford this house."
 Else
 MsgBox "This house is affordable."
 End If
End Sub
```


* links from Jon
  * https://stackoverflow.com/questions/16209572/vba-check-if-partial-bolding-in-cell
  * https://msdn.microsoft.com/en-us/vba/excel-vba/articles/range-characters-property-excel
