
#!/us/bin/env bash

echo "Prime Checker"
echo "Enter a number"
read num

count=0

for ((i = 1; i < num/2 + 1; i++))
do
	if [ $((num % i)) -eq 0 ]
	then
		count=$((count + 1))
	fi
done

if [ $count -gt 1 ];
then
	echo "$num is not a prime number"
else
	echo "$num is a prime number"
fi

