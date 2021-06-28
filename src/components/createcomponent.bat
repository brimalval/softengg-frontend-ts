#!/bin/bash
component=$1
extrapath=$2
mkdir $extrapath/$component
cd $extrapath/$component
echo > "${component}.tsx" && echo > "${component}.module.css"
code "${component}.module.css" && code "${component}.tsx" 
cd ..
echo "export { default as ${component} } from './${component}/${component}';" >> index.ts