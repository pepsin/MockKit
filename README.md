#MockKit - Eliminate the backend hassle
![alt text](mockkit.png "MockKit Logo")

##Install MockKit

	sudo npm install mockkit -g

##Use MockKit

Prepare a `routes.json` in the working directory.

And write the routes like below:

	{
		#Label  | Route Rule  | Mock File
  		"index" : ["/\/$/", "./small_test.html"],
  		"dude" : ["/great_dude/hello", "./x.json"]
	}
	
And fire up

	mockkit use routes.json

And visit the `127.0.0.1:1234`, that's all.


##IMPORTANT
Currently not support multiple directory static file detection.

##LICENSE
MIT
