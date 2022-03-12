# Usefull Linux commands

## *Index:-*

1. Data Manipulation
    * [sed](#sed)
    * [tr](#tr)
    * [cut](#cut)
    * [awk](#awk)
    * [tee](#tee)
    * [grep && pgrep](#grep--pgrep)
2. Process Management
    * [lsof](#lsof)
    * [ps](#ps)
3. Filesystem
    * [find](#find)
    * [df](#df)
    * [du](#du)
4. Archiving
    * [tar](#tar)
    * [gzip](#gzip)
    * [zip](#zip)
    * [xz](#xz)
5. System Info
    * [uname](#uname)
    * [lshw](#lshw)
    * [lscpu](#lscpu)
    * [lsb_release](#lsb_release)
    * [hostname](#hostname)
6. Networking
    * [ip](#ip)
    * [tracepath](#tracepath)
    * [ping](#ping)
    * [mtr](#mtr)
    * [ss](#ss)
    * [tcpdump](#tcpdump)
    * [dig](#dig)
    * [curl](#curl)
    * [wget](#wget)
7. Misc
    * [watch](#watch)

---

## Data Manipulation

### sed

Stream editor for filtering and transforming text

* Replace a string with something else in a file, but don't modify the file 

`sed 's/toReplace/withString/g filepath`

Use the `-i` (inline) flag to modify and update the file

`sed -i 's/toReplace/withString/g filepath`

* To replace nth line, specify line number before `s/`

`sed '2s/hi/Hello/' file`

* Word boundary `\b` allows you to perform a “whole words only” search

`sed 's/\btoReplace\b/withString/g' filepath`

* Search for string only at begining of line or end of line

`sed 's/^toReplace/withString/g filepath`
`sed 's/toReplace$/withString/g filepath`

* Delete every line that contains a word
`sed '/word/d filepath`

* To use `-e` for extended regex support

```
# Converts lower to upper case
$ sed -e 's/\(.*\)/\U\1/' input.txt > output.txt
```

### tr

Translate or delete characters

* Replace all chracters in first set with corresponding characters in 2nd set

```
arpan@Arpan-desktop:~$ echo "I am in mixed case" | tr [a-z] [A-Z]
I AM IN MIXED CASE
```

* Delete characters using `-d` option
```
arpan@Arpan-desktop:~$ echo "I am in mixed case" | tr -d a
I m in mixed cse
```

* `-s` Squeeze repeats(replace each sequence of a repeated character that is listed in the last specified SET, with a single occurrence of that character)

```
arpan@Arpan-desktop:~$ echo "Happppy birthday toooooooo yoooou" | tr -s 'o'
Happppy birthday to you

arpan@Arpan-desktop:~$ echo "Happppy birthday toooooooo yoooou" | tr -s 'op'
Hapy birthday to you
```

### cut

Remove sections from each line of files.

* Cut by bytes(`-b`) or character(`-c`)

```
# Cut first, 2nd and third bytes
cut -b 1,2,3 filename

# Cut first and 2nd characters
cut -c 1,2 filename

# Cut in ranges of bytes
cut -b 1-3,5-7 filename

# Cut from 1st byte to end of line
cut -b 1- filenames

# Cut from 1st byte to 3rd byte of line
cut -b -3 filenames
```

* Cut by filed (`-f`)

`cut -d "delimiter" -f (filed number) file`

Cut uses tab as default field delimiter, use `-d` to specify different dilimiter

```
arpan@Arpan-desktop:~$ ls -l
total 180
drwxr-xr-x 4 arpan arpan   4096 Feb 20 19:46 dev
-rw-r--r-- 1 arpan arpan    122 Mar  5 13:30 sed_test
drwxr-xr-x 3 arpan arpan   4096 Mar  5 13:28 test
-rw-r--r-- 1 arpan arpan     35 Feb 12 21:17 vim_test.txt
-rw-r--r-- 1 arpan arpan 167182 Feb 26 14:15 zip_3.0-11build1_amd64.deb


# Get 9th column, the `tr -s ' '` command is used delete characters and `tr -s` is used to replace consecutive spaces with a single space 
arpan@Arpan-desktop:~$ ls -l | tr -s ' ' | cut -d " " -f 9

dev
sed_test
test
vim_test.txt
zip_3.0-11build1_amd64.deb

# OR using `sed` instead of `tr` works as well (preceed + with a \, otherwise sed tries to match the character + itself)
ls -l | sed 's/\s\+/ /g' |  cut -d " " -f 9
```

### awk

*Refs*

* https://www.shortcutfoo.com/app/dojos/awk/cheatsheet
* https://www.youtube.com/watch?v=9YOZmI-zWok

AWK is a domain-specific language designed for text processing and typically used as a data extraction and reporting tool.

**AWK variables**

`$0`          -> Entire line
`$1, $2, ...` -> First field, second field and so on
`NF`          -> Number of fields in current record
`NR`          -> Line number of the current record
`FILENAME`    -> Reference current input file
`FS`          -> Field separator of input file (default whitespace)
`RS`          -> Record separator of input file (default newline)

Execute action for matched pattern 'pattern' on file 'file', use `;` to separate two actions
`awk '/pattern/ {action}' file`


`~`                 Match opterator
`-F`                Command line option to specify input field delimiter
`BEGIN` and `END`   Denotes block executed once at start and at end

**Examples**

`awk '{print $1}' file`                         ->  Print first field for each record in file
`awk '/regex/' file`                            ->  Print only lines that match regex in file
`awk '!/regex/' file`                           ->  Print only lines that do not match regex in file
`awk '$2 == "foo"' file`                        ->  Print any line where field 2 is equal to "foo" in file
`awk '$2 != "foo"' file`                        ->  Print lines where field 2 is NOT equal to "foo" in file
`awk '$1 ~ /regex/' file`                       ->  Print line if field 1 matches regex in file
`awk '$1 !~ /regex/' file`                      ->  Print line if field 1 does NOT match regex in file
`awk 'NR!=1{print $1}' file`                    ->  Print first field for each record in file excluding the first record
`awk 'END{print NR}' file`                      ->  Count lines in file
`awk '/foo/{n++}; END {print n+0}' file`        ->  Print total number of lines that contain foo
`awk '{total=total+NF};END{print total}' file`  ->  Print total number of fields in all lines
`awk '/regex/{getline;print}' file`             ->  Print line immediately after regex, but not line containing regex in file
`awk 'length > 32' file`                        ->  Print lines with more than 32 characters in file
`awk 'NR==12' file`                             ->  Print line number 12 of file

### tee

Ref: https://www.youtube.com/watch?v=D_HhOq6sbZw

Read from standard input and write to standard output and files.

When piping commands in linux if we want to store the intermidiate result of some command in a file but also pipe it to the next command we will either have to execute two separate commands or use `tee`


```
sort animals.txt > sorted_animals.txt
sort animals.txt | uniq | wc -l

# OR use `tee`

# Writes to "sorted_animals.txt" but also pipes to stdout for the nxt command
sort animals.txt | tee sorted_animals.txt | uniq | wc -l
```

To append to a file use `-a` with `tee`. You can also specify multiple files for `tee` to write to.

```
sort animals2.txt | tee -a sorted_animals.txt sorted_animals2.txt  | uniq | wc -l
```

You can use process substitution with `tee` to work parallely.

Example: Download a webpage and calculate its hash using different algorithms at the same time

`wget -o - https://www.google.com | tee >(md5sum > file1.md5) >(sha1sum > file2.sh1) > google.txt`

### grep && pgrep

grep  searches  for  PATTERNS in FILE(s)

Usefull switches

* `-i` -> case insensitive search
* `-c` -> Display count of matches
* `-w` -> Search for words
* `-n` -> Show line number in search results

Examples:

```
grep -i "UNix" geekfile.txt
grep -c "unix" geekfile.txt
grep -w "unix" geekfile.txt
grep -n "unix" geekfile.txt
grep "^unix" geekfile.txt                     # Search at begining of file
grep "os$" geekfile.txt                       # Search at end of file
grep –e "cat" –e "bat" –e "dog" geekfile.txt  # Specify expression with -e option. Can use multiple times
```

`pgrep` looks up processes based on name and other attributes.
Search for process pids using process name: `pgrep -i nginx`
---

## Process management

### lsof 

List of open files

* Which files are open?
`lsof`

* Which processes have this file open?
`lsof /var/log/nginx-error.log`

* Which files does process X have open?
`lsof -p 1`

* Where is the binary for this process?
`lsof -p ABC | grep bin`

* Which shared libraries(.so files) is this program using?
`lsof -p PID | grep .so`

* Where is this thing logging to?
`lsof -p ABC | grep log`

* Which files does user XYZ have open?
`lsof -u XYZ`

* Which process is listening on Port X (or using Protocol Y)?
`lsof -i :80`
`lsof -i tcp`

### ps

Report a snapshot of the current processes

`ps`    -> Shows the processes for the current shell
`ps -A` -> Show all processes

---

## Filesystem

### find

Search for files in a directory hierarchy.

Examples

```
# Search by filename
find / -name filename

# Search for all txt files
find / -name "*.txt"

# Search by filename case insensitively
find / -iname fIndMe

# Search by filename and type only file
find / -type f -name findme

# Search by filename and type only directory
find / -type d -name find

# Search by filename with permission
find / -type f -perm 0777

# Files modified more than 10 days
find / -mtime 10

# Files modified less than 10 days
find / -mtime -10

# Files modified more than 1 minute
find / -mmin 1

# Files with size more than 10MB
find / -size 10M

# Files with size more than 2GB
find . -size +2G

# Files with size less than 10KB
find / -size -10k

# Find files greater than 10MB but smaller than 20MB
find . -size +10M -size -20M
```

### df

Report file system disk space usage

Examples

```
# shows space available on all currently mounted file systems
df

# display all the file system, use -a
df -a

# get complete grand total, total used/total size accross all file systems
df --total

# if you specify particular file, then it will show mount information of that particular file
df /home/dev/test.rb

# to display size in power of 1024 that is in GB
df -h /home
```

### du

Short for disk usage, is used to estimate file space usage.

Examples

```
# Print sizes in human readable format
du -h ~


# Get the timestamp of last modified using --time option
du --time -h /home
```
---

## Archive Management

### tar

tar is an archiving utility.

Basic usage examples

```

# Use the 'cvf' option to create a uncompressed tar archive
tar cvf code.tar *.c

# Use the 'xvf' option to uncompress a tar archive
tar xvf code.tar

# For gzip compression on the tar Archive, using option -z
tar cvzf code.tar.gz *.c

# For extracting gzip
tar xvzf code.tar.gz
```

### gzip

Compress or expand files

Basic usage examples

```

# Creates a gzipped file and deletes Original file, to keep the orginal file add the `-k` option
gzip big_db_dump.csv


# Specify compression level with options 1 to 9, where 9 is highest compression but will take more time
gzip -9 big_db_dump.csv

# Decompress a file
gzip -d big_db_dump.gz
```

### zip

ZIP is a compression and file packaging utility for Unix.

`zip [options] zipfile files_list`

Basic usage examples

```
zip myfile.zip filename.txt

unzip myfile.zip 
```

### xz

Compress or decompress .xz and .lzma files.
Files compressed with LZMA/LZMA2 compression algorithm which can give higher compression ratio than gzip.

Basic usage

```
# compress
xz ubuntu.iso

# decompress
xz -d ubuntu.iso
```

**Notes on different types of archiving strategies in Linux:**

* `.tar`                -> uncompressed archive file, often called a tarball, it is a collection of files wrapped up in one single file for easy storage.
                           tar also preserves directory structures and file meta data or attributes. 
  `.zip`                -> (usually) compressed archive file
  `.gz`                 -> file (archive or not) compressed using gzip
  `.xz`                 -> files compressed with LZMA/LZMA2 compression algorithm
  `.tar.gz` OR `.tgz`   -> tar file compressed with gzip algorithm
  `.tar.xz`OR `.txz`    -> tar file compressed with xz

* The gzip and xz commands cannot not compress a directory into a single archive file.
* So gzip and xz can be used with tar to compress arbitrary number of files and folders the resulting file has an extension of `.tgz`/`.tar.gz` or `.tar.xz`/`.txz` 
  and is commonly called a tarball. You have to use `tar` to combine all the files in the directory into a single tar file and then compress it like `tar zcvf dir1.tar.gz dir1/`
* zip is more popular on windows and gzip is more popular on linux, unix and macos.
* zip files can package and compress files/directories on by it’s own, unlike gzip or xz, who needs the help of another command like `tar` to archive/package the files.
---

## System Info

### uname
system name

### lshw
list hardware details, use `sudo lshw --short` for summary

### lscpu
CPU info

### lsb_release
`lsb_release -a` or `cat /etc/os-release`
Get installed linux distro info

### hostname
Gets Linux hostname

---

## Networking

Ref: https://mindmajix.com/linux-networking-commands-best-examples

### ip

Show / manipulate routing, network devices, interfaces and tunnels

Basic usage

```
# Show all network interfaces
ip a

# Show the eth0 is a physical interface representing Ethernet network card.
ip a show eth0
```

Understand the output: https://goinbigdata.com/demystifying-ifconfig-and-network-interfaces-in-linux/

*Common network interfaces:*

* `eth0` is a physical interface representing Ethernet network card. It’s used for communication with other computers on the network and on the Internet.

* `lo` is a special virtual network interface called loopback device. Loopback is used mainly for diagnostics and troubleshooting, and to connect to services running on local host.

* `docker0` is a virtual bridge interface created by Docker.

Get public IP:  `curl ifconfig.me`
Get private Ip: `hostname -I` OR `ip a show eth0`

### tracepath

Traces path to a network host discovering MTU along this path.
(MTU - maximum transmission unit (MTU) is the largest packet or frame size that can be sent in a packet- or frame-based network such as the internet)

It provides the names and identifies every device on the path. 
It follows the route to the destination
It determines where the network latency comes from and reports it.

Basic Usage example

```
arpan@Arpan-desktop:~$ tracepath google.com

 1?: [LOCALHOST]                      pmtu 1500
 1:  Arpan-desktop.mshome.net                              0.293ms
 1:  Arpan-desktop.mshome.net                              0.264ms
 2:  domain.name.dlink.com                                 0.916ms
 3:  10.20.17.129                                          1.855ms
 4:  node-103-217-242-65.alliancebroadband.in              3.919ms
 5:  192.168.199.86                                       43.085ms
 6:  72.14.197.2                                          43.191ms
```

### ping

Linux ping is one of the most used network troubleshooting commands. It basically checks for the network connectivity between two nodes.
The ping command sends the ICMP echo request to check the network connectivity.
Example: `ping google.com`

### mtr

Combination of ping and the traceroute command. It continuously displays information regarding the packets sent with the ping time of each hop.
Usefull for network debugging

Example: `mtr google.com`

### ss

Utility to investigate sockets
This command gives information about all TCP, UDP, and UNIX socket connections.

Flags

-t TCP sockets
-u UDP sockets
-x UNIX sockets

Add "a" to show both connected and listening sockets or use "l" for listing listening sockets only.

Example usage:

```

# List all connected and listening unix sockets
ss -ta

# List all only listening UDP sockets
ss -lu

# list of all the established sockets of TCP for IPV4
ss -t4 state established

# list of all connected ports for a specific IP address
ss dst XXX.XXX.XXX.XXX
```

### tcpdump

captures the traffic that is passing through the network interface and displays it

Syntax: `tcpdump -i <network_device> <optional-type>`

Example: 
 
```
tcpdump -i eth0
tcpdump -i eth0 tcp
tcpdump -i eth0 port 80
```

### dig

Domain Information Groper - used in DNS lookup to query the DNS name server.

Syntax: `dig <domainName> <optional-record-type>`


```
# Gives A records by default
dig google.com

# Gives MX records
dig google.com MX
```

Note there other commands for DNS lookup as well like `host` and `nslookup` but `dig` is preffered.

### curl

Ref: https://flaviocopes.com/http-curl/

Transferring data from or to a server

Syntax: `curl [options] [URL...]`

-o           -> save to file specified
-O           -> save to file with original filename
-I           -> Fetch only headers
-L           -> Follow redirects using HTTP Location headers
-X           -> Specify http method
-d           -> Specify data or data file
-H           -> Specify headers
-u           -> Basic HTTP Authentication `-u user:pass`
--user-agent -> user agent tells the server which client is performing the request. By default curl sends the curl/<version> user agent

Usage Examples

```

# Spits out download content to terminal
curl google.com

# saves to file
curl -o webpage.html google.com

# saves with original filename
curl -O google.com

# Fetch only headers
curl -I google.com

# Use `-L` to follow redirects(by default it doesn’t follow the HTTP Location headers)
curl -L google.com

# Use the `-X` option to specify http method, -H to specify header and -d to specify data
curl -d '{"option": "value", "something": "anothervalue"}' -H "Content-Type: application/json" -X POST https://flaviocopes.com/

# You can also use -d to specify a file from which the data will be sent
curl -d "@my-file.json" -X POST https://flaviocopes.com/
```

### wget

Ref: https://www.digitalocean.com/community/tutorials/how-to-use-wget-to-download-files-and-interact-with-rest-apis

Network downloader

Syntax: `wget [option][URL]`


```

# Save to filename using `-O`
wget -O terraform.zip https://releases.hashicorp.com/terraform/0.12.2/terraform_0.12.2_linux_amd64.zip

# Save to specific directory
wget -P Downloads/  https://code.jquery.com/jquery-3.6.0.min.js

# Download in background
wget -b [URL]

# Check progress of background downloads
tail -f wget-log

# Stopping and resume downloads

# -q is to show less details, --limit-rate 1k will limit download rate to 1kb
wget --limit-rate 1k -q --show-progress <URL>

# Use `-c` option to resume, it wonly works when wget is again excuted from same directory
wget -c --limit-rate 1k -q --show-progress <URL>

# Sending request to some REST API
wget --method=post -O- -q --body-data='{"title": "Wget POST"}' --header=Content-Type:application/json https://jsonplaceholder.typicode.com/posts
```
---

## Misc

### watch

Most common use is execute a command every n seconds example `watch -n 5 'ls -l'` will list the content of the current directory every 5 seconds.