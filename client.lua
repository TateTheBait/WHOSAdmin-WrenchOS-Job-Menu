local file = ('imports/%s.lua'):format(IsDuplicityVersion() and 'server' or 'client')
local import = LoadResourceFile('ox_core', file)
local chunk = assert(load(import, ('@@ox_core/%s'):format(file)))
chunk()


local function plrcheck(job)
    local allowed=false
    for _, sjob in pairs(Config.AllowedJobs) do
        if job == sjob then
            allowed=true
        end
    end
    return allowed
end


RegisterCommand("whos", function ()
    if plrcheck(exports.WrenchOS:getPlayer(PlayerId()).job) then
        local plrlist = {}
        local players = exports.WrenchOS:getPlayers()
        for _, player in pairs(players) do
            plrlist[#plrlist+1] = {plrid=player.plrid, plrname=player.firstname, job=player.job}
        end
     
        SendNUIMessage({
            type = "open",
            plrs = json.encode(plrlist)
        })
        SetNuiFocus(true, true)
    end
end, false)


RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)

    cb("asdf")
end)

RegisterNUICallback("updateplrs", function (data, cb)
    local plrlist = {}
        local players = exports.WrenchOS:getPlayers()
        for _, player in pairs(players) do
            plrlist[#plrlist+1] = {plrid=player.plrid, plrname=player.firstname, job=player.job}
        end

    cb(json.encode(plrlist))
end)

RegisterNUICallback('changeJob', function(data, cb)
    exports.WrenchOS:changeJob(tonumber(data.playerid), data.job)
    print("TEST")
    cb("asdf")
end)
