#!/bin/bash
component=$1
mkdir $component
cd $component
echo > "${component}.tsx" && echo > "${component}.module.css"
code "${component}.module.css" && code "${component}.tsx" 
cd ..
echo "export { default as ${component} } from './${component}/${component}';" >> index.ts