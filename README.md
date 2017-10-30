# HW #3 Proxies, Queues, Cache Fluency.

Understanding the basic building blocks that form complex infrastructure is an important precedent to being able to construct and deploy it.


### Conceptual Questions

**1. Describe some benefits and issues related to using Feature Flags.**

**Benefits:**
Feature flags eliminate the cost of maintaining and supporting branches with very long lifespan.
Eliminates merge conflicts.
Reduces deployment risk through incremental release strategies. 
Enables a user to release a new feature to a set of users and check/test the new code feature before releasing it to the rest of the user base. It also provides the functionality to turn off the new feature, in case any issue occurs.(Dark/Shadow launch). Thus enabling faster release of new code to prodution environments.
**Issues:**
Feature flags are expensive and cost the company too much if they are in the code for too long. Also, testing the application gets complicated with more number of options being added to the code.
Improper implementation of feature flags may lead to random and unpredicatble results in the production environment.
	
**2. What are some reasons for keeping servers in seperate availability zones?**

- Redundancy: in case of outage or failure. If there is a power outage in a particular zone, having a redundant server in a separate availability zone ensures that the system is available for users.
- Isolation: Allows for having an isolated production zone to deploy a new feature and  route requests between the separate availability zones. 
- Resiliency: If the environment at one of the zones is polluted, say, a corrupt cache, different zone available where there is no cache corruption issue would keep the application available to users all the time.

**3. Describe the Circuit Breaker pattern and its relation to operation toggles.**

Software systems make remote calls to processes running on different machines across a network. Remote calls can fail or wait for a response till timeout When the system is experiencing peak load, such unresponsive calls from multiple calls can lead to simultaneous failures across the system leading to depletion of critical resources.
A circuit breaker pattern prevents this by wrapping such calls in a circuit breaker object. The circuit breaker object monitors for failures and when the failures exceed a certain threshold, all subsequent calls are returned with an error without the actual call being made. The underlying calls can be checked for success and if they succeed, the circuit breaker is reset and resumes it’s normal operation.

Operation Toggles are used to control the operational aspects of a system’s behavior. When a feature has unclear performance implications, operators need the control to disable such features in production. Ops Toggles provide this control to developers so that they could stop the code with random and undpredicatble results from being executed in the production environment. Ops Toggles usually have a short lifespan but can consume an ample amount of resources and might require to be shut down during peak load.

**4. What are some ways you can help speed up an application that has**
   **- a) traffic that peaks on Monday evenings**
   **- b) real time and concurrent connections with peers**
   **- c) heavy upload traffic**

- **Smart DNS Services and routing** can help speed up an application with real time connections. Latency is an issue with real time connections and if the latency goes beyond a desired value, packet loss would be huge. Latency based routing can be used for sensitive applications with real time connections. Geo based routing/DNS can be done for peers in geographically different areas.
- **Load balancing** can help speed up applications that has traffic that peaks on specific hours/days and also applications with heavy upload traffic. A load balancer can route requests to different available servers and also request a new auto-scaling instance, if required. All the instances are monitored and only the healthy instances receive requests, thus keeping the resource utilization of the instances below a threshold value, leading to more speed in peak times as well.
- **Availability Zones:** Geographically placed production environments can help speed up applications in peak hours. Requests are served by servers that are geographically closest to the place from which the request originated.
- **Proxy Server** helps speed up applications. A Proxy server creates requests to the application server and the application server delivers content to the Proxy Server at high speeds. The application server wouldn't need to interact with clients and wait for their responses, thus reducing any latency in request handling.

### Youtube link to the Screencast:
		
