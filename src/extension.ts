import * as vscode from 'vscode';
import { spawn } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    console.log('Python Errors extension activated');

    // Register a new event handler for when a text document is opened
    vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
        // Check if the document is a Python file
        if (document.languageId === 'python') {
            // Get the path to the Python file
            const filePath = document.fileName;

            console.log('Python file opened:', document.fileName);

            const pythonProcess = spawn('python', [filePath]);
          
            // Listen for errors from the Python process
            pythonProcess.stderr.on('data', (data) => {
              console.error(`Python error: ${data}`);
            });
          
            // Listen for the Python process to exit
            pythonProcess.on('exit', (code) => {
              console.log(`Python process exited with code ${code}`);
              pythonProcess.kill();
            });
        }
    });

    // Register a new event handler for when a text document is saved
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        // Check if the document is a Python file
        if (document.languageId === 'python') {
            // Get the path to the Python file
            const filePath = document.fileName;

            console.log('Python file saved:', document.fileName);

            const pythonProcess = spawn('python', [filePath]);
          
            // Listen for errors from the Python process
            pythonProcess.stderr.on('data', (data) => {
              console.error(`Python error: ${data}`);
              //grab the last line of the error
              let error = data.toString().split('\n');
              // index to the second to last line of the array error
                let errorLine = error[error.length - 2];
                console.log(errorLine);

            });
          
            // Listen for the Python process to exit
            pythonProcess.on('exit', (code) => {
              console.log(`Python process exited with code ${code}`);
              pythonProcess.kill();
            });
        }
    });

}

export function deactivate() {
    console.log('Python Errors extension deactivated');
}