#!/bin/bash
# Generates $NUM files of the size of $SIZE (in kilobytes) into $TARGET named from 0 to $NUM

NUM=$1
SIZE=$(($2*1000))
TARGET=$3

gen() {
  FILE=$1
  SIZE=$2
   < /dev/urandom tr -dc "[:space:][:print:]" | head -c$SIZE > $FILE
   echo "Generated file $FILE"
}

i=0
while [ $i -lt $NUM ]
do 
  gen $TARGET/$i $SIZE
  ((i++))
done

