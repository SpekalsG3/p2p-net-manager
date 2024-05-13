# P2P Net Manager

Light-weight web manager for p2p network and its simulation.

# Why pure JS

Seems simpler than React:
- I need custom methods on elements to better encapsulate the code.
Otherwise, it'd be multiple if statements.
- I need to store these elements and not rerender the page each time one updates.
- I need to call one element from another element (GraphNode creates Line).
That would be a mess with higher-level functions.
- In regard to rendering I need only updating couple styles. React is overkill.

But I'm not sure if it is better to use some library for drawing purposes. But
again, I need to store all the elements and access them to read/write data.
That's a huge criteria and I don't know of such libraries. Research might take
longer.

# How to run

Visit [GitHub Page](https://spekalsg3.github.io/p2p-net-manager/index.html)
for simulation software.

Or if you want to connect to real network, then clone and *TODO*. Simulation
software will be also available by simply opening [index.html](./index.html)
in you browser.

# WIP...

First goal is to implement simulation of new node connecting to existing network
via different algorithms:
- [ ] Bitcoin-like crawler
- [ ] Degree-Constrained Minimum Spanning Tree (DCMST) - find a subgraph with
around `k` connections between nodes in a weighted undirected graph.
