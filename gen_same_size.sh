#!/bin/bash
# Generates $NUM files of the size of $SIZE (in kilobytes) into $TARGET

NUM=$1
SIZE=$(($2*1000))
TARGET=$3

gen() {
  FILE=$1
   SIZE=$2
   < /dev/urandom tr -dc "[:space:][:print:]" | head -c$SIZE > $FILE
   echo "Generated file $FILE"
}

TOTAL=$(($NUM * $SIZE / 1000000000))
echo "Final total size: $TOTAL GB"
read -p "Enter to continue"
i=0
while [ $i -lt $NUM ]
do 
   gen $TARGET/$i $SIZE
   ((i++))
done

