nx build server

cd server

heroku container:push web --app lireddit-cloned
heroku container:release web --app lireddit-cloned