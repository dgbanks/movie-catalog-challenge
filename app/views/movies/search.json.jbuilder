json.array! @movies do |movie|
  json.extract! movie, :title, :year
end
