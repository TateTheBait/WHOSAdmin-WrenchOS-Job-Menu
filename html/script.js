var players = [];

plrid = "";

document.getElementById("menu").style.display = "none";

function Open() {
    fetch(`https://${GetParentResourceName()}/updateplrs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });

    const playersTable = JSON.parse(players);

    // Generate HTML for players
    let playersHtml = '<h1>Player IDs</h1>';
    playersTable.forEach(player => {
        playersHtml += `<p>${player.plrid} - ${player.plrname}, ${player.job}</p>`;
    });

    // Set the inner HTML of the menu
    document.getElementById('menu').innerHTML = `
        <div id="secondMenuContainer">
            <div id="secondMenu">
                <h1>WHOSAdmin</h1>
                <input type="text" id="selectedID" placeholder="PlayerID" value="${plrid}">
                <button onclick="buttonAction1()">Change Job</button>
                <button onclick="Open()">Reload (Currently Not Working)</button>
            </div>
            <div id="playerIds">
                ${playersHtml}
            </div>
        </div>
    `;
}


function buttonAction1() {
    plrid = document.getElementById('selectedID').value;
    document.getElementById('menu').innerHTML = `
        <div id="secondMenuContainer">
            <div id="secondMenu">
                <h1>Change Job</h1>
                <input id="selectedID" type="text" value="${plrid}" placeholder="PlayerID">
                <input type="text" id="jobNameInput" placeholder="JobName">
                <button onclick="jobChange()">Change Job</button>
                <button onclick="Open()">Back</button 
            </div>
        </div>
    `;
}

function jobChange() {
    var jobName = document.getElementById('jobNameInput').value;
    plrid = document.getElementById('selectedID').value;
    console.log(jobName);
    fetch(`https://${GetParentResourceName()}/changeJob`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            playerid: plrid,
            job: jobName
        })
    });
}

function buttonAction2() {
    alert('Button 2 clicked');
}

function buttonAction3() {
    alert('Button 3 clicked');
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'open') {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("menu").innerHTML = `
        <h1>Welcome To WHOSAdmin</h1>
        <button id="openbutton" class="mainbutton" onclick="Open()">Open</button>
        `;
        players = event.data.plrs;
    } else if (event.data.type === "updplrs") {
        players = event.data.plrs;
    }
});

function exit() {
    fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    document.getElementById("menu").style.display = "none";
}




document.onkeyup = function(data) {
    if (data.which == 27 ) {
        exit();
    }
};
