# HW4

##TOPOLOGY:
Two Express servers API and Ratings are running on localhosts and ports 3000 & 5000.

API server has 4 routes:
* /gateway
	The gateway route redirects requests to other 3 routes - 
* /api at 99% probability
* /apicontrol at 0.5% probability
* /apiexp at 0.5% probability

/api redirects requests to /ratings server and throws an error 500, if the service is down.
/api control also redirects requests to 

I used Math.random() function to generate random values at the probabilities of 99,0.5 and 0.5

Now, when a request hits the gateway, it is redirected to the 3 routes based on the above mentioned probabilities.

The shell script test.sh generates 200 requests.
Out of which 100 are with the ratings service up and 50, when the service is down and 50 when the service comes up again.

The script analyzes the output of the 200 requests/response and prints a summary of the curl HTTP requests.

The results are a summary of number of requests being redirected to each route within the API server and the requests reaching the Ratings server.
Also, it comments on how API server handles the requests, when the ratings server is down. - It basically sends 500 response code.

