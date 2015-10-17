git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch views/index.html' \
--prune-empty --tag-name-filter cat -- --all
