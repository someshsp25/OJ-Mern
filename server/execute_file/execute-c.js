const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const { rejects } = require('assert');
const { firebaseDB } = require('../utils/firebase/connection');
const admin = require('firebase-admin');
const firestore = admin.firestore();

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}


const executeC = async (filePath,questionId) => {
    let questionRef = firebaseDB.collection('hidden-cases').doc(`${questionId}`);
    try {
        const docSnap = await questionRef.get();
        if (docSnap.exists) {
            const testCase = docSnap.data();
            const hiddenInput = testCase.hiddenInput;
            const hiddenOutput = testCase.hiddenOutput;
            
            const fileNameInput = `input.txt`;
            const fileNameOutput = `test.txt`;

            const filePathInput = path.join(outputPath,fileNameInput);
            const filePathOutput = path.join(outputPath,fileNameOutput);

            await fs.writeFileSync(filePathInput,hiddenInput);
            await fs.writeFileSync(filePathOutput,hiddenOutput);

            const jobId = path.basename(filePath).split(".")[0];
            const execPath = path.join(outputPath,`${jobId}.out`);
            return new Promise((resolve,reject) => {
                exec(
                    `gcc ${filePath} -o ${execPath} &&
                     rm -rf ${filePath} &&
                     cd ${outputPath} &&
                     timeout 1s ./${jobId}.out < ${filePathInput} > output.txt &&
                     rm -rf ${jobId}.out &&
                     rm -rf ${filePathInput} &&
                     rm -rf ${filePath} &&
                    if grep -Fxq -f test.txt output.txt; then echo "Code passed all test cases"; else echo "Hidden test cases failed"; fi ||
                    echo TLE && rm -rf ${jobId}.out && rm -rf ${filePathInput} && rm -rf ${filePath} && rm -rf output.txt && rm -rf test.txt`,
                    (error,stdout,stderr) => {
                        if(stderr){
                            // console.error(`exec stderr: ${stderr}`);
                            const filteredStderr = stderr
                                                        .replace(/^(.+?):|\s+at\s+.+?:\d+:\d+$/gm, '') // Remove file names and location info
                                                        .replace(new RegExp(filePath, 'gm'), ''); 
                            resolve(filteredStderr) ;
                        }
                        if(error){
                            console.error(`exec error: ${error}`);
                            return ;
                        }
                        resolve(stdout);
                    }
                );
            });
        } else {
          console.log("Document not found!");
        }
      } catch (error) {
        console.error("Error getting document compilation Ended:", error);
    }
};

module.exports = {executeC};
