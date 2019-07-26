export class Client {
    showingUI: boolean = false
    firstTick: boolean = true;
    person: number = -1;
    constructor() {
        SetNuiFocus(false, false);
        this.SetupEvents()
        
        this.setupTick()
        let that = this;
        setTimeout(function() {
                    if (GetConvar("response_debug", 'false') === 'true') {
                        console.log("Response started setting default settings")
                    }                    
                    SendNuiMessage(JSON.stringify({ type: "nui/SET_RESOURCE_SETTINGS", data: { name: GetCurrentResourceName(), apiUrl: GetConvar("response_api_url", "http://localhost:8000"), debug: GetConvar("response_debug", "true") } }))
                    SendNuiMessage(JSON.stringify({ type: "config/SET_STATE_NAME", data: GetConvar("response_config_state_name", "sanandreas") }))
                    SendNuiMessage(JSON.stringify({ type: "config/SET_PLAYER_NAME", data: GetPlayerName(PlayerId()) }))                    
                    that.SetupNuiCallbacks()
                    TriggerServerEvent("response:RetrieveLicense",PlayerId())
                },5000)
    }

    private SetupEvents() {
        onNet("response:ToggleUI", () => {
            if (GetConvar("response_debug", "true") === "true") {
                console.log(`Toggling UI ${!this.showingUI}`)
            }
            this.showingUI = !this.showingUI
            SendNuiMessage(JSON.stringify({ type: "nui/SET_VISIBILITY", data: this.showingUI }))
            SetNuiFocus(this.showingUI, this.showingUI)
        })
        onNet("response:ShowID", (player) => {
            SendNuiMessage(JSON.stringify({ type: "nui/CHANGE_PAGE", data: "/id" }))
            SendNuiMessage(JSON.stringify({ type: "nui/SHOW_ID", data: player }))
            TriggerEvent("response:ToggleUI")
        })
        onNet("response:PersonSelect", () => {
            SendNuiMessage(JSON.stringify({ type: "nui/CHANGE_PAGE", data: "/personselect" }))
            TriggerEvent("response:ToggleUI")
        })
        onNet("response:SetLicense", (lic) => {
            SendNuiMessage(JSON.stringify({ type: "config/SET_LICENSE", data: lic }))
        })
        on("playerSpawned",() => {
            SendNuiMessage(JSON.stringify({ type: "nui/CHANGE_PAGE", data: "/personselect" }))
            TriggerEvent("response:ToggleUI")
        })
    }

    private SetupNuiCallbacks() {
        RegisterNuiCallbackType("response_showID")
        on('__cfx_nui:response_showID', (body: any, cb: (arg: any) => void) => {
            cb(true)
            SendNuiMessage(JSON.stringify({ type: "CHANGE_PAGE", data: "/id" }))
            TriggerEvent("response:ToggleUI")
        });
        RegisterNuiCallbackType("response_person_selected")
        on('__cfx_nui:response_person_selected', (body: any, cb: (arg: any) => void) => {
            cb(true)
            this.person = body.id;
            TriggerServerEvent("response:registerPerson", PlayerId(),this.person)
            TriggerEvent("response:ToggleUI")
        });
        RegisterNuiCallbackType("response_toggle_ui")
        on('__cfx_nui:response_toggle_ui', (body: any, cb: (arg: any) => void) => {
            cb(true)            
            TriggerEvent("response:ToggleUI")
        });
    }


    private setupTick() {
        setTick(function () {
            if (this.firstTick) {
                console.log('Running first tick')
                this.firstTick = false
            }
        })
    }
}


let client = new Client();