README removed at user's request.
If you want the setup documentation recreated later, tell me and I will generate a fresh README.
   - Consider securing the admin directory further (IP restrictions, stronger auth) for production.

How to convert HTML -> PHP (one-liner in PowerShell)
Run from project folder (make backup first):

Get-ChildItem -Path . -Filter *.html | Rename-Item -NewName { $_.Name -replace '\.html$','.php' }

Then edit your pages to replace repeated head/footer with the includes.
