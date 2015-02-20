-- HUE module --
local hue_url = "https://www.meethue.com/api/sendmessage"
local HUE_TOKEN = "Sk1FYnIvZmpPWExyUFYrUnVKVEtiWTBlY0hhb3BmdXpUbVl4Mk9ET1BMRT0%3D"
local params = "?token=" .. HUE_TOKEN
local HUE_BRIDGE_ID = "001788fffe101a07"
local hue_status

if error_codes[max_value] == "success" then
  hue_status =  25000
else
  hue_status =  0
end


body = json.encode(clipmessage={
                bridgeId: HUE_BRIDGE_ID,
                clipCommand: {
                  url: "/api/0/api/0/groups/0/action",
                  method: "PUT", body: {"on": true, "hue": hue_status} } })

http.post =(hue_url+params, body, { headers = { Content-Type = 'application/x-www-form-urlencoded' }})
-- /HUE module --
