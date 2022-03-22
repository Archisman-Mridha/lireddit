echo enter the production version :
read version

cd ~/Documents/resume/lireddit

nx build server --configuration=production

cd server

docker build -t archismanmridha/lireddit:$version .
docker push archismanmridha/lireddit:$version

cd ../