#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST == "false" && ! -z "$TRAVIS_TAG" ]]; 
then

    grunt release
 
    git clone https://github.com/Label305/Auja-bower.git auja-bower
    cp -f dist/auja.min.js auja-bower/auja.min.js
    cd auja-bower
    
    git config credential.helper "store --file=.git/credentials"
    echo "https://${GH_TOKEN}:@github.com" > .git/credentials
    git config --global user.email "hallo@label305.com"
    git config --global user.name "Travis"
    
    git fetch origin master
    git checkout master
    git add -f auja.min.js
    
    git commit -m "Build.$TRAVIS_BUILD_ID $TRAVIS_TAG"
    git push --force origin master 
    
    git tag -a $TRAVIS_TAG -m "Release $TRAVIS_TAG build.$TRAVIS_BUILD_ID"
    git push --force origin $TRAVIS_TAG
    
else
    echo "Skipping deploy to Auja-bower repo"
fi
