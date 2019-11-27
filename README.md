#Test assignment for Node.js developer
Needs to implement two REST API services which are form some vote application.
###Authentication service
Provides API for getting an access token.<br>
POST /get-token <br> 
payload: { accessKey: string } <br>
response: { accessToken: string }
###Vote service
Provide API which allows to vote and get vote results. All endpoints work only with valid access token which is passing in headers.
#####POST /vote
headers: x-access-token [accessToken which is given with authentication service] <br>
payload: { voteFor: string } <br>
response: { success: boolean } <br>

Adds new vote to database, if a record “voteFor” does not exist creates one
#####GET /results
headers: x-access-token [accessToken which is given with authentication service] <br>
response: { name: string; votes: number; position: number }[] <br>

Returns a list of items of a poll which is available only for voted token
##Requirements
- Node.js, Typescript, Nestjs should be used
- Errors and borderline cases must be taken into account
- The test assignment must be production ready
- Deploy documentation should be presented
