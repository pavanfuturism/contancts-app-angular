# contancts-app-angular
Clone angular using "https://github.com/pavanfuturism/contancts-app-angular.git"

I have used below versions for Angular
Node Version: 20.10.0
Angular Version: 17.0.3

If you don't have angular/node js install in system please follow the below steps
1. Install node js from "https://nodejs.org/en/download"
2. After installation of Node Js install angular using "npm install -g @angular/cli"
3. After installation of Angular open CMD & change your directory using "cd <directorypath>"
4. Once your directory is changes in CMD, enter "npm install" to install all packages.
5. Check API is running or not, if not, then make .Net project run, copy the URL and paste in Enviornment/enviornment.ts file, replace the value in "baseUrl" key.
6. Now you can enter "ng serve" command to run your application, it will be hosted on localhost:4200
7. Enter localhost:4200 in your browser

                **Design Architecture**
1.	app/pages/contacts – this folder have all the pages like contact list & add update page
2.	shared/models – this folder have the shared DTO for the frontend project
3.	shared/services – this folder contains all the services required for the contacts app. This contains contact-service which communicates to API. This folder also have interceptor which intercepts incoming/outgoing http requests to check for authentication or updating any header value.
4.	Shared/validators – this folder contains all the custom validators required
5.	Shared – this folder also contains task related files which are responsible for state management
6.	Third Party Library – I have used prime ng library for controls.
