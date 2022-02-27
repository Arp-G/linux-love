# Linux File System

<https://www.linux.com/training-tutorials/linux-filesystem-explained/>
<https://www.youtube.com/watch?v=42iQKuQodW4>

![image](https://user-images.githubusercontent.com/39219943/154847570-865e63ab-8529-463b-b888-5d4cb7c95842.png)

Directories
From top to bottom, the directories you are seeing are as follows.

* `/bin` is the directory that contains binaries, that is, some of the applications and programs you can run.

* `/boot` directory contains files required for starting your system.

* `/dev` is a virtual directory contains device files. Many of these are generated at boot time or even on the fly.
       For example, if you plug in a new webcam or a USB pendrive into your machine, a new device entry will automagically pop up here.

* `/etc` directory contains system-wide configuration files. For example, the files that contain the name of your system, the users and their passwords, etc

* `/home` your users’ personal directories.

* `/lib` is where libraries live. Libraries are files containing code that your applications can use. They contain snippets of code that applications use to draw windows on your desktop, control peripherals, or send files to your hard disk.

* `/media` directory is where external storage will be automatically mounted when you plug it in and try to access it.

* `/mnt` Manually mount storage devices or partitions.

* `/opt` directory is often where software you compile (that is, you build yourself from source code and do not install from your distribution repositories) sometimes lands. Applications will end up in the /opt/bin directory and libraries in the /opt/lib directory.
(Another place where applications and libraries end up in is "/usr/local", When software gets installed here, there will also be "/usr/local/bin" and "/usr/local/lib" directories.)

* `/proc` is a virtual directory. It contains information about your computer, such as information about your CPU and the kernel your Linux system is running.

* `/root` is the home directory of the superuser.

* `/run` is used by system processesto store temporary data.

* `/sbin` is similar to /bin, but it contains applications that only the superuser will need.

* `/usr` contains a mish-mash of directories which in turn contain applications, libraries, documentation, wallpapers, icons and a long list of other stuff that need to be shared by applications and services.

* `/srv`  contains data for servers. If you are running a web server from your Linux box, your HTML files for your sites would go into /srv/http (or /srv/www). If you were running an FTP server, your files would go into /srv/ftp

* `/sys` is another virtual directory like /proc and /dev and also contains information from devices connected to your computer.
(For example, change the brightness of the screen of my laptop by modifying the value stored in the /sys/devices/pci0000:00/0000:00:02.0/drm/card1/card1-eDP-1/intel_backlight/brightness file.)

* `/tmp` contains temporary files, usually placed there by applications that you are running.

* `/var` contains logs in the /var/log subdirectories also contains spools for tasks.
