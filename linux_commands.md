## sed

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

## tr

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

## cut

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

## awk

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


## tee

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
