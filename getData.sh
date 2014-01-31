#!/bin/bash
curl –silent https://www.dan.me.uk/tornodes 2>/dev/null | sed -n "/<\!-- __BEGIN_TOR_NODE_LIST__ \/\/-->/,/<\!-- __END_TOR_NODE_LIST__ \/\/-->/p" | sed '1d;$d' | sed 's/<br \/>//g'