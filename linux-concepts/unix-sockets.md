# Unix Sockets

Reference: <https://www.cloudsavvyit.com/1263/what-are-unix-sockets-and-how-do-they-work/>

* Unix sockets AKA Unix Domain Socket, is an inter-process communication mechanism that allows bidirectional data exchange between processes running on the same machine via a file on disk without any network overhead.

* The socket file doesn’t contain anything, we shouldn’t modify it directly.

* Despite creating files on disk, Unix sockets **don’t actually write the data they send to the disk**, as that would be far too slow. Instead, all the **data is retained within kernel memory**; the only point of the socket file is to maintain a reference to the socket, and to give it filesystem permissions to control access.

* While it is indeed bound through the filesystem, it isn't really a traditional file. Instead, it's just like an TCP/IP socket, except instead of binding an IP and port, a filepath is bound.

* TCP-based sockets are called `stream sockets`, where all data will arrive in order.
* UDP-based sockets are `datagram sockets`, where order (or even delivery) isn’t guaranteed.
  TCP sent over UNIX domain sockets is faster than TCP over network interfaces like ports.

* **Buffers and Reliability**
Unix sockets are reliable. **If the reader doesn't read, the writer blocks**. If the socket is a datagram socket, each write is paired with a read. If the socket is a stream socket, the kernel may buffer some bytes between the writer and the reader, but when the buffer is full, the writer will block. Data is never discarded, except for buffered data if the reader closes the connection before reading the buffer.

* Examples:
  * REDIS
  * MYSQL: If you’re connecting to a MySQL database, you can also use a socket. Usually you’d connect to  host:port from a remote system, but if you’re connecting to a database on the same server (for example, an REST API accessing a database), you can use sockets for a speedup.
* Conect and listen to unix socket using `nc`

    ```
    nc -U /tmp/mysock
    ```

* If you want to work with sockets manually, you can use the socat utility to expose them over network ports:

    ```
    socat TCP-LISTEN:12345 UNIX-CONNECT:/var/lib/socket.sock
    ```
