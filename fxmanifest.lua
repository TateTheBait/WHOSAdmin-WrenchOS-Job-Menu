author "The Wrench"
description "Wrench Prod."
version "1.0"

fx_version "cerulean"
game "gta5"
lua54 "yes"

-- specify the root page, relative to the resource
ui_page 'html/index.html'

-- every client-side file still needs to be added to the resource packfile!
files {
    'html/index.html',
    'html/script.js',
    'html/styles.css'
}

shared_script {
    "config.lua"
}

client_scripts {
    "client.lua",
}
