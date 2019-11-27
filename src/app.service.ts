import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1 id="testassignmentfornodejsdeveloper">Test assignment for Node.js developer</h1>

<p>Needs to implement two REST API services which are form some vote application.</p>

<h3 id="authenticationservice">Authentication service</h3>

<p>Provides API for getting an access token.<br>
POST /get-token <br> 
payload: { accessKey: string } <br>
response: { accessToken: string }</p>

<h3 id="voteservice">Vote service</h3>

<p>Provide API which allows to vote and get vote results. All endpoints work only with valid access token which is passing in headers.</p>

<h5 id="postvote">POST /vote</h5>

<p>headers: x-access-token [accessToken which is given with authentication service] <br>
payload: { voteFor: string } <br>
response: { success: boolean } <br></p>

<p>Adds new vote to database, if a record “voteFor” does not exist creates one</p>

<h5 id="getresults">GET /results</h5>

<p>headers: x-access-token [accessToken which is given with authentication service] <br>
response: { name: string; votes: number; position: number }[] <br></p>

<p>Returns a list of items of a poll which is available only for voted token</p>

<h2 id="requirements">Requirements</h2>

<ul>
<li>Node.js, Typescript, Nestjs should be used</li>

<li>Errors and borderline cases must be taken into account</li>

<li>The test assignment must be production ready</li>

<li>Deploy documentation should be presented</li>
</ul>`;
  }
}
