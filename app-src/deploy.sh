npm run build
cp ./dist/* ../
git add --all
git commit -am deploy
git push
