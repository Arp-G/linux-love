# Systemd

Unit file Ref: <https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files#types-of-units>
Crash course: <https://www.youtube.com/watch?v=N1vgvhiyq0E&t=628s>

* `init` is parent of all Linux processes with PID or process ID of 1.
It is the first process to start when a computer boots up and runs until the system shuts down. init stands for initialization. Its principle role is to create processes from a script stored in the file `/etc/inittab`.
Orphan process are re-parented under init, init also kills zombie process, etc. init or SysV init was used previously to manage processes but has now been replaced by systemd.

* Common usefull systemctl commands
    Ref: <https://www.youtube.com/watch?v=fzOceeJB5vw>
  * `systemctl list-units` - Shows you all services and more information on them
  * `systemctl status <unit>` - Gives the service status, path to its unit file, last few log lines, amount of memory usage, pids of running processes, etc.
        *Common status of units:*
            *inactive
            * active
            *failed
            * static - Not started, frozen by systemd.
            *masked - mask is a stronger version of disable. Using disable all symlinks of the specified unit file are removed. If using mask the units will be linked to `/dev/null` so you cant start the unit even manually.
            * bad - Error when parsing unit file, maybe some system error
  * `systemctl enable <unit>` - Enables a service/unit file to auto-start on boot OR on some state like particular kind of hardware is plugged in, this will NOT start the service, it will create a number of symlinks as encoded in the "[Install]" sections of the unit files which just hooks the unit into various suggested places. Starting actually spawns the daemon process (in case of  service units), or binds the socket (in case of socket units), and so on. Disbale using `systemctl disable <service>`

        For example `systemctl enable nginx` will result in

        ```
        Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service -> /lib/systemd/system/nginx.service
        ```

        This is because the nginx service unit file this in its `[Install]` section
        `WantedBy=multi-user-target`

        *So as defined in the nginx unit file when the nginx service is enabled it is "WantedBy" the "multi-user-target" which means when the system approaches the "multi-user-target" target it will look into the `/etc/systemd/system/multi-user.target.wants/` directory which consist of the pre-requisites for this target and therfore it will auto start the nginx service because of this symlink.*

  * `systemctl start <unit>` - Starts a service, stop it using `systemctl stop <service-name>`
  * `systemctl restart <unit>` - Stop and start the unit again.
  * `systemctl reload <unit>` - Will reload or restart the service to pick up latest configurations
  * `systemctl kill <unit>` -  Kill goes directly and sends a signal to every process in the group, however stop goes through the official configured way to shut down a service as defined in the units `[ExecStop]` section.
  * `systemctl cat <unit>` - To display the unit file that systemd has loaded into its system

* Units are the objects that systemd knows how to manage. A unit can be used to abstract services, network resources, devices, filesystem mounts, and isolated resource pools.
* Systemd Unit file localtions, in order in which they are loaded:
  * `/lib/systemd/system` -> System’s unit files, your distro's unit files.
  * `/usr/lib/systemd/system` -> Unit files from locally installed packages (ag: via apt-get).
  * `/run/systemd/system` -> Location for run-time unit definitions, transient unit files.
  * `/etc/systemd/system` -> Custom user defined unit files.
* systemd **Targets** are different states that your system can boot into, comparable to System V runlevels.
  (Unlike SysV runlevels, target units are named rather than numbered. Complex targets, such as graphical.target, are meta targets made by combining a subset of other targets.)
  Common targets: -
  * **default.target** The target that is booted by default. This is a symbolic link to another target, like graphical.target.
  * **emergency.target** Starts an emergency shell on the console. Find it in your GRUB menu, or enter it at the boot prompt as systemd.unit=emergency.target.
  * **graphical.target** Starts a system with network, multiuser support, and a display manager.
  * **halt.target** Shuts down the system.
  * **multi-user.target** Starts a multiuser system with networking, and no graphical environment.
  * **reboot.target** Reboots the system.
  * **rescue.target** Starts a single-user system without networking.
* The nginx systemd unit file breakdown
  Found in `/lib/systemd/system/nginx.service`

    ```
    [Unit]
    Description=The NGINX HTTP and reverse proxy server
    After=syslog.target network-online.target remote-fs.target nss-lookup.target
    Wants=network-online.target
    
    [Service]
    Type=forking
    PIDFile=/run/nginx.pid
    ExecStartPre=/usr/sbin/nginx -t
    ExecStart=/usr/sbin/nginx
    ExecReload=/usr/sbin/nginx -s reload
    ExecStop=/bin/kill -s QUIT $MAINPID
    PrivateTmp=true
    
    [Install]
    WantedBy=multi-user.target
    ```

    **Explaination:**

  * The `After=` part lists units that will be started before starting the current unit
        For example here this ngix unit file will only get started after the `network.target` is reached that means
        units in `/etc/systemd/system/network-online.target.wants` are started.

  * `Wants=network-online.target` means Systemd will attempt to start `network-online.target` when nginx unit is activated
  * `Type=forking` - Usefull when the service process will spwan child processes and will exit.
                     This tells systemd that the child process is still running even though the parent exited.

  * `PIDFile` - path of the file that should contain the process ID number of the main child that should be monitored
  * `ExecStartPr` - additional commands that should be executed before the main process is started.
  * `ExecStart` path and the arguments of the command to be executed to start the process.
  * `ExecReload` indicates the command necessary to reload the configuration of the service if available.
  * `ExecStop` command needed to stop the service. If this is not given, the process will be killed immediately when the service is stopped.
  * `PrivateTmp` Allocate a private "tmp" directory, using bind mounts and namespace it ensures this tmp directory only visible and available for this service only
  * `WantedBy=multi-user.target`
    Specify how a unit should be enabled, so when we do `systemctl enable nginx`
    A symlink of nginx unit file will be made in `/etc/systemd/system/multi-user.target.wants/`
    That is `/etc/systemd/system/multi-user.target.wants/nginx.service -> /lib/systemd/system/nginx.service`

    This means when the system approaches the "multi-user-target" target it will look into the `/etc/systemd/system/multi-user.target.wants/` directory which consist of the pre-requisites for this target and therfore it will auto start the nginx service because of this symlink.

* Create you own custom systemd unit file
  Ref: <https://dev.to/seojeek/phoenix-deploys-with-elixir-1-9-with-systemd-no-docker-1od0>
  For rails: <https://mikewilliamson.wordpress.com/2015/08/26/running-a-rails-app-with-systemd-and-liking-it/>
  In `/usr/lib/systemd/system/myapp.service`

    ```
    [Unit]
    Description=myApp service
    
    # Start this only after "local-fs.target" and "network.target" are reached 
    After=local-fs.target network.target                                             
    
    [Service]
    # (default) Specifies that the main process of the service is specified in `ExecStart`
    Type=simple 
    
    User=deploy
    Group=deploy
    WorkingDirectory=/home/deploy/build/myApp/_build/prod/rel/myApp
    ExecStart=/home/deploy/build/myApp/_build/prod/rel/myApp/bin/myApp start
    ExecStop=/home/deploy/build/myApp/_build/prod/rel/myApp/bin/myApp stop
    
    # Reads the environment variables from a text file
    EnvironmentFile=/etc/default/myApp.env          
    
    # Sets environment variables for executed processe
    Environment=LANG=en_US.utf8                                                    
    Environment=MIX_ENV=prod
    Environment=PORT=4000
    
    # Maximum number of open files
    LimitNOFILE=65535       
    # default file permission sets for newly created folders and files, 
    # (0027 means all permissions for the file owner, only read and execute permissions for the group, no permissions for others.)                                                       
    UMask=0027 
    
    # used to identify the service in syslog file
    SyslogIdentifier=myApp
    
    # Restart the service if it always, in case it crashes or stops
    Restart=always                                                                
    
    [Install]
    # When this service is enabled it will auto start on boot once the "multi-user.target" is reached.
    WantedBy=multi-user.target     
    ```

    Create a text file for environment varaibles `/etc/default/myApp.env`

    ```
    PORT=4000
    HOSTNAME="myApp.io"
    SECRET_KEY_BASE="[output of mix phx.gen.secret]"
    DATABASE_URL="ecto://postgres:password@myApp.io/[dbName]"
    ```

    Now...

    Reload unit files:
    `sudo systemctl daemon-reload`

    Start your service:
    `sudo systemctl start myapp.service`

    List systemd services:
    `systemctl list-units --type=service`

    Check the status of your service:
    `systemctl status myapp.service`

    Check logs
        Usually the storage directory is /var/log/journal or /run/log/journal
        The storage directory depends on journald configuration.

* Journal
    Ref: <https://www.loggly.com/ultimate-guide/linux-logging-with-systemd/#:~:text=With%20in%2Dmemory%20journaling%2C%20systemd,created%20by%20systemd%20if%20needed>.

  * The journal is controlled by the `systemd-journald daemon`. It collects information from different sources and loads the messages into the journal.
  * The systemd journal is a **binary file** maintained by the daemon. So, it can’t be opened with a text editor.
  * The location and size of this binary file is controlled by the daemon’s configuration file.
  * The journal can be persistent or in memory or can be turned off.
  * With in-memory journaling, systemd creates its journal files under the `/run/log/journal` directory. The
       With persistent storage, the journal is created under `/var/log/journal` directory
  * The main configuration file for systemd-journald is `/etc/systemd/journald.conf`.
      However, other packages can create their configuration files under

      ```
      /etc/systemd/journald.conf.d/*.conf
      /run/systemd/journald.conf.d/*.conf
      /usr/lib/systemd/journald.conf.d/*.conf
      ```

  * Using journal to view logs:
        Ref: <https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs>

        By Unit/service:
        `journalctl -u nginx.service`
        `journalctl -u nginx.service --since today`
        `journalctl -u nginx.service -u php-fpm.service --since today`

        By executable path: display all of the entries that involve the executable in question
        `journalctl /usr/bin/bash`

        By time
        `journalctl --since "2015-01-10 17:15:00"`
        `journalctl --since "2015-01-10" --until "2015-01-11 03:00"`
        `journalctl --since yesterday`
        `journalctl --since 09:00 --until "1 hour ago"`
