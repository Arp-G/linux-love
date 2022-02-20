#!/bin/bash


function printMatrix() {
	matrix=($@)
	for row in "${matrix[@]}"
	do
		echo $row
	done
}

arr=()

echo "Enter number of rows in the matrix"
read row_count

i=1
while [ $i -le $row_count ]
do
	echo "Enter content of row #$i"
	read rowcontent
	arr+=("$rowcontent")
	i=$((i + 1))
done

printf "\nMatrix:\n"

printMatrix ${arr[@]}


# Transpose
i=0
transposed=()

while [ true ]
do
	newrow=""
	for row in "${arr[@]}"
	do
		newrow="${newrow}${row:i:1}"

	done

	if [ "$newrow" == "" ]
	then
		break;
	fi

	transposed+=("$newrow")
	i=$((i + 1))
done

printf "\nTrasposed Matrix:\n"

printMatrix ${transposed[@]}

