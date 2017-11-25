# Tech-Talks
CSC-519 DevOps

DEMO AND SCREEN CAST: https://youtu.be/EZkIurOw370


## CONSUL ##
 
Consul was developed by Hashicorp. It is a distributed service discovery tool and key value store. 
### Main purpose of the tool ###
The main purpose of the tool can be summarised as below.
Service Discovery: Consul cluster consists of client and servers. Clients of Consul provide a service. The type of service provided can vary depending on the cluster and the application. Common services include Mysql, web services or DNS. The cluster also includes clients that need to use these services. Consul helps to connect the client and server over the local, data center or wide area network.
Health Checking: Consul runs as agents in the clients and servers. It exposes an Application programming interface. The agent uses these API’s to conduct health checks. The health checks can be configured to be run for the node as well as for the service. If the health check fails, the consul cluster, marks the node as failed. If a node then requests that service, the traffic is no longer redirected to the failed node. Thus the consul can manage and efficiently manage traffic across working nodes without making any changes on the application itself and thus creates an abstraction for the application.
KV Store:  Consul provide HTTP APIs to both store and retrieve key/value data in their distributed key/value store.
Multi Datacenter: Consul supports service discovery across data centers This means that the the service providers and users can be spread across various data centers. The consul can handle the routing of the traffic between the nodes. This can be done using overlay networks and tunneling.
## Consul Architecture ##
Consul is distributed and highly available system. It runs as a cluster of systems so that there is no single point of failure. 
Every node that provides services to Consul runs a Consul agent. Running an agent is not required for discovering other services or getting/setting key/value data. The agent is responsible for health checking the services on the node as well as the node itself


Agent - An agent is the long running daemon on every member of the Consul cluster. It is started by running consul agent. The agent is able to run in either client or server mode. Since all nodes must be running an agent, it is simpler to refer to the node as being either a client or server, but there are other instances of the agent. All agents can run the DNS or HTTP interfaces, and are responsible for running checks and keeping services in sync.
Client - A client is an agent that forwards all RPCs to a server. The client is relatively stateless. The only background activity a client performs is taking part in the LAN gossip pool. This has a minimal resource overhead and consumes only a small amount of network bandwidth.
Server - A server is an agent with an expanded set of responsibilities including participating in the Raft quorum, maintaining cluster state, responding to RPC queries, exchanging WAN gossip with other datacenters, and forwarding queries to leaders or remote data centers.

![Screenshot of consul.PNG.html](https://github.ncsu.edu/abandar/Tech-Talks/blob/master/consul.PNG)

Now as with every distributed architecture it becomes necessary to communicate  between the different nodes. Consul uses a gossip protocol - Serf,  to manage cluster membership, failure detection, and general orchestration.
 Serf relies on TCP and UDP unicast. Broadcast and Multicast are rarely available in a multi-tenant or cloud network environment. For that reason, Consul and Serf were both designed to avoid any dependence on those capabilities.
The gossip protocol serves as a database as it contains the list of all the nodes in the cluster. As a result the nodes do not handle the task of service discovery and node failures. The gossip protocol can work over the LAN and WAN network.
Consul uses a consensus protocol - Raft to maintain consistency. The servers in each datacenter run Raft protocol. This protocol helps to elect a leader among all the participating nodes. This election of the leader helps in synchronisation on the distributed architecture.
This results in a very low coupling between datacenters, but because of failure detection, connection caching and multiplexing, cross-datacenter requests are relatively fast and reliable.
### USE CASES ###
The usage of service discovery comes in as a boon for distributed systems. Conul allows independent operation of nodes across the LAN and WAN network 
Consul generally outperforms other service discovery tools like Zoo Keeper and etcd other tools that offer a similar service.
ZooKeeper, doozerd, and etcd are all similar in their architecture. All three have server nodes that require a quorum of nodes to operate (usually a simple majority). They are strongly-consistent and expose various primitives that can be used through client libraries within applications to build complex distributed systems.
Consul also uses server nodes within a single datacenter. In each datacenter, Consul servers require a quorum to operate and provide strong consistency. However, Consul has native support for multiple datacenters as well as a more feature-rich gossip system that links server nodes and clients.
All of these systems have roughly the same semantics when providing key/value storage: reads are strongly consistent and availability is sacrificed for consistency in the face of a network partition. However, the differences become more apparent when these systems are used for advanced cases.
The semantics provided by these systems are attractive for building service discovery systems, but it's important to stress that these features must be built. ZooKeeper et al. provide only a primitive K/V store and require that application developers build their own system to provide service discovery. Consul, by contrast, provides an opinionated framework for service discovery and eliminates the guess-work and development effort. Clients simply register services and then perform discovery using a DNS or HTTP interface. Other systems require a home-rolled solution.
A compelling service discovery framework must incorporate health checking and the possibility of failures as well. It is not useful to know that Node A provides the Foo service if that node has failed or the service crashed. Naive systems make use of heartbeating, using periodic updates and TTLs. These schemes require work linear to the number of nodes and place the demand on a fixed number of servers. Additionally, the failure detection window is at least as long as the TTL.
ZooKeeper provides ephemeral nodes which are K/V entries that are removed when a client disconnects. These are more sophisticated than a heartbeat system but still have inherent scalability issues and add client-side complexity. All clients must maintain active connections to the ZooKeeper servers and perform keep-alives. Additionally, this requires "thick clients" which are difficult to write and often result in debugging challenges.
Consul uses a very different architecture for health checking. Instead of only having server nodes, Consul clients run on every node in the cluster. These clients are part of a gossip pool which serves several functions, including distributed health checking. The gossip protocol implements an efficient failure detector that can scale to clusters of any size without concentrating the work on any select group of servers. The clients also enable a much richer set of health checks to be run locally, whereas ZooKeeper ephemeral nodes are a very primitive check of liveness. With Consul, clients can check that a web server is returning 200 status codes, that memory utilization is not critical, that there is sufficient disk space, etc. The Consul clients expose a simple HTTP interface and avoid exposing the complexity of the system to clients in the same way as ZooKeeper.
Consul provides first-class support for service discovery, health checking, K/V storage, and multiple datacenters. To support anything more than simple K/V storage, all these other systems require additional tools and libraries to be built on top. By using client nodes, Consul provides a simple API that only requires thin clients. Additionally, the API can be avoided entirely by using configuration files and the DNS interface to have a complete service discovery solution with no development at all.
 
 
## Below are the advantages that consul provides. ##
 
| Properties | Consul | Etcd | Zoo Keeper

| ---------- | ------------- | ----------

User Interface | Available | NO | NO
| ---------- | ------------- | ----------
RPC | Available | Available |NO
| ---------- | ------------- | ----------
Health Check |HTTP API | HTTP API | TCP
| ---------- | ------------- | ----------
Key Value | 3 Consistency modes | Good Consistency |Strong Consistency
| ---------- | ------------- | ----------
Language | Golang | Golang | Java
 | ---------- | ------------- | ----------

### Disadvantages: ###
As with any distributed architecture, consul faces issues with synchronisation. Consul relies heavily on the functionality of the underlying network. Consul does not provide efficient network checks and repairs.
Also consul sends repeated messages for communicating and maintaining synchronisation between the nodes of the cluster. This increases the bandwdith consumption and introduces latency in the system
##Example of using consul in deploying applications  ##
Suppose we have an node that provides database services in the cluster. The consul agent can run a health check on the node. The health check can be to measure the CPU and memory usage on the node. Now if the health check detects that the resource utilisation is above the set threshold, consul can redirect the traffic to other nodes that provide that service and this can avoid load on the existing node. Thus consul can be used to distribute load among clusters.
References:
https://www.consul.io/docs/index.html
https://blog.scottlowe.org/2015/02/06/quick-intro-to-consul/


