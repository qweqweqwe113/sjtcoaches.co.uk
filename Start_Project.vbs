Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get the directory where this script is located
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Change to the script directory
WshShell.CurrentDirectory = scriptDir

' Create a message box to show the project is starting
MsgBox "Starting Albion Coach Project..." & vbCrLf & vbCrLf & _
       "The development server will open in a new window." & vbCrLf & vbCrLf & _
       "Frontend: http://localhost:8080" & vbCrLf & _
       "Admin: http://localhost:8080/admin" & vbCrLf & vbCrLf & _
       "Press Ctrl+C in the terminal to stop the server.", _
       vbInformation, "Albion Coach Launcher"

' Run the batch file in a new command window
WshShell.Run "cmd.exe /k start-project.bat", 1, False

' Wait a few seconds and open the browser
WScript.Sleep 5000

' Open the default browser to localhost:8080
WshShell.Run "http://localhost:8080", 1, False
