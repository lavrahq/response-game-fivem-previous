
interface Person {
    [serverid: number]: number
}

export class ResponseServer {
    personList = new Array<Person>()
    constructor() {
        SetConvar("response_enable_rp_commands", "true")
        this.SetupCommands();
        if (GetConvar("response_enable_rp_commands", "true") === "true") {
            this.SetupRPCommands();
        }
    }

    RegisterEvents() {
        onNet("response:RegisterPerson", (player, id) => {
            console.log(`Setting player ${player} ${GetPlayerName(player)} character as ${id}`)
            let person: Person;
            person[player] = id;
            this.personList.concat(person)
        })
        on('playerDropped', (player) => {
            this.personList.indexOf(player)
        })
        onNet('response:RetrieveLicense', (player) => {
            let num = GetNumPlayerIdentifiers(player)            
            for(let i = 0; i < num; i++) {
                console.log(GetPlayerIdentifier(player,i))
                if (GetPlayerIdentifier(player,i).includes("license:")) {
                    TriggerClientEvent("response:SetLicense",player,GetPlayerIdentifier(player,i).substring(7))
                    break;
                }
            }
        })
    }

    SetupCommands() {
        RegisterCommand("responseui", function (player, args, raw) {
            TriggerClientEvent("response:ToggleUI", player)
        }, false)
        if (GetConvar("response_enable_rp_commands", 'true') === 'true') {
            this.SetupRPCommands()
        }
    }


    SetupRPCommands() {
        RegisterCommand("me", function (player, args, raw) {

        }, false)

        RegisterCommand("id", function (player, args, raw) {
            console.log(this.personList)
            TriggerClientEvent("response:ShowID", args[0], this.personList[player])
        }, false)

        RegisterCommand("personselect", function (player, args, raw) {
            TriggerClientEvent("response:PersonSelect", player)
        }, false)
    }


}

let responseServer = new ResponseServer()