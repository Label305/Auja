# Releasing

 1. Checkout to `dev`
 2. Update the `CHANGELOG.md` file with relevant info and date;
 3. `git commit -am "New release [release]"` (note the use of `[release]`)
 4. Wait till [Travis](https://travis-ci.org/Label305/Auja) is finished and has created a commit on `release`
 5. Create a pull request from `release` to `master` and merge
 6. Checkout to `master` and `git pull origin master`
 7. Tag: `git tag -a X.Y.Z -m "Version X.Y.Z"`;
 8. Push: `git push && git push --tags`;
 9. Checkout `dev`
10. Grab a coffee.