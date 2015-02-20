return function(request, next_middleware)

  local response = next_middleware()
  local SERVICE_ID = 16
  local MONITOR_ID = "2e1a00ee3fa3"

  -- report metric, depending on status
  local status = response.status
  if(status >= 200 and status <300) then
      metric.count('status_2XX',status)
  elseif (status >= 400 and status <500) then
    metric.count('status_4XX',status)
  elseif (status >= 500 and status <600) then
    metric.count('status_5XX',status)
  end

  -- retrieve metrics from APItools API
  values = {'2XX','4XX','5XX'}
  num_errors = {}
  for i=1, #values do
        local query = '{"metrics":[["GET"],"*","*"],"projections":["count"],"range":{"end":"now","start":600,"granularity":10},"metric": "status_'..values[i]..'","group_by":[false,false,false,false]}'

  local r= http.get('http://127.0.0.1:7071/api/services/'..SERVICE_ID..'/stats/analytics?query='..query)
    local results = json.decode(r.body).results
    if(#results>0) then
        local o = results[1].num_el
      num_errors[values[i]] = o
    end
  end

  console.log(num_errors)

  -- find max
  local max =0
  local max_value = ""
  local error_codes = {}
  error_codes["2XX"]="success"
  error_codes["4XX"]="warning"
  error_codes["5XX"]="danger"

  for i=1, #values do
    if(num_errors[values[i]]>max) then
      max = num_errors[values[i]]
      max_value = values[i]
    end
  end


  if(not (max_value == "")) then
      console.log(error_codes[max_value])

    -- update value on distant server
    local post = http.json.post('http://apihealthbar.meteor.com/hook',{service_id=SERVICE_ID,monitor_id=MONITOR_ID,status=error_codes[max_value]})
    console.log(post.body)
  end

  return response
end
