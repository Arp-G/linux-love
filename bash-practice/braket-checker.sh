#!/usr/bin/env bash

function checkValid()
{
	normal=0
	curly=0
	square=0


	str="$1"

	for ((i=0; i < ${#str}; i++))
	do

		case "${str:i:1}" in
			\(	) normal=$((normal+1));;
			\)	) normal=$((normal-1));;
			\{	) curly=$((curly+1));;
			\}	) curly=$((curly-1));;
			\[	) square=$((square+1));;
			\]	) square=$((square-1));;
			*	) ;;
		esac

		if [[ "$normal" < 0 || "$curly" < 0 || "$square" < 0 ]]
		then
			echo "$str is an invalid expression"
			exit 0
		fi

	done

	if [[ "$normal" != 0 || "$curly" != 0 || "$square" != 0 ]]
	then
		echo "$str is an invalid expression"
	else
		echo "$str is a valid expression"
	fi

}


echo "Enter an expression with (),{},[] brakets"
read str

checkValid $str

