#!/bin/bash

for i in {0..100}; # 100 requests to when ratings is Up
do
curl -LI http://localhost:3000/gateway >> resp.txt
done
ps -ef | grep ratings.js | grep -v grep | awk '{print $2}' | xargs kill # kills ratings service
for i in {0..50};
do
curl -LI  http://localhost:3000/gateway >> resp.txt # 50 requests when ratings is down
done
node ratings.js&
for i in {0..50}; # 50 requests when ratings is back up
do
curl -LI http://localhost:3000/gateway >> resp.txt
done

Successfulhits=$(cat resp.txt | grep "200 OK" | wc -l)
hitstoapi=$(cat tmp.txt | grep "/api" | wc -l)
hitstoapicontrol=$(cat tmp.txt | grep "/apicontrol" | wc -l)
hitstoapiexp=$(cat tmp.txt | grep "/apiexp" | wc -l)
errorcode=$(cat resp.txt | grep "500 Internal Server Error" | wc -l)

echo "Out of 200 requests:\n No. of hits to /api is "$hitstoapi""
echo "No. of hits to \apicontrol is "$hitstoapicontrol""
echo "No. of hits to apiexp is "$hitstoapiexp""
echo $Successfulhits" times the ratings service was hit"
echo "This shows that when the ratings is down, API just returns an error code 500, "$errorcode" times"
