# Bash Scripting

Reference:
* https://learnxinyminutes.com/docs/bash/

## Different types of comparisons and file checks

File tests: https://tldp.org/LDP/abs/html/fto.html
Comparison operators: https://tldp.org/LDP/abs/html/comparison-ops.html

## Different types of brackets

For complete reference with more examples check this...
Reference: https://dev.to/rpalo/bash-brackets-quick-reference-4eh6

* ( Single Parentheses )
  Single parenthesis will run the commands inside in a subshell.
  Any variables declared or environment changes will get cleaned up and disappeared.
  
```
a='This string'
( a=banana; n)
echo $a # This string
```

* $( Dollar Single Parentheses )

Interpolating a subshell command output into a string
```
intro="My name is $( whoami )"
echo $intro
# => My name is ryan

# And just to prove that it's a subshell...
a=5
b=$( a=1000; echo $a )
echo $b
# => 1000
echo $a
# => 5
```

* $(( Dollar Double Parentheses ))

use $(( Dollar Double Parentheses )) to perform an Arithmetic Interpolation

```
a=$(( 16 + 2 ))
message="I don't want to brag, but I have like $(( a / 2 )) friends."
echo $message
# => I don't want to brag, but I have like 9 friends."

b=$(( a *= 2 ))         # You can even do assignments.  The last value calculated will be the output.
echo $b
# => 36
```

* [ Single Square Brackets ]

The commands inside are run and checked for "truthiness." Strings of zero length are false.
```
if [ -f my_friends.txt ]
then
    echo "Regular file"
fi
```

* [[ Double Square Brackets ]]

For True/false testing, support extended regular expression matching.
Better than `[]`. Just use this instead.

```
[[ $pie =~ [aeiou]d ]]; echo $? # 0 indicates match of regex
```

* { Single Curly Braces }

Used for expansion

```
echo h{a,e,i,o,u}p
# => hap hep hip hop hup
echo "I am "{cool,great,awesome}
# => I am cool I am great I am awesome

# Ranges
echo {01..10}
01 02 03 04 05 06 07 08 09 10
```

* ${dollar braces}

This is for variable interpolation.
(no spaces around the contents)


```
"Signing in as ${name:-$( whoami )}"
```




























