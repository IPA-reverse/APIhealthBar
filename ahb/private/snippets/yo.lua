local YO_API_KEY="66136c15-dbe2-4b48-8f2b-82cbc5bb5989"
local YO_USERNAME="picsoung"

local yo_url = "http://api.justyo.co/yo/"
    local yo_post  = http.urlencoded.post(yo_url,{api_token=YO_API_KEY,username=YO_USERNAME})
    console.log(yo_post.body)
