#This is a really rudimentary start script included to make things easier for people
#Works off of relative directories when cloning the project.
#Much easier to use TSX transpiler but found issues with FFMPEG and the transpiled code.

cd ./dist
echo Changed directory to:
pwd
echo Removing old build...
echo Removing files:
rm -fv *.js
cd ./commands
echo Changed directory to:
pwd
echo Removing files:
rm -fv *.js
cd ../
echo Changed directory to:
pwd
cd ./events
echo Changed directory to:
pwd
echo Removing Files:
rm -fv *.js
cd ../
echo Changed directory to:
pwd
cd ../ 
echo Changed directory to:
pwd
echo Starting TS compiler...
tsc
echo Finished compiling.
echo Starting node...
npm start
